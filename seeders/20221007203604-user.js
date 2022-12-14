const bcrypt = require('bcrypt');

// encrypt passwords
const encrypt = (password) => bcrypt.hashSync(password, 10);

// Admin Data
const admins = [
  {
    firstName: 'admin',
    lastName: '1',
    email: 'admin1@mail.com',
    password: encrypt('admin 1'),
    image: 'image 1',
    roleId: 1,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'admin',
    lastName: '2',
    email: 'admin2@mail.com',
    password: encrypt('admin 2'),
    image: 'image 2',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'admin',
    lastName: '3',
    email: 'admin3@mail.com',
    password: encrypt('admin 3'),
    image: 'image 3',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'admin',
    lastName: '4',
    email: 'admin4@mail.com',
    password: encrypt('admin 4'),
    image: 'image 4',
    roleId: 1,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'admin',
    lastName: '5',
    email: 'admin5@mail.com',
    password: encrypt('admin 5'),
    image: 'image 5',
    roleId: 1,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'admin',
    lastName: '6',
    email: 'admin6@mail.com',
    password: encrypt('admin 6'),
    image: 'image 6',
    roleId: 1,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'admin',
    lastName: '7',
    email: 'admin7@mail.com',
    password: encrypt('admin 7'),
    image: 'image 7',
    roleId: 1,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'admin',
    lastName: '8',
    email: 'admin8@mail.com',
    password: encrypt('admin 8'),
    image: 'image 8',
    roleId: 1,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'admin',
    lastName: '9',
    email: 'admin9@mail.com',
    password: encrypt('admin 9'),
    image: 'image 9',
    roleId: 1,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'admin',
    lastName: '10',
    email: 'admin10@mail.com',
    password: encrypt('admin 10'),
    image: 'image 10',
    roleId: 1,
    createdAt: new Date,
    updatedAt: new Date,
  },
];

// Standar Users Data
const standardUsers = [
  {
    firstName: 'standard',
    lastName: '1',
    email: 'standard1@mail.com',
    password: encrypt('standard 1'),
    image: 'image 1',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'standard',
    lastName: '2',
    email: 'standard2@mail.com',
    password: encrypt('standard 2'),
    image: 'image 2',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'standard',
    lastName: '3',
    email: 'standard3@mail.com',
    password: encrypt('standard 3'),
    image: 'image 3',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'standard',
    lastName: '4',
    email: 'standard4@mail.com',
    password: encrypt('standard 4'),
    image: 'image 4',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'standard',
    lastName: '5',
    email: 'standard5@mail.com',
    password: encrypt('standard 5'),
    image: 'image 5',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'standard',
    lastName: '6',
    email: 'standard6@mail.com',
    password: encrypt('standard 6'),
    image: 'image 6',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'standard',
    lastName: '7',
    email: 'standard7@mail.com',
    password: encrypt('standard 7'),
    image: 'image 7',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'standard',
    lastName: '8',
    email: 'standard8@mail.com',
    password: encrypt('standard 8'),
    image: 'image 8',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'standard',
    lastName: '9',
    email: 'standard9@mail.com',
    password: encrypt('standard 9'),
    image: 'image 9',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
  {
    firstName: 'standard',
    lastName: '10',
    email: 'standard10@mail.com',
    password: encrypt('standard 10'),
    image: 'image 10',
    roleId: 2,
    createdAt: new Date,
    updatedAt: new Date,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', admins, {});
    await queryInterface.bulkInsert('Users', standardUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
