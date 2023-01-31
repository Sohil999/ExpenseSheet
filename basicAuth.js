function authUser(req, res, next){
    let userId = req.params.userId * 1

    if(userId === null){
        res.status(404).json({
            status: 'fail',
            message: 'Please enter an id'
        })
    }
    next()
}

module.exports = {
    authUser
}