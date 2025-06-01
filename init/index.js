const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const mongo_url="mongodb://127.0.0.1:27017/wonder_lust";
main()
.then(()=>{
    console.log("connect to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_url);
}
const initDB =async () => {
    await Listing.deleteMany({});
     initData.data=initData.data.map((obj)=>({...obj,owner:'6839a02a21c3455ee9e5e649'}))
     await Listing.insertMany(initData.data);
     console.log("successful data initialized");
};
initDB();