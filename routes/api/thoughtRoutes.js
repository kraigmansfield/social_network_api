const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    addThought,
    deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts GET all and POST thought
router.route('/').get(getAllThoughts).post(addThought);

// /api/thoughts/:thoughtId GET one thought, PUT and DELETE by iD
router.route('/:thoughtId')
.get(getOneThought)
.delete(deleteThought);



module.exports = router;