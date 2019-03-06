// const _ = require('lodash');
const mongoose = require('mongoose');
const validation = require('validator');

const postSchema = require('../db/post.schema');
const userSchema = require('../db/creator.schema');

module.exports = {
  // do not need it, but let it be
  learning:(args,req)=>{
    return {
      text:'Hello world!!!',
      number: 10,
      task: 'Work hard'
    }
  },
  // query
  takeAllPosts:async (args,req)=>{
    const page = parseInt(args.page);
    const amount = parseInt(args.amount);
    const stuff = await postSchema.find().sort({'_id': -1}).skip((page-1)*amount).limit(amount).populate('creator');
    const count = await postSchema.countDocuments();
    return {stuff,count}
  },
  takeOnePost:async (args,req)=>{
    const time = await postSchema.findById(args.post_id);
    await postSchema.findByIdAndUpdate(args.post_id,{views: time.views+1});
    const post = await postSchema.findById(args.post_id).populate('creator');
    return post
  },
  takeAllUsers:async (args,req)=>{
    const page = parseInt(args.page);
    const amount = parseInt(args.amount);
    const stuff = await userSchema.find().sort({'_id': -1}).skip((page-1)*amount).limit(amount);
    for(let i=0; i<stuff.length; i++){
      stuff[i].posts = await postSchema.find({ creator:stuff[i]._id });
    }
    const count = await userSchema.countDocuments();
    return {stuff,count}
  },
  takeOneUser:async (args,req)=>{
    const user = await userSchema.findById(args.user_id).populate('creator');
    return user
  },
  // mutation
  addPost:async (args,req)=>{
    if(!args.dataPost.creator){
      throw new Error('Need creator of post');
    }
    const userId = new mongoose.mongo.ObjectId(args.dataPost.creator);
    const newPost = new postSchema({
      name:args.dataPost.name,
      creator:userId
    });
    await newPost.save();
    const stuff = await postSchema.find().sort({'_id': -1}).skip(0).limit(5).populate('creator');
    const count = await postSchema.countDocuments();
    return{stuff,count}
  },
  updPost:async (args,req)=>{
    if(args.dataPost.creator){
      throw new Error('Do not need creator id');
    }
    await postSchema.findByIdAndUpdate(args.post_id,{ name:args.dataPost.name });
    const post = await postSchema.findById(args.post_id).populate('creator');
    return post;
  },
  delPost:async (args,req)=>{
    await postSchema.findByIdAndDelete(args.post_id);
    const stuff = await postSchema.find().sort({'_id': -1}).skip(0).limit(5).populate('creator');
    const count = await postSchema.countDocuments();
    return {stuff,count}
  },
  addUser:async (args,req)=>{
    if(validation.isEmpty(args.dataUser.name)){
      throw new Error('You must give a name of new user');
    }
    const newUser=new userSchema({
      name:args.dataUser.name,
      age:args.dataUser.age,
      married:args.dataUser.married
    });
    await newUser.save();
    const stuff = await userSchema.find().sort({'_id': -1}).skip(0).limit(5);
    for(let i=0; i<stuff.length; i++){
      stuff[i].posts = await postSchema.find({ creator:stuff[i]._id });
    }
    const count = userSchema.countDocuments();
    return{stuff,count}
  },
  updUser:async (args,req)=>{
    if(!args.dataUser.name && !args.dataUser.age && !args.dataUser.married){
      throw new Error('You must fill at list one field name, age or married');
    }
    const update = {};
    if(args.dataUser.name){
      update.name = args.dataUser.name
    }
    if(args.dataUser.age){
      update.age = args.dataUser.age
    }
    if(args.dataUser.married){
      update.married=args.dataUser.married
    }
    await userSchema.findByIdAndUpdate(args.user_id, update);
    const user = await userSchema.findById(args.user_id);
    user.posts = await postSchema.find({ creator:user._id });
    return user
  },
  delUser:async (args,req)=>{
    await userSchema.findByIdAndDelete(args.user_id);
    const stuff = await userSchema.find().sort({'_id': -1}).skip(0).limit(5);
    for(let i=0; i<stuff.length; i++){
      stuff[i].posts = await postSchema.find({ creator:stuff[i]._id });
    }
    const count = await userSchema.countDocuments();
    return {stuff,count}
  }
};
