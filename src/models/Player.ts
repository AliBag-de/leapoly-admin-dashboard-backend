import mongoose from 'mongoose';

export interface Player extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  level: number;
  experience: number;
  achievements: string[];
  parentId?: mongoose.Types.ObjectId;
  joinedAt: Date;
}

const playerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  level: {
    type: Number,
    default: 1,
    min: 1
  },
  experience: {
    type: Number,
    default: 0,
    min: 0
  },
  achievements: [{
    type: String
  }],
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent'
  }
}, {
  timestamps: true
});

export const Player = mongoose.model<Player>('Player', playerSchema);