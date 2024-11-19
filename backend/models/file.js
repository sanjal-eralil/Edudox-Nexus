import mongoose from "mongoose";

const fileSchema= new mongoose.Schema({
   
    email:{
        type:String,
        required:true
        
    },
    file:{
        type:String,
        required:true
    },
    mainOption:{
        type:String,
        required:true
    },
    subOption:{
        type:String,
        required:true
    },
    publishedDate:{
        type:String,
        required:true
    },
    approved:{
        type:String,
        enum:["approved","not approved"],
        default:"not approved"

    },
   
},{timestamps:true})

const FileModel= mongoose.model('file',fileSchema)

export default FileModel