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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
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
    },
    {
        toJSON: {
            virtuals: true,
          },
    }
  //   {
  //     toJSON: {
  //         virtuals: true,
  //       },
  //       id: false,
  // }
);

// Virtual property `friendCount` that gets the amount of friends per user
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });
  
 
// Initialize the User model
const User = model('User', userSchema);

module.exports = User;
