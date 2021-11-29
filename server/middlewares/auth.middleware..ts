
const auth = (req, res, next) => {
    req.body.user = {id: 1, firtName: 'rémy', lastName: 'pelletier', email: 'remypelletier@gmail.com'}
    next();
}

export {
    auth
}
