const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name:process.env.Cloud_Name,
    api_key:process.env.Cloud_API_KEY,
    api_secret:process.env.Cloud_API_SECRET,
});
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
     folder:"wonder_lust_development",
     allowed_formats:["jpg","jpeg","png"],
    },
});
module.exports={
    cloudinary,
    storage,
}