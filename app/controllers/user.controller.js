
/*
    User List
    API URL = /users
    Method = GET
*/
exports.list = async (req, res) => {
    try {
        return res.json({ status: true, message: 'User List Success'})
    } catch(error) {
        return res.json({ status: false, message: 'User List Failed'})
    }
}