const {User, Thought} = require("../models");

const thoughtController = {
    getAllThoughts(req,res){
        Thought.find({})
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getOneThought({params}, res) {
        Thought.findOne({_id:params.thoughtId})
        .then(data => {
            if (!data) {
                res.status(404).json({msg:"No thought found"});
                return
            }
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    addThought({params,body},res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id:params.userId},
                {$push: {thoughts: _id}},
                {new:true}
            );
        }).then(data => {
            if(!data) {
                res.status(404).json({msg: "No user found"});
                return;
            }
            res.json(data);
        }).catch(err => res.json(err));
    },

    deleteThought({ params,body},res) {
        Thought.findOneAndUpdate({_id: params.thoughtId},body, {new:true, runValidators:true})
        .then(data => {
            if (!data) {
                res.status(404).json({msg: "No thought found"});
                return;
            }
            res.json(data);
        }).catch(err => res.status(400).json(err));
    },
}

module.exports = thoughtController;