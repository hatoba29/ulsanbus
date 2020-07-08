var api = require("./API")
var fs = require("fs")
// var nedb = require("nedb")

// fs.unlink("test.db", (err) => {
//   console.log("database deleted")
// })

// const DB = new nedb({ filename: "test.db", autoload: true })

api.routeInfo()

// fs.readFile("routeData.json", "utf8", (err, data) => {
//   var obj = JSON.parse(data)
//   // obj.forEach(value => {
//   //   delete value.RNUM;
//   // });
//   DB.insert(obj, (err, newDoc) => {
//     console.log("insert done!")
//   })
//   DB.find({ BRTNO: 733 }, (err, docs) => {
//     console.log(docs)
//     console.log("find done!")
//   })
// })
