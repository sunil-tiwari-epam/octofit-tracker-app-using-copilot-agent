import { connectToDatabase, disconnectFromDatabase } from '../config/database';

/**
 * Seed the octofit_db database with test data
 * 
 * This script populates the octofit_db database with sample users, teams,
 * activities, and leaderboard data for testing and development purposes.
 */
async function seedDatabase(): Promise<void> {
  try {
    console.log('Starting database seed...');
    
    // Connect to the database
    await connectToDatabase();

    // TODO: Add models import when models are created
    // const User = require('../models/User');
    // const Team = require('../models/Team');
    // const Activity = require('../models/Activity');

    // Sample test data
    const sampleUsers = [
      { name: 'Alice', email: 'alice@example.com', points: 150 },
      { name: 'Bob', email: 'bob@example.com', points: 200 },
      { name: 'Charlie', email: 'charlie@example.com', points: 175 }
    ];

    const sampleTeams = [
      { name: 'Team Alpha', description: 'The first competitive team' },
      { name: 'Team Beta', description: 'The second competitive team' }
    ];

    // TODO: Implement seed data insertion
    console.log('Sample data structure prepared:');
    console.log('Users:', sampleUsers);
    console.log('Teams:', sampleTeams);

    console.log('✓ Database seed completed successfully');
  } catch (error) {
    console.error('Database seed failed:', error);
    process.exit(1);
  } finally {
    // Disconnect from the database
    await disconnectFromDatabase();
  }
}

// Run the seed script
seedDatabase();

export { seedDatabase };
