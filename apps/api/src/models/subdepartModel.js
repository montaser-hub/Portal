import mongoose from 'mongoose';
const subDepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    subManagerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
const SubDepartment = mongoose.model('SubDepartment', subDepartmentSchema);
export default SubDepartment;