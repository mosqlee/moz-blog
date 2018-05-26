const fastify = require('fastify')();

fastify.register(require('./route'))
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
// fastify.register(
//   [route1],
//   opts, function(err){
//     if(err) throw err;
//   }
// )
fastify.listen(3002, opts
   , function (err) {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`)
})