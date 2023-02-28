const {User, Thought} = require('../models');

const userController = {
    getAllUsers(req,res) {
        User.find({}).then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getOneUser(req,res){
        User.findOne({_id:req.params.userId})
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(data => {
            if (!data) {
                res.status(404).json({msg:"No user with this Id"});
                return;
            }
            res.json(data);
        }).catch(err=> {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createUser({body},res) {
        User.create(body).then(data => res.json(data))
        .catch(err => res.status(400).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({_id:req.params.userId})
        .then(data=>{
            if (!data) {
                return res.status(404).json({msg:"No user with this Id"});
            }
        }).then(()=> {
            res.json({msg:"User deleted"});
        }).catch(err => res.status(400).json(err));
    },
}

if (typeof module === 'object') {
    module.exports = userController;
}
