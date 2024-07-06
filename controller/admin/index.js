var express = require("express")
var router = express.Router();
var controller=require("./controller")
var dbase = require("../../config/database")
var mongo = require("mongodb");
const { route } = require("../user");

// router.get("/",controller.adminNav)
router.get('/',(req,res)=>{
       res.render('admin/admin',{ layout: 'layout',admin:true })
})

 router.get("/admincategory",controller.adminIndex);

router.post('/admincategory',(req,res)=>{
    let details = {
        Category : req.body.category,
        Description : req.body.description,
        image : req.files.imag.name
    }
    dbase.then((db)=>{
        db.collection('category_details').insertOne(details).then((result)=>{
            const fileup = req.files.imag;
            fileup.mv("./public/images/" + details.image);
            // console.log(req.files.imag)
        })
    })
	console.log(details)
    res.redirect('/admin/admincategory')
})

router.get("/admincategory/:id",(req,res)=>{
    let delid = req.params.id
    dbase.then((db)=>{
        db.collection('category_details').deleteOne({_id:new mongo.ObjectId(delid)}).then((result)=>{
            console.log(result)
           
        })
    })
    res.redirect('/admin/admincategory')
})

router.get("/admincategoryedit/:id",controller.cat_edit)
router.post("/admincategoryedit/:id",(req,res)=>{
    var updatid=req.params.id
    let editdata={
        Category : req.body.category,
        Description : req.body.description,
        image : req.files?.imag.name
    }
    let neweditdata='';
    if(req.files?.imag){
        neweditdata={
            Category:editdata.Category,
            Description:editdata.Description,
            image:editdata.image
        }
        let newdata=req.files.imag;
        newdata.mv('./public/images/' + neweditdata.image)
    }
    else{
        neweditdata={
            Category:editdata.Category,
            Description:editdata.Description
        }
    }
    dbase.then((db)=>{
        db.collection('category_details').updateOne({_id:new mongo.ObjectId(updatid)},{$set:neweditdata}).then((result)=>{
            console.log(result)
            
        })
    })
res.redirect('/admin/admincategory')
})




router.get("/adminsub",controller.adminsubIndex);
router.post('/adminsub',(req,res)=>{
    let data = {
        Scategory: req.body.scategory,
        Subcategory : req.body.subcategory
        

       
    }
    dbase.then((db)=>{
        db.collection('subcategory_details').insertOne(data).then((result)=>{
 })
    })
	console.log()
    res.redirect('/admin/adminsub')
})

router.get("/adminsub/:id",(req,res)=>{
    let delid = req.params.id
    dbase.then((db)=>{
        db.collection('subcategory_details').deleteOne({_id:new mongo.ObjectId(delid)}).then((result)=>{
            console.log(result)
           
        })
    })
    res.redirect('/admin/adminsub')
})
router.get("/subcategoryedit/:id",controller.subcat_edit)
router.post('/subcategoryedit/:id',(req,res)=>{
    var updatid=req.params.id;
    let data = {
        Scategory: req.body.scategory,
        Subcategory : req.body.subcategory
    }
    dbase.then((db)=>{
        db.collection('subcategory_details').updateOne({_id:new mongo.ObjectId(updatid)},{$set:data}).then((result)=>{
            // console.log(result)
            
        })
    })
res.redirect('/admin/adminsub')
})
router.get('/product',controller.productIndex)
router.post('/product',(req,res)=>{
     let data={
       Category:req.body.category,
       Subcategory:req.body.subcategory,
       Productname:req.body.productname,
       Price:req.body.price,
       Description:req.body.description,
       Quantity:req.body.quantity,
       Image:req.files.Image.name


     }
     dbase.then((db)=>{
        db.collection('product_details').insertOne(data).then((result)=>{
            const fileup = req.files.Image;
            fileup.mv("./public/images/" + data.Image);
            // console.log(req.files.imag)
        })
        // console.log(data)
    res.redirect('/admin/product')
    })
	
})
router.get("/product/:id",(req,res)=>{
    let delid = req.params.id
    dbase.then((db)=>{
        db.collection('product_details').deleteOne({_id:new mongo.ObjectId(delid)}).then((result)=>{
            // console.log(result)
           
        })
    })
    res.redirect('/admin/product')
})
router.get("/productedit/:id",controller.product_edit);
router.post("/productedit/:id",(req,res)=>{
    var updateid=req.params.id
    let editdata={
       Category:req.body.category,
       Subcategory:req.body.subcategory,
       Price:req.body.price,
       Description:req.body.description,
       Quantity:req.body.quantity,
       Image : req.files?.Image.name
    }
    let neweditdata='';
    if(req.files?.Image){
        neweditdata={
            Category:editdata.Category,
            Subcategory:editdata.Subcategory,
            Price:editdata.Price,
            Description:editdata.Description,
            Quantity:editdata.Quantity,
            Image : editdata.Image
        }
        let newdata=req.files.Image;
        newdata.mv('./public/images/' + neweditdata.Image)
    }
    else{
        neweditdata={
            Category:editdata.Category,
            Subcategory:editdata.Subcategory,
            Price:editdata.Price,
            Description:editdata.Description,
            Quantity:editdata.Quantity
        }
    }
    dbase.then((db)=>{
        db.collection('product_details').updateOne({_id:new mongo.ObjectId(updateid)},{$set:neweditdata}).then((result)=>{
            console.log(result)
        })
    })

res.redirect('/admin/product')
})



module.exports=router;