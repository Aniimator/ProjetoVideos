import fastify from "fastify";
import { DatabasePostgres } from "./databasePostgres.js";
import cors from '@fastify/cors'

const server = fastify()
// comentario

await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

const database = new DatabasePostgres()


server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration,
    })
    
    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
    
    const videos = await database.list(search)
    
    return videos
})

server.put('/videos/:id', async (request, reply) =>{
    const videoId = request.params.id
    const { title, description, duration } = request.body
    
    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send() // a resposta teve sucesso mas nao retorna um conteudo
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3050,
});