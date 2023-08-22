// Base route path
const baseRoute = '/api'

module.exports = (app) => {
    app.use(`${baseRoute}/users`, require('./user.route'))
}