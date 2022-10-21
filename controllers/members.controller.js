"use strict";
const { pagination } = require("../helpers/pagination");
const db = require("../models/index");

class MemberController {
  // Get all members
  // Method: GET
  static async findAll(req, res, next) {
    try {
      const members = await pagination(req, "Member");
      res.status(200).json(members);
    } catch (err) {
      next(err);
    }
  }

  // Get member by id
  // Method: GET
  static async findOne(req, res, next) {}

  // Create new member
  // Method: POST
  static async create(req, res, next) {
    try {
      const createMember = await db.Member.create(req.body);
      res.status(201).json({ data: createMember });
    } catch (error) {
      next(error);
    }
  }

  // Update all member data
  // Method: PUT
  static async updateMember(req, res, next) {
    const { id } = req.params;
    const data = req.body;

    try {
      const member = await db.Member.findByPk(id);
      if (!member) {
        res.status(404).json({ msg: "Miembro no existe" });
      }

      const update = await member.update(data);

      res
        .status(200)
        .json({ msg: "Miembro Actualizado con exito", data: update });
    } catch (error) {
      next(error);
    }
  }

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
