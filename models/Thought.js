const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp)=>timestamp.toLocaleDateString(),
    },
    username: {
        type: String,
        required: true,   
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
}
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
  });


// Initialize the Reaction model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;