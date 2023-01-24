const { Schema, model } = require('mongoose');

// Schema to create a user model
const userSchema = new Schema(
{
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,    
      },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Email validation failed'
          }
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    }
);

module.exports = userSchema;
