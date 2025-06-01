const User=require("../models/user");
module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signupRoute=async(req,res)=>{
try{
     let {username,email,password}=req.body;
   const newUser=new User({username,email});
   const registeredUser=await User.register(newUser,password);
   console.log(registeredUser);
   req.login(registeredUser,(err)=>{
    if(err){
        next(err);
    }
     req.flash("success","Welcome to wonder_lust");
   res.redirect("/listings");
   })
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}
};
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};
module.exports.loginRoute= async(req,res)=>{
   req.flash("success","welcome back to wonderLust");
   let redirectUrl=res.locals.redirectUrl || "/listings";
res.redirect(redirectUrl);
};
module.exports.logoutRoute=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are successfully logged out");
        res.redirect("/listings");
    })
};