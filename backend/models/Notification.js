import mongoose from 'mongoose';
import { ROLES } from '../utils/constants.js';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  targetRole: { type: String, enum: [...Object.values(ROLES), 'all'], default: 'all' },
  readStatus: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
