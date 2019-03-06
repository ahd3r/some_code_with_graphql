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
// mongodb://localhost/learning
app.listen(3000,()=>{
  mongoose.connect('mongodb+srv://admin:1111@cluster1-tm9cf.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }).then((some)=>{
    console.log('MongoDB and Server is runing...');
  }).catch(err=>{
    console.log(err);
  });
});
