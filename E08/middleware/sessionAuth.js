export const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }

    res.status(401).json({ msg: 'Login required' })
}

export const requireAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') {
        return next()
    }

    res.status(403).json({ msg: 'Admin only' })
}