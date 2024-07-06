var mongodb=require('mongodb').MongoClient
var a=new mongodb('mongodb://127.0.0.1:27017/')

function dataconnection(){

return a.connect().then((dbs)=>{
    var b=dbs.db('ecommerce')
    return b
    
})}
module.exports=dataconnection();