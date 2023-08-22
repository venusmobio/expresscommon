module.exports = {
    message: (module, action, status = true) => {
        return `${module} ${action} ${status ? 'Success' : 'Failed'}`
    },
    userModule: 'User'
}