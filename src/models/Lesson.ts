import mongoose from 'mongoose';

export interface LessonDetails extends mongoose.Document {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  objectives: string[];
  materials: string[];
  teacherId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  objectives: [{
    type: String,
    required: true
  }],
  materials: [{
    type: String
  }],
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  }
}, {
  timestamps: true
});

export const Lesson = mongoose.model<LessonDetails>('Lesson', lessonSchema);