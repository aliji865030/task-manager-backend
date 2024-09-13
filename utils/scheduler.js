const cron = require('node-cron');
const { sendEmailReminder } = require('./emailService');
const Task = require('../models/Task'); 

const scheduleEmailReminders = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      // Find tasks that are due in the next hour
      const tasksDueSoon = await Task.find({
        dueDate: {
          $gte: now,
          $lt: new Date(now.getTime() + 60 * 60 * 1000), // Next hour
        },
      }).populate('user'); // Populate user to get email

      // Send email reminders for each task due soon
      for (const task of tasksDueSoon) {
        await sendEmailReminder(task.user.email, task.title, task.dueDate);
        console.log(`Email sent for task: ${task.title} to ${task.user.email}`);
      }
    } catch (error) {
      console.error('Error sending email reminders:', error);
    }
  });
};

module.exports = { scheduleEmailReminders };