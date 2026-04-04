import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import { ROLES } from './utils/constants.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    await User.deleteMany();

    // Create an Admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@university.edu',
      password: 'password123',
      role: ROLES.ADMIN
    });

    await adminUser.save();
    console.log('Seed data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeder: ${error.message}`);
    process.exit(1);
  }
};

seedData();
