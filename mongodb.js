// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const objectID = mongodb.ObjectID
const {MongoClient, ObjectID} = require('mongodb')
const id = new ObjectID()
console.log(id)
const promise = new Promise((resolve,rej) => {
    setTimeout(()=>{
        resolve("wrong")
    },2000)
})

promise.then((result) => {
    console.log("success")
}).catch((err) =>{
    console.log("eeerrrr"+err)
})
console.log('after sds  fd fd f d f')

// object id consist of 12b first 4b are seconds timestamp
// mid 5 bytes random value
// last 3 bytes are counter starting with random values
console.log(id.getTimestamp()) 
const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"
MongoClient.connect(connectionURL,{useNewUrlParser : true } , (err,client) => {
if(err)
 return console.log("unable to connect to database!") 
 console.log("connected correctly!")
  const db = client.db(databaseName)
  db.collection("users").insert({
      name : 'harsh',
  }) 
//console.log(db)
// db.collection("users").insertMany([{
//           description : 'Clean the jadya',
//           completed: false
//       },{
//           name : 'walk with shreya',
//           completed : true 
//       }],(err,result) => 
//       {
//           if(err)
//           console.log('Unable to insert user')
//           console.log(result.ops) //ops array of documents 
//       })
db.collection("users").findOne({ name : 'harsh' },(err,user) => {if(err)
              console.log('Unable to insert user')
              console.log(user) //ops array of documents 
          })

      //{_id: 5e146d6eabfd2142344503ed} not allowed for finding directly id
      // because it is stored in different format ie binary and we are passing string
      // so we need to pass like this way _id : new ObjectID("_id: 5e146d6eabfd2142344503ed") 
     //  find({}).count() , toArray()   


    })
