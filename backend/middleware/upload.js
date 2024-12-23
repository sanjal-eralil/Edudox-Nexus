import path from 'path'

import multer from 'multer'

var storage = multer.diskStorage({

destination: function(req, file, cb) {


cb(null, 'uploads/')
},

filename: function(req, file, cb) {

let ext= path.extname(file.originalname)

cb(null, Date.now() + ext)

}

})

var upload =multer ({

storage: storage,

fileFilter: function(req, file, callback) {

if(

file.mimetype == "image/png" ||

file.mimetype == "image/jpg" ||

file.mimetype == "application/pdf" 


){

callback(null, true)

} else{


console.log('only jpg & png file supported!')

callback(null, false)
}
},
limits: {

FileSize: 1024*1024* 2

}

})

export {upload};