// Base route path
const baseRoute = '/api'

module.exports = (app) => {
    app.use(`${baseRoute}/auth`, require('./auth.route'))
    app.use(`${baseRoute}/users`, require('./user.route'))
}