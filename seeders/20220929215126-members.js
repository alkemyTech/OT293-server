"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Members", [
      {
        name: "member #1",
        facebook_url: "facebook.com",
        instagram_url: "instagram.com",
        linkedin_url: "linkedin.com",
        image: "image1.com",
        description: "description",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "member #2",
        facebook_url: "facebook.com",
        instagram_url: "instagram.com",
        linkedin_url: "linkedin.com",
        image: "image2.com",
        description: "description",
        created_at: new Date,
        updated_at: new Date,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Members", null, {});
  },
};
