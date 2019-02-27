const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = {
  learning:()=>{
    return {
      text:'Hello world!!!',
      number: 10,
      dunno: Date()
    }
  },
  takeAll:()=>{
    const info = fs.readFileSync(path.resolve(__dirname,'../data.json'));
    const { posts } = JSON.parse(info);
    return {
      stuff:posts,
      count: posts.length
    }
  },
  takeOne:(args,req)=>{
    const id = parseInt(args.id);
    const { posts } = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data.json')));
    return _.find(posts,{ id });
  },
  addPost: (args,req)=>{
    const nameForNewPost = args.dataPost.name;
    const { posts } = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data.json')));
    const newPost = {id: posts[posts.length-1].id+1, name: nameForNewPost,views:0,created:Date(),creator:1};
    posts.push(newPost);
    fs.writeFileSync(path.resolve(__dirname,'../data.json'),JSON.stringify({ posts }));
    return {
      stuff: posts,
      count: posts.length
    }
  },
  updPost: (args,req)=>{
    const id = parseInt(args.id);
    const { posts } = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data.json')));
    const indOfRightPost = _.findIndex(posts,{ id });
    const newData={id,name:args.updtDataPost.name,views:posts[indOfRightPost].views,created:Date(),creator:posts[indOfRightPost].creator};
    posts[indOfRightPost]=newData;
    fs.writeFileSync(path.resolve(__dirname,'../data.json'),JSON.stringify({posts}));
    return posts[indOfRightPost];
  },
  delPost: (args,req)=>{
    const id = parseInt(args.id);
    const { posts } = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data.json')));
    posts.splice(_.findIndex(posts,{ id }),1);
    fs.writeFileSync(path.resolve(__dirname,'../data.json'),JSON.stringify({posts}));
    return {
      stuff:posts,
      count:posts.length
    }
  }
};
