import mongoose from 'mongoose';
import { ATTENDANCE_STATUS } from '../utils/constants.js';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: Object.values(ATTENDANCE_STATUS), required: true }
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);
