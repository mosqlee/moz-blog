const fastify = require('fastify')();

fastify.get('/', (request, reply) => {
  reply.send({
    hello: 'world'
  })
})
const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
}
fastify.listen(3000, opts
   , function (err) {
  if (err) throw err;
})