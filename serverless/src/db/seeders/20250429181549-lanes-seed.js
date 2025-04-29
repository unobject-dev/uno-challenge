'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    const now = new Date();
    await queryInterface.bulkInsert('lanes', [
      { id: 1, name: 'Backlog',          position: 0, created_at: now, updated_at: now },
      { id: 2, name: 'To Do',            position: 1, created_at: now, updated_at: now },
      { id: 3, name: 'In Progress',      position: 2, created_at: now, updated_at: now },
      { id: 4, name: 'Done',             position: 3, created_at: now, updated_at: now },
      { id: 5, name: 'Ready to Archive', position: 4, created_at: now, updated_at: now },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('lanes', null, {});
  },
};