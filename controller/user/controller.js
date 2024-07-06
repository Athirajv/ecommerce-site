
var dbase = require("../../config/database")
var mongo=require('mongodb')



exports.categoryIndex = (req,res)=>{
    if (req.session.user) {
        var login=true;   
        var reg=req.session.user;
        const Admin = false;}
    dbase.then(async(db)=>{
       var admininfo=await db.collection('category_details').find({}).toArray()
       const productinfo = await db.collection('product_details').find({}).toArray()
  
            res.render('user/user',{admininfo,productinfo,login,reg,})
            // console.log(productinfo)
            
        })
    // }else{
    //     res.redirect('/login');
    // }
    }
    
    exports.userIndex=(req,res)=>{
        // if (req.session.user) {
        //     var login=true;
        //     const Admin = false;
        //     var reg=req.session.user;
        let reqid=req.params.id
        dbase.then((db)=>{
            db.collection('product_details').findOne({_id:new mongo.ObjectId(reqid)}).then((result)=>{
                // console.log(result)
                res.render('user/userproduct',{result})
            })
               
            })
        // }else{
        //     res.redirect('/user/login');
        // }
        }
    
exports.Categorylist =(req,res)=>{
    // if (req.session.user) {
    //     var login=true;
    //     const Admin = false;
        // let req_id = req.params.id;
        var reg=req.session.user;
    
       
    var req_id=req.params.id
    dbase.then(async(db)=>{
        const admininfo= await db.collection('category_details').findOne({_id: new mongo.ObjectId(req_id)})
        const productinfo = await db.collection('product_details').aggregate([
            {
                $match:{Category:req_id}
            },
            
            {
                "$addFields":{"categoryid":{"$toObjectId":"$Category"}}
            },
            {
                $lookup:
                {
                    from:"category_details",
                    localField:"categoryid",
                    foreignField:"_id",
                    as:"categorydetails"
                }
            },
            {$unwind: "$categorydetails"},
        ])
        .toArray();
     res.render('user/usercategory',{admininfo,productinfo})
})}
// else{
//     res.redirect('/user/login');
// }
    
  
    
exports.registerIndex = (req,res)=>{

    const Admin = false
    if (req.session.user) {
        var login=true;
    }
    var reg=req.session.user;
    dbase.then((db)=>{
        db.collection('user_details').find({}).toArray().then((result)=>{
            // console.log(result)
            res.render('user/register',{Admin,login,reg})
        })
        
        
    })

}
   

exports.loginIndex = (req,res)=>{
    const Admin=false;
    let reg = req.session.user;
    if(req.session.user){
        var login=true;
    }

    dbase.then((db)=>{
        db.collection('user_details').find({}).toArray().then((result)=>{
            // console.log(result,Admin,reg,login)
            res.render('user/login',{result,Admin,reg,login})
        })
  
    })
} 
exports.cartIndex = (req,res)=>{
    // var login=true;
    // let reg=req.session.user
    //  res.render('user/cart')
    const Admin = false;
    if (req.session.user) {
        var login=true;
        let reg=req.session.user
    
    dbase.then((db)=>{
        db.collection('cart_details').find({}).toArray().then((result)=>{
            console.log(result)
            res.render('user/cart',{result,Admin,login,reg})
        })
    // res.render('user/cart')
    })}
// } else {
//     res.redirect('/login');
// }

}


