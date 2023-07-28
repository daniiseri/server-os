import fastify from 'fastify'
import { usersRoutes } from './routes/users'
import { customersRoutes } from './routes/customers'
import { authRoutes } from './routes/auth'
import  cors from '@fastify/cors'
import  jwt from '@fastify/jwt'
import { servicesRoutes } from './routes/services'
import { productsRoutes } from './routes/products'

const server = fastify()

server.register(usersRoutes)
server.register(customersRoutes)
server.register(productsRoutes)
server.register(servicesRoutes)
server.register(authRoutes)
server.register(cors, { 
  origin: 'http://localhost:3000' 
})
server.register(jwt, { secret: 'helptech-os', sign: { expiresIn: '30 days' } })

server.listen({ port: 3333 }, (err, address) => {
  if(err){
    console.error(err)
    process.exit(1)
  }

  console.log(`Server running in ${address}`)
})