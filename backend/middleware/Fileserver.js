// backend/middleware/fileServeMiddleware.js
import path from 'path';
import fs from 'fs';

const serveFileMiddleware = (req, res, next) => {
console.log("in");
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename); // Adjust path based on file structure

  // Log the file path being accessed
  console.log('Serving file from:', filePath);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.sendFile(filePath);
  });
};

export  {serveFileMiddleware};
