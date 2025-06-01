const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js")
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});
//validate schema
router.route("/listings")
//index route
.get(wrapAsync(listingController.index))
//create route
.post(isLoggedIn,upload.single("listing[image]"),wrapAsync(listingController.createListing));

// new route
router.get("/listings/new",isLoggedIn,listingController.renderNewlisting);
router.route("/listings/:id")
//show route
.get(wrapAsync(listingController.showListing))
//update route
.put(isLoggedIn,isOwner,validateListing,upload.single("listing[image]"),wrapAsync(listingController.updateListing))
//delete route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))

// //create route
// router.post("/listings",async(req,res,next)=>{
//    try{
//      const newListing=new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
//    }
//    catch(err){
//     next(err);
//    }
// })

//edit route
router.get("/listings/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

module.exports=router;