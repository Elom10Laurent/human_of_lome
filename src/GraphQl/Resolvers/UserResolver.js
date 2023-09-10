const Userservice=require("../Services/UserService");
const resolvers={
    Query:{
        users:async()=>{
            return await Userservice.getAll();
        }
    },
    Mutation:{
        addUser:(parent,args)=>{
            const newUser={id:String(users.length+1),
            ...args};
            Userservice.addUser(newUser);
            return newUser;
        }
    }
}
module.exports=resolvers;