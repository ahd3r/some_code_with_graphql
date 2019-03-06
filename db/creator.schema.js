const { Schema,model }=require('mongoose');

const UsersSchema=new Schema({
  name:{ type:String, required:true },
  age:{ type:Number },
  created: { type:String, default:Date() },
  married:{ type:Boolean }
});

module.exports=model('users',UsersSchema);
