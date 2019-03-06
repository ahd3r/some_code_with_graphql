const { Schema,model }=require('mongoose');

const PostsSchema=new Schema({
  name:{ type:String, required:true },
  views:{ type:Number, default:0 },
  created:{ type:String, default:Date() },
  creator:{ type: Schema.Types.ObjectId, required:true, ref:'users' }
});

module.exports=model('posts',PostsSchema);
