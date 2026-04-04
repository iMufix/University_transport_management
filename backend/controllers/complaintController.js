import { asyncHandler } from '../utils/asyncHandler.js';
import * as complaintService from '../services/complaintService.js';

export const createComplaint = asyncHandler(async (req, res) => {
  const complaint = await complaintService.createComplaint(req.user._id, req.body);
  res.status(201).json(complaint);
});

export const getComplaints = asyncHandler(async (req, res) => {
  const role = req.user.role;
  let filters = {};

  if (role === 'student') {
    filters.studentId = req.user._id;
  }

  // Active status filters logic
  if (req.query.status) {
    filters.status = req.query.status;
  }

  const complaints = await complaintService.getComplaints(filters);
  res.json(complaints);
});

export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await complaintService.getComplaintById(req.params.id);
  if (!complaint) {
    res.status(404);
    throw new Error('Complaint block not found mapped locally.');
  }
  res.json(complaint);
});

export const updateComplaintStatus = asyncHandler(async (req, res) => {
  const complaint = await complaintService.updateComplaintStatus(req.params.id, req.body.status);
  res.json(complaint);
});

export const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await complaintService.deleteComplaint(req.params.id);
  res.json({ message: 'Complaint sequence successfully removed from core registers.' });
});
