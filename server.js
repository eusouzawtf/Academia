import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Olá Mundo'
})

server.post('/musculacao', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {exercicio, series, repeticoes } = request.body
    database.create({
        exercicio: exercicio,
        series: series,
        repeticoes: repeticoes
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/musculacao', (request) => {
    const search = request.query.search

    const musculacoes = database.list(search)

    return musculacoes
})

server.put('/musculacao/:id', (request, reply) => {

    const musculacaoId = request.params.id
    const {exercicio, series, repeticoes} = request.body
    const musculacao = database.update(musculacaoId, {
        exercicio,
        series,
        repeticoes,
    })
    return reply.status(204).send()
})

server.delete('/musculacao/:id', (request, reply) => {
    const musculacaoId = request.params.id

    database.delete(musculacaoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})