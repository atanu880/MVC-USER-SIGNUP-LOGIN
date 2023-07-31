
const{Schema,model}=require("mongoose")

const userSchema=new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true 
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
},
{
    timestamps:true  //it tells when the document is created
})
module.exports=model("user",userSchema)
