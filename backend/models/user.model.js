import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [3, 'Full name must be at least 3 characters long'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [4, 'Username must be at least 4 characters long'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      validate: {
        validator: (v) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(v),
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      },
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['male', 'female'],
        message: 'Gender must be either "male" or "female"',
      },
    },
    profilePic: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.index({ username: 1 });

const User = model('User', userSchema);

export default User;
