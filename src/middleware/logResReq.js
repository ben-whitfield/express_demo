const logOut = (req, res, next) => {
    console.log('req is', req)
    console.log('res is', res)

    next()
}

module.exports = logOut