if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://user1:password1@ds211708.mlab.com:11708/quickly-dev'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/quick-dev'
    }
}


