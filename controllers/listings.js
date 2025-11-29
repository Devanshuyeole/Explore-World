const Listing = require("../models/listing.js");


//index route
module.exports.index=async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }


//new route
module.exports.renderNewForm=(req,res)=>{
    console.log(req.user)
    res.render("listings/new.ejs")
  }


//show route
module.exports.showListings=async(req,res)=>{
    let {id}=req.params
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")
    if(!listing){
      req.flash("error","listing not exists")
      res.redirect("/listings")
    }
    res.render("listings/show.ejs",{listing})
  }


//create route
module.exports.createListing=async(req,res,next)=>{
      //let {title,description,image,price,location,country}=req.body
    const newListing=new Listing(req.body.listing)
    newListing.owner=req.user._id
    await newListing.save()
    req.flash("success","new listing created")
    res.redirect("/listings")
  }


//edit route
module.exports.renderEditForm=async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","listing not exists")
      res.redirect("/listings")
    }
    res.render("listings/edit.ejs", { listing });
  }


//update route
module.exports.updateListing=async(req,res)=>{
    let {id}=req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success","listing updated")
    res.redirect("/listings")
  }


//delete route
module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params
    let deleted=await Listing.findByIdAndDelete(id)
    req.flash("success","listing deleted")
    res.redirect("/listings")
  }