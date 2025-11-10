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
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 });

 swapRequestSchema.virtual('fromSchedule', {
   ref: 'Schedule',
   localField: 'fromScheduleId',
   foreignField: '_id',
   justOne: true
 })

 swapRequestSchema.virtual('fromUser', {
   ref: 'User',
   localField: 'fromUserId',
   foreignField: '_id',
   justOne: true
 })

 swapRequestSchema.virtual('toUser', {
   ref: 'User',
   localField: 'toUserId',
   foreignField: '_id',
   justOne: true
 })

 swapRequestSchema.virtual('toSchedule', {
   ref: 'Schedule',
   localField: 'toScheduleId',
   foreignField: '_id',
   justOne: true
 })

const SwapRequest =  mongoose.model('SwapRequest', swapRequestSchema);

export default SwapRequest

