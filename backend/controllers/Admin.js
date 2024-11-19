
import UserModel from "../models/user.js"
import path from 'path';
import fs from 'fs'; 
import FileModel from "../models/file.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


const Getuser=async(req,res)=>{
    try {
        const users=await UserModel.find()
         res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:"intenral server error"})
        console.log(error)
    }
}

const deletUser=async(req,res)=>{
    try {
        const userId=req.params.id
              const checkAdmin=await UserModel.findById(userId)

              if (checkAdmin.role =='admin') {
                return  res.status(409).json({message:"you can not delet youselfe"})
              }
        const user=await UserModel.findByIdAndDelete(userId)
        if (!user) {
          return  res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user delet successfully ",user})
    } catch (error) {
        res.status(500).json({message:"intenral server error"})
        console.log(error)
    }
}




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const GetAllUsers = async (req, res) => {
  try {
   
    const users = await FileModel.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

   
    const usersWithFileStatus = users.map(user => {
      const filePath = user.file; 
      const absolutePath = filePath ? path.join(__dirname, '..','..', filePath) : null;
     //console.log(absolutePath);
     //console.log(filePath);
      // Check if the file exists
      //console.log(fs.existsSync(absolutePath));
      //console.log(fs.existsSync(filePath));
      const fileExists = absolutePath ? fs.existsSync(filePath) : false;
  
      return {
        email: user.email,       // Include the email
        approved: user.approved, // Include the 'approved' string field
        fileExists,              // Add a field to indicate if the file exists
        filePath: fileExists ? `/file/${path.basename(filePath)}` : null, // Provide the relative path to access the file if it exists
      };
    });

    // Step 3: Send the users' data
    res.status(200).json(usersWithFileStatus);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};



const AllFilter = async (req, res) => {
  try {
    const { email, mainOption, subOption, startDate, endDate } = req.query;

    // Initialize the query object
    const query = {};

    if (email) query.email = email;
    if (mainOption) query.mainOption = mainOption;
    if (subOption) query.subOption = subOption;

    // Add date range filtering for publishedDate if both startDate and endDate are provided
    if (startDate && endDate) {
      const formattedStartDate = new Date(startDate);
      const formattedEndDate = new Date(endDate);
      formattedEndDate.setHours(23, 59, 59, 999);

      query.publishedDate = {
        $gte: formattedStartDate,
        $lte: formattedEndDate,
      };
    }

    // Query the database
    const files = await FileModel.find(query);

    const filesWithStatus = files.map((file) => {
      const filePath = file.file;
      const absolutePath = filePath ? path.join(__dirname, '..', filePath) : null;
      const fileExists = absolutePath ? fs.existsSync(absolutePath) : false;

      return {
        email: file.email,
        mainOption: file.mainOption,
        subOption: file.subOption,
        publishedDate: file.publishedDate,
        approved: file.approved,
        file: file.file,
        filePath: fileExists ? `/file/${path.basename(filePath)}` : null,
        fileExists,
      };
    });

    res.status(200).json({ files: filesWithStatus });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};


const Category = async (req, res) => {
  try {
    const { email, mainOption, subOption } = req.query;

    // Build the query object dynamically based on provided filters
    const query = {};

    if (email) query.email = email;
    if (mainOption) query.mainOption = mainOption;
    if (subOption) query.subOption = subOption;

    // Query the database with the dynamic filters
    const files = await FileModel.find(query);
    
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found with the given filters' });
    }

    // Send the filtered files as response
    res.status(200).json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const GetFilesByPublishedDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    // Ensure the dates are in the correct format
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);
    formattedEndDate.setHours(23, 59, 59, 999); // Set the end date to the end of the day

    // Convert back to strings in "YYYY-MM-DD" format for comparison
    const startStr = formattedStartDate.toISOString().split('T')[0];
    const endStr = formattedEndDate.toISOString().split('T')[0];

    // Debugging log to see what the dates are
    console.log("Start Date String:", startStr, "End Date String:", endStr);

    // Query the database for files based on published date
    const files = await FileModel.find({
      publishedDate: {
        $gte: startStr,
        $lte: endStr
      }
    });

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found within the given published date range' });
    }

    // Map the files to include email, file existence status, and file path
    const filesWithStatus = files.map((file) => {
      const filePath = file.file; // Use the `file` field from the database
      const absolutePath = filePath ? path.join(__dirname, '..', filePath) : null;
      const fileExists = absolutePath ? fs.existsSync(absolutePath) : false;

      return {
        email: file.email,        // Include the email field
        file: file.file,          // Include the file field from the database
        approved: file.approved,  // Include the 'approved' field if present
        filePath: fileExists ? `/file/${path.basename(filePath)}` : null, // Provide relative path if the file exists
        fileExists,               // Indicate whether the file exists on the server
      };
    });
   console.log(filesWithStatus);
    // Respond with the files and their status
    res.status(200).json({ files: filesWithStatus });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};


const GetFilesByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    // Convert the input date strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if the dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Query the database for files created between the specified dates
    const files = await FileModel.find({
      createdAt: {
        $gte: start,
        $lte: end
      }
    });

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found within the given date range' });
    }

    // Map the files to include email, file existence status, and file path
    const filesWithStatus = files.map((file) => {
      const filePath = file.file; // Use the `file` field from the database
      const absolutePath = filePath ? path.join(__dirname, '..', filePath) : null;
      const fileExists = absolutePath ? fs.existsSync(absolutePath) : false;

      return {
        email: file.email,        // Include the email field
        file: file.file,          // Include the file field from the database
        approved: file.approved,  // Include the 'approved' field if present
        filePath: fileExists ? `/file/${path.basename(filePath)}` : null, // Provide relative path if the file exists
        fileExists,               // Indicate whether the file exists on the server
      };
    });

    res.status(200).json({ files: filesWithStatus });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};




const GetFilesByEDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    // Convert the input date string to a Date object
    const startDate = new Date(date);

    // Query the database for files created on or after the specified date
    const files = await FileModel.find({
      createdAt: {
        $gte: startDate
      }
    });

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found after the given date' });
    }

    // Map the files to include email, file existence status, and file path
    const filesWithStatus = files.map((file) => {
      const filePath = file.file; // Use the `file` field from the database
      const absolutePath = filePath ? path.join(__dirname, '..', filePath) : null;
      const fileExists = absolutePath ? fs.existsSync(absolutePath) : false;
      //res.send(absolutePath);

      console.log(absolutePath);
     console.log(filePath);
      return {
        email: file.email,        // Include the email field
        file: file.file,          // Include the file field from the database
        approved: file.approved,  // Include the 'approved' field if present
        filePath: fileExists ? `/file/${path.basename(filePath)}` : null, // Provide relative path if the file exists
        fileExists,               // Indicate whether the file exists on the server
      };
    });

    res.status(200).json({ files: filesWithStatus });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};



/*
const GetFilesByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    // Convert the input date string to a Date object
    const startDate = new Date(date);

    // Query the database for files created on or after the specified date
    const files = await FileModel.find({
      createdAt: {
        $gte: startDate
      }
    });

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found after the given date' });
    }

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error(error);
  }
};

*/





export {Getuser,deletUser,GetAllUsers,GetFilesByDate,GetFilesByEDate,GetFilesByPublishedDate,Category,AllFilter}