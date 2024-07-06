var express = require("express");
var router = express.Router();
var controller = require("./controller");
var mongo=require('mongodb')
var dbase = require("../../config/database")
var bcrypt=require('bcrypt')
// router.get("/",controller.userIndex)

router.get('/',controller.categoryIndex)
router.get('/userproduct/:id',controller.userIndex)
router.get('/usercategory/:id',controller.Categorylist)
router.get('/register',controller.registerIndex)
router.post('/register',(req,res)=>{
    let details={
        Username:req.body.username,
        Email:req.body.email,
        Password:req.body.password,
        Userstatus:1

    }

    dbase.then((db)=>{
        bcrypt.hash(req.body.password,10).then((code)=>{
            details.Password=code
            db.collection('user_details').insertOne(details).then((result)=>{
                // console.log(result)
            })
        })
        
        res.redirect('/user/login')
    })
    
})

router.get('/user/login',controller.loginIndex)
router.post('/user/login',(req,res)=>{
    let details={
        Email:req.body.email,
        Password:req.body.password
    }
    dbase.then((db)=>{
        db.collection('user_details').findOne({Email:details.Email}).then((result)=>{
            console.log(result)
            let user=result
            if(user){
                bcrypt.compare(details.Password,user.Password).then((pass)=>{
                    if(pass){
                        if(user.Userstatus==0){
                            req.session.user= user
                            res.redirect('/admin')
                        }
                        else{
                            req.session.user=user
                            res.redirect('/')
                        }
                    }else {
                        const err = "invalid credentials";
                        res.render("user/login",{err});
                    }
                })
            }else {
                const err = "No user with that email exists.";
                res.render("user/login", { err });
          
            }
            
        })
        
    })
})

router.get('/logout',(req,res)=>{
    req.session.destroy()
    // res.redirect('/user/login')
    res.redirect('/')
})


router.get('/cart/:id',controller.cartIndex)
router.get('/cart/:id',(req,res)=>{

    const Admin = false;
    if (req.session.user) {
        var login=true;
        let reg=req.session.user

   
        const cartItem = {
            user_id: req.session.user._id,
            product_id: req.params.id,
            Userstatus:1
        } 
        dbase.then((db)=>{

        db.collection('cart_details').insertOne(cartItem).then((result)=>{
        
            console.log(result)
            })
            res.redirect('/');
        })
          
    }
    
        
    })
    


module.exports=router;