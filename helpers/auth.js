module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        console.log('Not authorized.');
        res.redirect('/notAuthorized');
    }
}