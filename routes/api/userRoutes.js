
const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    deleteUser,
} = require('../../controllers/userController');

// /api/users GET all and POST 
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId GET one user, PUT and DELETE by user's ID
router.route('/:userId')
.get(getOneUser)
.delete(deleteUser);


module.exports = router;