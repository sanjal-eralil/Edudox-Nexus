import FileModel from "../models/file.js";

const store = async (req, res, next) => {
    let data = new FileModel({
        email: req.body.email,
        mainOption: req.body.mainOption,    // Store the selected main option
        subOption: req.body.subOption,
        publishedDate: req.body.publishedDate       // Store the selected sub option
    });

    if (req.file) {
        data.file = req.file.path;
    }

    data.save()
        .then(response => {
            res.json({
                message: 'Successfully uploaded the file and saved options.'
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error.message,
                message: 'Error saving data.'
            });
        });
};

export { store };







/*

import FileModel from "../models/file.js";

const store=async(req,res,next)=>{
    let data=new FileModel({
        email:req.body.email,
      
    })
    if(req.file){
        data.file=req.file.path
    }

    data.save()
    .then(response=>{
        res.json({
            message:'Successfull'
        })
    })
    .catch(error=>{
        res.json({
            error:error,
            message:'error'
            
        })
    })
}

export {store};

*/

