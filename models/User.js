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
    },
    {
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

// Virtual property `friendCount` that gets the amount of friends per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const friends = v.aggregate();
    this.set({ friends });
  });
  
 
// Initialize the User model
const User = model('user', userSchema);

module.exports = User;
