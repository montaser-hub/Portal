import mongoose from 'mongoose';
const subDepartmentSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  departmentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  subManagerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

subDepartmentSchema.virtual('subManager', {
  ref: 'User',
  localField: 'subManagerId',
  foreignField: '_id',
  justOne: true
})

subDepartmentSchema.virtual('department', {
  ref: 'Department',
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true
});


const SubDepartment = mongoose.model('SubDepartment', subDepartmentSchema);
export default SubDepartment;
