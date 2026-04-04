import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  date: { type: String, required: true }, // Format YYYY-MM-DD
  status: { type: String, enum: ['Present', 'Absent'], default: 'Present' }
}, { timestamps: true });

// Prevent duplicate attendance for same student on same date
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);
