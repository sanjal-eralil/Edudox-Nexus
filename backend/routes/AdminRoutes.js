import express from 'express'
import { Getuser, deletUser ,GetAllUsers, GetFilesByEDate, AllFilter, Category} from '../controllers/Admin.js'
import { isAdmin } from '../middleware/verifyToken.js'
import { serveFileMiddleware } from '../middleware/Fileserver.js'
import { GetFilesByDate ,GetFilesByPublishedDate} from '../controllers/Admin.js'


const AdminRoutes=express.Router()
 AdminRoutes.get('/getuser',isAdmin,Getuser)
 AdminRoutes.delete('/delet/:id',isAdmin,deletUser)
 AdminRoutes.get('/getall',GetAllUsers)
 AdminRoutes.get('/file/:filename', serveFileMiddleware);

 AdminRoutes.get('/files', isAdmin, GetFilesByDate);
 AdminRoutes.get('/email',isAdmin,GetFilesByEDate);
 AdminRoutes.get('/filesByPublishedDate', isAdmin, GetFilesByPublishedDate);
 AdminRoutes.get('/AllFilter', (req, res, next) => {
    console.log('AllFilter route accessed');
    next();
  }, AllFilter);
  AdminRoutes.get('/category', isAdmin, Category);

  

export default AdminRoutes