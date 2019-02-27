const app = require('express')();
const graphqlHTTP = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

app.use('/graphql',graphqlHTTP({
  schema:graphqlSchema,
  rootValue:graphqlResolver,
  graphiql:true
}));

app.listen(3000,()=>{
  console.log('Runing...');
});
