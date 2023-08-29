const multer = require('multer');
const fs = require("fs");


// Get the file name and extension with multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir('./uploads/', (err) => {
            cb(null, './uploads/');
        })
    },
    filename: (req, file, cb) => {
        const filename = `${file.originalname}`;
        cb(null, filename);
      },
});

// Set the storage, file filter and file size with multer
const upload = multer({
  storage,
  //   limits: {
  //     fieldNameSize: 200,
  //     fileSize: 5 * 1024 * 1024,
  //   },
}).single('file');

module.exports = upload;