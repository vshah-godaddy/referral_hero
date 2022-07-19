const multer = require('multer');
 
var storage = multer.memoryStorage()

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './temp')
//       },
//       filename: function (req, file, cb) {
//         cb(null, "temp.pdf")
//       }
// })
var upload = multer({storage:storage});
 
module.exports = upload;