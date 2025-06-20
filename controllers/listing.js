const Listing=require("../models/listing");
module.exports.index=async(req,res)=>{
     const allListings=await Listing.find({});
     res.render("listings/index.ejs",{allListings});
};
module.exports.renderNewlisting=(req,res)=>{
    res.render("listings/new.ejs");
};
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};
module.exports.createListing=async(req,res,next)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(404,"Send valid data for listing");
    // }

//       let result=listingSchema.validate(req.body);
//         console.log(result);
//         if(result.error){
// throw new ExpressError(404,result.error);
//         }
let url=req.file.path;
let filename=req.file.filename;
     const newListing=new Listing(req.body.listing);
     newListing.owner=req.user._id;
     newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
};
module.exports.editListing=async(req,res)=>{
     let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
         req.flash("error","listing you requested for does not exist");
         return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const listing=await Listing.findByIdAndUpdate(id);
    if(typeof req.file!="undefined"){
        let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    const deleteList=await Listing.findByIdAndDelete(id);
    console.log(deleteList);
     req.flash("success"," listing deleted");
    res.redirect("/listings");
}