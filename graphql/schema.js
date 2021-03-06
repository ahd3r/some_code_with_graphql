const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type TryIt{
    text:String!
    number:Int
  }

  type PostForAddingUser{
    _id: String!
    name: String!
    views: Int!
    created: String!
  }

  type UserForAddingPost{
    _id:String!
    name:String!
    age:Int
    married:Boolean
    created:String!
  }

  type UserStuff{
    _id: String!
    name:String!
    age:Int
    married:Boolean
    created:String!
    posts:[PostForAddingUser]!
  }

  type PostStuff{
    _id: String!
    name: String!
    views: Int!
    created: String!
    creator: UserForAddingPost
  }

  type allPostsWithCount{
    stuff: [PostStuff]!
    count: Int!
  }

  type allUsersWithCount{
    stuff: [UserStuff]!
    count: Int!
  }

  input inputPostData{
    name: String!
    creator: String
  }

  input inputUserData{
    name: String
    age: Int
    married:Boolean
  }

  type RootMutation{
    addPost(dataPost:inputPostData!): allPostsWithCount
    updPost(dataPost:inputPostData! post_id:String!): PostStuff
    delPost(post_id:String!): allPostsWithCount
    addUser(dataUser:inputUserData!): allUsersWithCount
    updUser(dataUser:inputUserData! user_id:String!): UserStuff
    delUser(user_id:String!):allUsersWithCount
  }

  type RootQuery {
    learning: TryIt
    takeAllPosts(page:Int! amount:Int!): allPostsWithCount
    takeAllUsers(page:Int! amount:Int!): allUsersWithCount
    takeOnePost(post_id:String!): PostStuff
    takeOneUser(user_id:String!): UserStuff
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

// const { GraphQLList,GraphQLBoolean,GraphQLString,GraphQLInt,GraphQLInputObjectType,GraphQLInterfaceType,GraphQLObjectType,GraphQLSchema,GraphQLNonNull } = require('graphql');
// const TryIt = new GraphQLObjectType({
//   name:'TryIt',
//   fields:{
//     text:{ type:new GraphQLNonNull(GraphQLString) },
//     number: { type:GraphQLInt }
//   }
// });
// const PostForAddingUser = new GraphQLObjectType({
//   name: 'PostForAddingUser',
//   fields: {
//     _id: { type: new GraphQLNonNull(GraphQLString) },
//     name: { type: new GraphQLNonNull(GraphQLString) },
//     views: { type: new GraphQLNonNull(GraphQLInt) },
//     created: { type: new GraphQLNonNull(GraphQLString) }
//   }
// });
// const UserForAddingPost = new GraphQLObjectType({
//   name:'UserForAddingPost',
//   fields:{
//     _id:{ type: new GraphQLNonNull(GraphQLString) },
//     name:{ type: new GraphQLNonNull(GraphQLString) },
//     created:{ type: new GraphQLNonNull(GraphQLString) },
//     age:{ type:GraphQLInt },
//     married:{ type:GraphQLBoolean }
//   }
// });
// const UserStuff = new GraphQLObjectType({
//   name:'UserStuff',
//   fields:{
//     _id:{ type: new GraphQLNonNull(GraphQLString) },
//     name:{ type: new GraphQLNonNull(GraphQLString) },
//     age:{ type:GraphQLInt },
//     created:{ type: new GraphQLNonNull(GraphQLString) },
//     married:{ type:GraphQLBoolean },
//     posts:{ type:new GraphQLNonNull(GraphQLList(PostForAddingUser)) }
//   }
// });
// const PostStuff = new GraphQLObjectType({
//   name:'PostStuff',
//   fields:{
//     _id: { type: new GraphQLNonNull(GraphQLString) },
//     name: { type: new GraphQLNonNull(GraphQLString) },
//     views: { type: new GraphQLNonNull(GraphQLInt) },
//     created: { type: new GraphQLNonNull(GraphQLString) },
//     creator: { type: new GraphQLNonNull(UserForAddingPost) }
//   }
// });
// const allUsersWithCount = new GraphQLObjectType({
//   name:'AllUsers',
//   fields:{
//     stuff: { type: new GraphQLNonNull(GraphQLList(UserStuff)) },
//     count: { type: new GraphQLNonNull(GraphQLInt) }
//   }
// });
// const allPostsWithCount = new GraphQLObjectType({
//   name:'AllPosts',
//   fields:{
//     stuff:{ type:new GraphQLNonNull(GraphQLList(PostStuff)) },
//     count: { type:new GraphQLNonNull(GraphQLInt) }
//   }
// });
// const inputPostData = new GraphQLInputObjectType({
//   name:'inputPostData',
//   fields:{
//     name:{ type: new GraphQLNonNull(GraphQLString) },
//     creator:{ type: GraphQLString }
//   }
// });
// const inputUserData = new GraphQLInputObjectType({
//   name:'inputUserData',
//   fields:{
//     name:{ type: GraphQLString },
//     age:{ type: GraphQLInt },
//     married:{ type: GraphQLBoolean }
//   }
// });
// const RootMutation = new GraphQLObjectType({
//   name: 'RootMutation',
//   fields:{
//     addPost:{
//       type: allPostsWithCount,
//       args: {
//         dataPost:{ type: new GraphQLNonNull(inputPostData) }
//       }
//     },
//     updPost:{
//       type: PostStuff,
//       args: {
//         dataPost:{ type: new GraphQLNonNull(inputPostData) },
//         post_id:{ type: new GraphQLNonNull(GraphQLString) }
//       }
//     },
//     delPost:{
//       type: allPostsWithCount,
//       args: {
//         post_id:{ type: new GraphQLNonNull(GraphQLString) }
//       }
//     },
//     addUser:{
//       type: allUsersWithCount,
//       args: {
//         dataUser: { type: new GraphQLNonNull(inputUserData) }
//       }
//     },
//     updUser:{
//       type: UserStuff,
//       args: {
//         dataUser: { type: new GraphQLNonNull(inputUserData) },
//         user_id: { type: new GraphQLNonNull(GraphQLString) }
//       }
//     },
//     delUser:{
//       type: allUsersWithCount,
//       args: {
//         user_id: { type: new GraphQLNonNull(GraphQLString) }
//       }
//     }
//   }
// });
// const RootQuery = new GraphQLObjectType({
//   name:'RootQuery',
//   fields:{
//     learning:{ type: TryIt },
//     takeAllPosts:{
//       type: allPostsWithCount,
//       args: {
//         page: { type: new GraphQLNonNull(GraphQLInt) },
//         amount: { type: new GraphQLNonNull(GraphQLInt) }
//       }
//     },
//     takeAllUsers:{
//       type: allUsersWithCount,
//       args: {
//         page: { type: new GraphQLNonNull(GraphQLInt) },
//         amount: { type: new GraphQLNonNull(GraphQLInt) }
//       }
//     },
//     takeOnePost:{
//       type: PostStuff,
//       args: {
//         post_id: { type: new GraphQLNonNull(GraphQLString) }
//       }
//     },
//     takeOneUser:{
//       type: UserStuff,
//       args: {
//         user_id: { type: new GraphQLNonNull(GraphQLString) }
//       }
//     }
//   }
// });
// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: RootMutation
// });
