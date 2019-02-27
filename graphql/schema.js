const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type TryIt{
    text:String!
    number:Int
  }

  type ContentStuff{
    id: Int!
    name: String!
    views: Int!
    created: String!
    creator: Int!
  }

  type Some{
    stuff: [ContentStuff]!
    count: Int!
  }

  input dataPost{
    name: String!
  }

  type RootMutation{
    addPost(dataPost:dataPost): Some
    updPost(updtDataPost:dataPost id:ID!): ContentStuff
    delPost(id:ID!): Some
  }

  type RootQuery {
    learning: TryIt
    takeAll: Some
    takeOne(id:ID!): ContentStuff
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
