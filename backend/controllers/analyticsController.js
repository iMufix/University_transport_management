import { asyncHandler } from '../utils/asyncHandler.js';
import * as analyticsService from '../services/analyticsService.js';

export const getOverview = asyncHandler(async (req, res) => {
  const data = await analyticsService.getOverviewAnalytics();
  res.json(data);
});

export const getAttendanceTrend = asyncHandler(async (req, res) => {
  const data = await analyticsService.getAttendanceTrend();
  const formatted = data.map(d => ({ name: d._id, Present: d.count }));
  res.json(formatted);
});

export const getBusUsage = asyncHandler(async (req, res) => {
  const data = await analyticsService.getBusUsage();
  const formatted = data.map(d => ({ name: `Bus ${d.busNumber || 'N/A' }`, Students: d.count }));
  res.json(formatted);
});
