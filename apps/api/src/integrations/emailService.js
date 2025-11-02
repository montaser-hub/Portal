import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import {htmlToText} from 'html-to-text';
import { config } from '../configs/env.js';
export default class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `Egy Tech <${config.email.from}>`;
  }

  newTransport() {
    if (config.email.useSendGrid) {
      //Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: config.email.sendgridUser,
          pass: config.email.sendgridPass,
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: config.email.username,
          pass: config.email.password
      }
    });
  }

  // Load template HTML and replace placeholders
  loadTemplate(templateName, replacements) {
    const filePath = path.join(process.cwd(), 'apps/api/src/utils/emailTemplates', `${templateName}.html`);
    let html = fs.readFileSync(filePath, 'utf-8');

    // Replace placeholders like {{firstName}} or {{url}}
    Object.entries(replacements).forEach(([key, value]) => {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    return html;
  }
  // Send the actual email
  async send(template, subject) {
    // 1) render HTML based on the template
    const html = this.loadTemplate(template, {
      firstName: this.firstName,
      url: this.url,
    });
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text:  htmlToText(html)
    };
    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Our Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Password Reset token (valid for only 10 minutes)'
    );
  }
};
