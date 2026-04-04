import mongoose from 'mongoose';
import { COMPLAINT_STATUS } from '../utils/constants.js';

const complaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: Object.values(COMPLAINT_STATUS), default: COMPLAINT_STATUS.OPEN }
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);
