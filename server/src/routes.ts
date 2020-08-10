import express from 'express'
import multer from 'multer'

import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = express.Router()
const classesController = new ClassesController()
const connectionsController = new ConnectionsController()

import multerConfig from './config/multer'
const upload = multer(multerConfig)

routes.get('/classes', classesController.index)
routes.post('/classes', upload.single('avatar'), classesController.create)

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes