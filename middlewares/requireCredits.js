module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).json({ error: 'You must have at least 1 dollar to create a survey!' })
    }
    next()
}