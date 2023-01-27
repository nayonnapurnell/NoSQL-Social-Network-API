const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
  } = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
.get(getThoughts)
.post(createThought);

// /api/applications/:thoughtId
router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction);



module.exports = router;