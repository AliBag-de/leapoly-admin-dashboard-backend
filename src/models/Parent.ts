import mongoose from 'mongoose';

export interface Parent extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  children: mongoose.Types.ObjectId[];
  contactNumber: string;
  joinedAt: Date;
}

const parentSchema = new mongoose.Schema({
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
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  contactNumber: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Parent = mongoose.model<Parent>('Parent', parentSchema);