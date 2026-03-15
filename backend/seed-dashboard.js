const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:\\HexStack\\backend\\.env' });

const Project = require('./src/models/Project');
const User = require('./src/models/User');

process.chdir('d:\\HexStack\\backend');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB...');

    // Find the user they just created
    const user = await User.findOne({ email: 'hexstackadmin@gmail.com' });
    if (!user) {
      console.log('User hexstackadmin@gmail.com not found. Please create it via Signup page first.');
      process.exit(1);
    }

    console.log(`Found user: ${user.name} (${user._id})`);

    // Check if project already exists to avoid duplicates
    const existingProject = await Project.findOne({ client_id: user._id });
    if (existingProject) {
      console.log('Project already exists for this user. Updating it...');
    }

    const projectData = {
      client_id: user._id,
      title: 'HexStack Website & Portal Redesign',
      description: 'Full-stack platform upgrade incorporating a continuous analytics pipeline, rich user dashboards nodes, edge rendering caches, and vibrant dynamic visual compositions tailored for high-accuracy lead generations routing metrics.',
      status: 'Active',
      current_stage: 'Design',
      progress: 42,
      total_budget: 15000,
      paid_amount: 6000,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      team_lead: 'Alex Mercer (Lead Full-Stack)',
      files_url: [
        { name: 'Dashboard Figma Boards', url: 'https://figma.com/file/sample' },
        { name: 'Proposal & Scope Spec.pdf', url: 'https://hexstack.com/proposal.pdf' },
        { name: 'Developer Source Repository', url: 'https://github.com/HexStack/portal' },
      ],
      payments: [
        { invoice_id: 'INV-2026-101', amount: 3000, status: 'Paid', date: new Date('2026-03-01') },
        { invoice_id: 'INV-2026-102', amount: 3000, status: 'Paid', date: new Date('2026-03-10') },
        { invoice_id: 'INV-2026-103', amount: 4500, status: 'Pending', date: new Date() },
      ]
    };

    if (existingProject) {
      await Project.findByIdAndUpdate(existingProject._id, projectData);
      console.log('Project updated successfully!');
    } else {
      await Project.create(projectData);
      console.log('New Project created successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

seed();
