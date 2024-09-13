const nodemailer = require('nodemailer');

const sendEmailReminder = async (email, taskTitle, dueDate) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Task Reminder',
    text: `Reminder: Your task "${taskTitle}" is due on ${dueDate}.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmailReminder };