const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);;
      req.flash("success", "Welcome to Yelpcamp");
      res.redirect("/campgrounds");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Goodbye!");
    res.redirect("/");
  });
};

module.exports.renderProfile = (req, res) => {
  res.render('users/profile', { user: req.user });
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, 
      { fullName, email }, 
      { new: true }
    );
    
    if (req.file) {
      user.profileImage = req.file.path; // If using file upload
      await user.save();
    }
    
    req.flash('success', 'Profile updated successfully');
    res.redirect('/profile');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/profile');
  }
};
