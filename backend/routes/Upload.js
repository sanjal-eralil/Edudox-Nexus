import express from 'express'

import { store } from '../controllers/Upload.js'
import { upload } from '../middleware/upload.js'
const Routes=express.Router()

Routes.post('/',upload.single('file'),store)

export default Routes