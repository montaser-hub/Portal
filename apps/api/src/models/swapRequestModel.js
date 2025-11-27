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
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  approvalHistory: [{
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: [ 'user', 'manager', 'admin' ]
    },
    status: {
      type: String,
      enum: [ 'approved', 'rejected' ]
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
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

 swapRequestSchema.virtual('department', {
   ref: 'Department',
   localField: 'departmentId',
   foreignField: '_id',
   justOne: true
 })

 swapRequestSchema.virtual('SubDepartment', {
   ref: 'SubDepartment',
   localField: 'subDepartmentId',
   foreignField: '_id',
   justOne: true
 })

 swapRequestSchema.virtual('shift', {
   ref: 'Shift',
   localField: 'shiftId',
   foreignField: '_id',
   justOne: true
 })

const SwapRequest =  mongoose.model('SwapRequest', swapRequestSchema);

export default SwapRequest

