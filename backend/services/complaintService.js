import Complaint from '../models/Complaint.js';

export const createComplaint = async (complaintData) => {
  return await Complaint.create(complaintData);
};

export const getComplaints = async () => {
  return await Complaint.find({}).populate({
    path: 'studentId',
    populate: { path: 'userId', select: 'name email' }
  });
};

export const updateComplaintStatus = async (id, status) => {
  return await Complaint.findByIdAndUpdate(id, { status }, { new: true });
};
