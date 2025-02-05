import mongoose from "mongoose";
import dotenv from "dotenv";
import transactionModel from "../models/transaction.model.js"; // Adjust the path to your transaction model

dotenv.config(); // Load environment variables

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");

    // Insert demo data after successful connection
    await insertDemoData();
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

// Demo Transaction Data
const demoTransactions = [
  // Previous demo transactions

  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 4000,
    type: 'Income',
    description: 'Consulting fees',
    date: new Date('2024-03-05T10:15:25.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 1000,
    type: 'Expense',
    description: 'Rent',
    date: new Date('2024-03-12T14:10:40.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 300,
    type: 'Expense',
    description: 'Public transportation',
    date: new Date('2024-04-01T08:05:10.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 2000,
    type: 'Income',
    description: 'Freelance web development',
    date: new Date('2024-04-10T11:30:25.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 800,
    type: 'Expense',
    description: 'Groceries',
    date: new Date('2024-05-05T15:00:30.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 7000,
    type: 'Income',
    description: 'Project milestone payment',
    date: new Date('2024-05-15T17:45:45.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 2500,
    type: 'Expense',
    description: 'Laptop repair',
    date: new Date('2024-06-03T13:20:30.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 4000,
    type: 'Income',
    description: 'Startup investment',
    date: new Date('2024-06-10T09:00:55.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 350,
    type: 'Expense',
    description: 'Dinner with clients',
    date: new Date('2024-07-12T18:30:50.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 1200,
    type: 'Expense',
    description: 'Gym membership',
    date: new Date('2024-07-20T07:45:30.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 9000,
    type: 'Income',
    description: 'End-of-project payment',
    date: new Date('2024-08-01T14:25:10.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 1300,
    type: 'Expense',
    description: 'Conference tickets',
    date: new Date('2024-08-10T11:10:00.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 500,
    type: 'Expense',
    description: 'Phone bill',
    date: new Date('2024-09-05T16:00:00.321+00:00'),
  },
  {
    userId: new mongoose.Types.ObjectId('679cd47f7b2363ac0a40e3de'), // Replace with actual user ObjectId
    amount: 4000,
    type: 'Income',
    description: 'Affiliate program earnings',
    date: new Date('2024-09-20T12:50:35.321+00:00'),
  }
];

// Function to Insert Demo Data
const insertDemoData = async () => {
  try {
    // Insert demo data into the transaction collection
    await transactionModel.insertMany(demoTransactions);
    console.log('✅ Demo data inserted successfully!');
    mongoose.disconnect(); // Disconnect from the database after insertion
  } catch (error) {
    console.error('❌ Error inserting demo data:', error);
    mongoose.disconnect();
  }
};

// Start the database connection and insert demo data
connectDB();
export default connectDB;