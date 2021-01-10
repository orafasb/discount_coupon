import express from 'express'
import setupMiddleweres from './middlewares'
import setupRoutes from './routes'

const app = express()
setupMiddleweres(app)
setupRoutes(app)
export default app
