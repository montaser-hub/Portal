/**
 * Fills a local database with demo data so the dashboards have something to
 * show: an org structure, staff, shifts, four weeks of schedules, swap
 * requests and notifications.
 *
 *   node apps/api/scripts/seed.mjs        (from the repo root)
 *
 * It wipes the collections it fills, so it refuses to run in production.
 */
import mongoose from 'mongoose';
import { config } from '../src/configs/env.js';
import Location from '../src/models/LocationModel.js';
import Department from '../src/models/departmentModel.js';
import SubDepartment from '../src/models/subdepartModel.js';
import Position from '../src/models/positionModel.js';
import Level from '../src/models/levelModel.js';
import User from '../src/models/userModel.js';
import Shift from '../src/models/shiftModel.js';
import Schedule from '../src/models/scheduleModel.js';
import SwapRequest from '../src/models/swapRequestModel.js';
import Notification from '../src/models/notificationModle.js';

if (config.nodeEnv === 'production') {
  console.error('Refusing to seed: NODE_ENV is production.');
  process.exit(1);
}

const PASSWORD = 'Demo1234!';
export const DEMO_LOGINS = {
  admin: 'admin@smartshift.test',
  manager: 'manager@smartshift.test',
  employee: 'sara@smartshift.test',
};

/** Midnight UTC, `offset` days from today. */
const day = (offset) => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + offset);
  return d;
};

