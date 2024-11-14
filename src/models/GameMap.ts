import mongoose from 'mongoose';

export interface GameMap extends mongoose.Document {
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  layout: object;
  objectives: string[];
  rewards: {
    experience: number;
    achievements: string[];
  };
  createdAt: Date;
}

const gameMapSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  layout: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  objectives: [{
    type: String,
    required: true
  }],
  rewards: {
    experience: {
      type: Number,
      required: true,
      min: 0
    },
    achievements: [{
      type: String
    }]
  }
}, {
  timestamps: true
});

export const GameMap = mongoose.model<GameMap>('GameMap', gameMapSchema);