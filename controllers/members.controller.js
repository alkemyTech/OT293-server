"use strict";
const db = require("../models/index");

class MemberController {
  constructor() {}

  // Get all members
  // Method: GET
  static async getMembers(req, res, next) {
    try {
      const members = await db.db.Member.findAll();
      res.status(200).json({data: members})
    } catch (err) {
      next(err)
    }
    
  }

  // Get member by id
  // Method: GET
  static async getMemberById(req, res) {}

  // Create new member
  // Method: POST
  static async createMember(req, res) {}

  // Update all member data
  // Method: PUT
  static async updateMember(req, res) {}

  // Partially update member data
  // Method: PATCH
  static async partialUpdateMember(req, res) {}

  // Delete member from DB
  // Method: DELETE
  static async deleteMember(req, res, next) {
    try {
      const { id } = req.params;

      const member = await db.Member.findByPk(id);
      if (!member) {
        res.status(404).json({ error: "member Not Found" });
      }

      await member.destroy();
      res.json({ deleted: true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MemberController;
