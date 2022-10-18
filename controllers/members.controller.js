"use strict";
const db = require("../models/index");

class MemberController {
  // Get all members
  // Method: GET
  static async getMembers(req, res, next) {
    try {
      const { page = 0 } = req.query;
      const membersPerPage= 10;

      const options = {
        limit: membersPerPage,
        offset: (page + 1) * membersPerPage,
      }

      let previousPageUrl;
      let nextPageUrl;

      const {count, rows} = await db.Member.findAndCountAll(options);

      if(page > Math.ceil(count / membersPerPage)) {
        res.status(404).json({error: "Invalid page"});
      }

      const url = `${req.protocol}://${req.get('host')}${req.originalUrl}?page=`;
   
      page === 0 
      ? previousPageUrl = null
      : previousPageUrl = `${url}${page - 1}`;

      page === Math.ceil(count / membersPerPage)
      ? nextPageUrl = null
      : nextPageUrl += `${url}${page + 1}`;

      res.status(200).json({data: count, rows, previousPageUrl, nextPageUrl});
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
        res.status(400).json({message: 'Campos obligatorios'}) 
      } else {
        const createMember = await db.Member.create({ 
          name,
          facebookUrl, 
          instagramUrl, 
          linkedinUrl, 
          image, 
          description 
         })
        res.json({message: "Miembro creado correctamente"})
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
