const express=require("express")
const router=express.Router()
const wrapAsync=require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const {listingSchema}=require("../schema.js")
const ExpressError=require("../utils/ExpressError.js")
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js")

const listingController=require("../controllers/listings.js")


router.route("/")
//index route
.get(wrapAsync(listingController.index))
//create route
.post(isLoggedIn,validateListing,wrapAsync(listingController.createListing))


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm)


router.route("/:id")
//show route
.get(wrapAsync(listingController.showListings))
//update route
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
//delete route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))


//edit route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))


module.exports=router