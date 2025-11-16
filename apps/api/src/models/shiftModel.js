
import mongoose from 'mongoose';
import { timeStringToMinutes, minutesToTimeString, calculateShiftDuration, isOvernightShift, formatDuration } from "../utils/timeUtils.js";

const shiftSchema = new mongoose.Schema({
  shiftName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  shiftType: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: Number,
    required: true,
    min: 0,
    max: 1439, // 24*60 - 1
    set: v => typeof v === "string" ? timeStringToMinutes(v) : v
  },
  endTime: {
    type: Number,
    required: true,
    min: 0,
    max: 1439,
    set: v => typeof v === "string" ? timeStringToMinutes( v ) : v,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  subDepartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubDepartment'
  }
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Duration in minutes (supports overnight shifts)
shiftSchema.virtual('durationMinutes').get(function () {
  return calculateShiftDuration(this.startTime, this.endTime);
});

// Is this an overnight shift?
shiftSchema.virtual('isOvernight').get(function () {
  return isOvernightShift(this.startTime, this.endTime);
});

// Formatted start time
shiftSchema.virtual('startTimeFormatted').get(function () {
  return minutesToTimeString(this.startTime);
});

// Formatted end time
shiftSchema.virtual('endTimeFormatted').get(function () {
  return minutesToTimeString(this.endTime);
});

// Readable duration
shiftSchema.virtual('durationFormatted').get(function () {
  return formatDuration(this.durationMinutes);
});

shiftSchema.virtual( 'department', {
  ref: 'Department',
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true
});

shiftSchema.virtual( 'subDepartment', {
  ref: 'SubDepartment',
  localField: 'subDepartmentId',
  foreignField: '_id',
  justOne: true
});

shiftSchema.index( { shiftType: 1, shiftName: 1 }, { unique: true } );

export default mongoose.model('Shift', shiftSchema);
