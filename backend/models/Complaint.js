import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' }
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);
