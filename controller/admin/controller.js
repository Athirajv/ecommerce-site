

var dbase = require("../../config/database")
var mongo=require('mongodb')


// exports.adminNav = (req,res)=>{
//     res.render('partials/adminheader')
// }

exports.adminIndex=(req,res)=>{
    dbase.then(async(db)=>{
       var admininfo = await db.collection('category_details').find({}).toArray();
            //   console.log(result,"result")
              res.render('admin/admincategory',{admininfo,admin:true})
         
       })
            
            
        }

        
    
exports.cat_edit =(req,res)=>{
    let editid=req.params.id
    dbase.then((db)=>{
        db.collection('category_details').findOne({_id:new mongo.ObjectId(editid)}).then((result)=>{
            // console.log(result)
            res.render('admin/adminedit',{result,admin:true})
        })
    })
}
exports.adminsubIndex = (req,res)=>{
    dbase.then(async(db)=>{
        const catinfo = await db.collection("category_details").find({}).toArray()
        const subcategoryinfo=await db.collection('subcategory_details').aggregate([
            {
                "$addFields":{"categoryid":{"$toObjectId":"$Scategory"}}
            },
            {
                $lookup:
                {
                    from:"category_details",
                    localField:"categoryid",
                    foreignField:"_id",
                    as:"list"
                }
            },
            {$unwind: "$list"}
        ])
        .toArray()
               console.log(subcategoryinfo)
              res.render('admin/adminsub',{catinfo,subcategoryinfo,admin:true})
       })
            
            
        }
 exports.subcat_edit =(req,res)=>{
            let editid=req.params.id
            dbase.then(async(db)=>{
                // db.collection('category_details').findOne({_id:new mongo.ObjectId(editid)}).then((result)=>{
                    // console.log(result)
                    const catinfo=await db.collection('category_details').find({}).toArray()
        
                    const subcategoryinfo=await db.collection('subcategory_details').findOne({_id:new mongo.ObjectId(editid)})
                    res.render('admin/subcategoryedit',{catinfo,subcategoryinfo,admin:true})
                })
            }

exports.productIndex = (req,res)=>{
    dbase.then(async(db)=>{
    const catinfo = await db.collection("category_details").find({}).toArray()
    const subcatinfo = await db.collection("subcategory_details").find({}).toArray()
    const productinfo = await db.collection('product_details').aggregate([
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
        {
            "$addFields":{"subcategoryid":{"$toObjectId":"$Subcategory"}} 
        },
        {
            $lookup:
            {
                from:"subcategory_details",
                localField:"subcategoryid",
                foreignField:"_id",
                as:"subcategorydetails"
            }
        },
        {$unwind: "$subcategorydetails"}

    ]).toArray();
        console.log(subcatinfo)
        res.render('admin/product',{catinfo,subcatinfo,productinfo,admin:true})
    })
    // res.render('admin/product',{catinfo,subcatinfo})
    }

    exports.product_edit =(req,res)=>{
        let edit_id=req.params.id
        dbase.then(async(db)=>{
            var catinfo =await db.collection('category_details').find({}).toArray();
            var subcatinfo = await db.collection("subcategory_details").find({}).toArray();
            var productinfo=await db.collection('product_details').findOne({_id:new mongo.ObjectId(edit_id)}).then((result)=>{
                res.render('admin/productedit',{result,catinfo,subcatinfo,productinfo,admin:true})
            })
               
            })
           
        }
        
    