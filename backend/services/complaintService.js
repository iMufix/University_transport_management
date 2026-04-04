import Complaint from '../models/Complaint.js';

export const createComplaint = async (studentId, data) => {
  return await Complaint.create({
    studentId,
    message: data.message,
    status: data.status || 'open'
  });
};

export const getComplaints = async (filters = {}) => {
  return await Complaint.find(filters).populate('studentId', 'name email role').sort({ createdAt: -1 });
};

export const getComplaintById = async (id) => {
  return await Complaint.findById(id).populate('studentId', 'name email');
};

export const updateComplaintStatus = async (id, status) => {
  return await Complaint.findByIdAndUpdate(id, { status }, { new: true }).populate('studentId', 'name email');
};

export const deleteComplaint = async (id) => {
  return await Complaint.findByIdAndDelete(id);
};
