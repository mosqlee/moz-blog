module.exprts = function(fastify, options, next){
    fastify.get('/', function(req, reply){
        reply.send({hello: 'world'})
    })
    next()
}