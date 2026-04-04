import { asyncHandler } from '../utils/asyncHandler.js';
import * as complaintService from '../services/complaintService.js';

export const createComplaint = asyncHandler(async (req, res) => {
  const complaint = await complaintService.createComplaint({ ...req.body, studentId: req.body.studentId });
  res.status(201).json(complaint);
});

export const getComplaints = asyncHandler(async (req, res) => {
  const complaints = await complaintService.getComplaints();
  res.json(complaints);
});

export const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const complaint = await complaintService.updateComplaintStatus(req.params.id, status);
  res.json(complaint);
});
