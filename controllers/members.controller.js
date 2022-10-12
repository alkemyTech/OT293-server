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
  static async createMember(req, res) {
    try {
      const { name, facebookUrl, instagramUrl, linkedinUrl, image, description } = req.body;
      if (!(name && image)) { 
        res.status(404).send('Campos obligatorios') 
      } else {
        const createMember = await db.Member.create({ 
          name,
          facebookUrl, 
          instagramUrl, 
          linkedinUrl, 
          image, 
          description 
         })
        res.send("Miembro creado correctamente")
      }
    } catch (error) {
      console.log(error) 
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
        res.status(404).json({msg: 'Miembro no existe'})
      }

      const update = await member.update(data);

      res.status(200).json({msg: 'Miembro Actualizado con exito', data: update});

    } catch (error) {
      next(error)
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
