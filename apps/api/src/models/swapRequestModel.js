import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema({
  fromScheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true
  },
  toScheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  },
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true

  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'

  },
  message : {
    type: String

  },
  isActive: {
    type: Boolean,
    default: true

  },
  status: {
    type: String,
    enum: ['pending','approved','rejected','cancelled'],
    default: 'pending'

  }
}, { timestamps: true });

const SwapRequest =  mongoose.model('SwapRequest', swapRequestSchema);

export default SwapRequest