async function seed() {
  await mongoose.connect(config.dbUri);
  await Promise.all(
    [Notification, SwapRequest, Schedule, Shift, User, Level, Position, SubDepartment, Department, Location].map(
      (Model) => Model.deleteMany({})
    )
  );

  const [hq, branch] = await Location.insertMany([
    { name: 'Main Hospital', street: '12 Nile Corniche', city: 'Cairo', state: 'Cairo', country: 'Egypt', postalCode: '11511' },
    { name: 'Alexandria Clinic', street: '45 El Horreya Rd', city: 'Alexandria', state: 'Alexandria', country: 'Egypt', postalCode: '21500' },
  ]);

  const [nurse, physician] = await Position.insertMany([{ name: 'Nurse' }, { name: 'Physician' }]);
  const levels = await Level.insertMany([
    { name: 'Junior', positionId: nurse._id },
    { name: 'Senior', positionId: nurse._id },
    { name: 'Junior', positionId: physician._id },
    { name: 'Senior', positionId: physician._id },
  ]);
  const level = (position, name) => levels.find((l) => l.positionId.equals(position._id) && l.name === name);

  const [emergency, clinic] = await Department.insertMany([
    { name: 'Emergency', locationId: hq._id },
    { name: 'Outpatient Clinic', locationId: branch._id },
  ]);
  const [triage] = await SubDepartment.insertMany([
    { name: 'Triage', departmentId: emergency._id },
    { name: 'Resuscitation', departmentId: emergency._id },
    { name: 'General Practice', departmentId: clinic._id },
  ]);

  // create() rather than insertMany(): passwords are hashed in a save hook.
  const people = [
    ['admin', 'Admin', 'User', DEMO_LOGINS.admin, 'admin', nurse, 'Senior', emergency],
    ['mona', 'Mona', 'Hassan', DEMO_LOGINS.manager, 'manager', nurse, 'Senior', emergency],
    ['sara', 'Sara', 'Ahmed', DEMO_LOGINS.employee, 'user', nurse, 'Junior', emergency],
    ['omar', 'Omar', 'Khaled', 'omar@smartshift.test', 'user', nurse, 'Junior', emergency],
    ['nour', 'Nour', 'Adel', 'nour@smartshift.test', 'user', nurse, 'Senior', emergency],
    ['youssef', 'Youssef', 'Samir', 'youssef@smartshift.test', 'user', nurse, 'Junior', emergency],
    ['karim', 'Karim', 'Nabil', 'karim@smartshift.test', 'user', physician, 'Senior', clinic],
    ['laila', 'Laila', 'Fathy', 'laila@smartshift.test', 'user', physician, 'Junior', clinic],
  ];
  const users = {};
  for (const [i, [nickname, firstName, lastName, email, role, position, levelName, department]] of people.entries()) {
    users[nickname] = await User.create({
      employeeId: `EMP-${String(i + 1).padStart(3, '0')}`,
      nickname,
      firstName,
      lastName,
      email,
      role,
      password: PASSWORD,
      positionId: position._id,
      levelId: level(position, levelName)._id,
      departmentId: department._id,
      contactNumber: `+20 100 000 ${String(1000 + i)}`,
    });
  }
  await Department.updateOne({ _id: emergency._id }, { managerId: users.mona._id });
  await SubDepartment.updateOne({ _id: triage._id }, { subManagerId: users.nour._id });

  const shifts = await Shift.insertMany([
    { shiftName: 'Morning', shiftType: 'Regular', startTime: '07:00', endTime: '15:00', departmentId: emergency._id },
    { shiftName: 'Evening', shiftType: 'Regular', startTime: '15:00', endTime: '23:00', departmentId: emergency._id },
    { shiftName: 'Night', shiftType: 'Regular', startTime: '23:00', endTime: '07:00', departmentId: emergency._id },
    { shiftName: 'Day', shiftType: 'Regular', startTime: '08:00', endTime: '16:00', departmentId: clinic._id },
  ]);
  const [morning, evening, night, clinicDay] = shifts;

  // Two weeks back, two weeks ahead: five days on, two off, rotating shifts.
  const emergencyStaff = ['sara', 'omar', 'nour', 'youssef'];
  const rotation = [morning, evening, night];
  const schedules = [];
  for (let offset = -14; offset <= 14; offset++) {
    emergencyStaff.forEach((nickname, i) => {
      if ((offset + 14 + i * 2) % 7 >= 5) return; // days off
      const week = Math.floor((offset + 14) / 7);
      schedules.push({
        date: day(offset),
        userId: users[nickname]._id,
        departmentId: emergency._id,
        subDepartmentId: triage._id,
        shiftId: rotation[(i + week) % rotation.length]._id,
      });
    });
    for (const nickname of ['karim', 'laila']) {
      if ((offset + 14) % 7 >= 5) continue;
      schedules.push({ date: day(offset), userId: users[nickname]._id, departmentId: clinic._id, shiftId: clinicDay._id });
    }
  }
  const saved = await Schedule.insertMany(schedules);
  const upcoming = (nickname, n = 0) =>
    saved.filter((s) => s.userId.equals(users[nickname]._id) && s.date > day(0))[n];

  await SwapRequest.insertMany([
    {
      fromScheduleId: upcoming('sara', 1)._id,
      toScheduleId: upcoming('omar', 1)._id,
      fromUserId: users.sara._id,
      toUserId: users.omar._id,
      departmentId: emergency._id,
      message: 'Family event that evening. Could we swap?',
      status: 'pending',
    },
    {
      fromScheduleId: upcoming('youssef', 2)._id,
      toScheduleId: upcoming('sara', 3)._id,
      fromUserId: users.youssef._id,
      toUserId: users.sara._id,
      departmentId: emergency._id,
      message: 'Doctor appointment in the morning.',
      status: 'pending',
    },
    {
      fromScheduleId: upcoming('sara', 4)._id,
      toScheduleId: upcoming('nour', 4)._id,
      fromUserId: users.sara._id,
      toUserId: users.nour._id,
      departmentId: emergency._id,
      message: 'Swapping to cover the vaccination drive.',
      status: 'approved',
      approvalHistory: [
        { approvedBy: users.nour._id, role: 'user', status: 'approved' },
        { approvedBy: users.mona._id, role: 'manager', status: 'approved', message: 'Approved. Thanks for sorting it out.' },
      ],
    },
  ]);

  await Notification.insertMany([
    { user: users.sara._id, title: 'Swap request approved', message: 'Mona approved your swap with Nour.', type: 'Swap', priority: 'Medium' },
    { user: users.sara._id, title: 'New swap request', message: 'Youssef asked to swap a shift with you.', type: 'Swap', priority: 'High' },
    { user: users.sara._id, title: 'Schedule published', message: 'Your schedule for the next two weeks is ready.', type: 'Schedule', priority: 'Low', read: true },
    { user: users.mona._id, title: 'Swap awaiting approval', message: 'Sara and Omar agreed a swap that needs your approval.', type: 'Swap', priority: 'High' },
  ]);

  console.log(`Seeded ${people.length} users, ${shifts.length} shifts, ${saved.length} schedules, 3 swap requests.`);
  console.log(`Password for every account: ${PASSWORD}`);
  for (const [role, email] of Object.entries(DEMO_LOGINS)) console.log(`  ${role.padEnd(8)} ${email}`);
  await mongoose.disconnect();
}

seed().catch(async (err) => {
  console.error('Seeding failed:', err);
  await mongoose.disconnect();
  process.exit(1);
});
