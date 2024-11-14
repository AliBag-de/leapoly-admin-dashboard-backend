import mongoose from 'mongoose';

export interface Teacher extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  subjects: string[];
  qualifications: string[];
  isVerified: boolean;
  joinedAt: Date;
}

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  subjects: [{
    type: String,
    required: true
  }],
  qualifications: [{
    type: String,
    required: true
  }],
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Teacher = mongoose.model<Teacher>('Teacher', teacherSchema);