const User = require("../models/user.js");


module.exports.renderSingupForm = (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.signup = async(req, res) => {
   try {
    let {username, email, password} = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "welcome to wanderlust!");
        res.redirect("/listings");
    });
   } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
   }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs") 
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to Wanderlust! You are logged in!");
    res.redirect("/listings"); // Fallback in case redirectUrl is undefined  // res.locals.redirectUrl ||
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logged you out!");
        res.redirect("/listings");
    })
};