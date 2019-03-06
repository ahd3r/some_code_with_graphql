const app = require('express')();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

app.use('/graphql',graphqlHTTP({
  schema:graphqlSchema,
  rootValue:graphqlResolver,
  graphiql:true
}));

app.listen(3000,()=>{
  mongoose.connect('mongodb://localhost/learning', { useNewUrlParser: true }).then((some)=>{
    console.log('MongoDB and Server is runing...');
  }).catch(err=>{
    console.log(err);
  });
});
