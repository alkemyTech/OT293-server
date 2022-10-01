const db = require("../models/index");

class MemberController {
  constructor() {}

  // Get all members
  // Method: GET
  static async getMembers(req, res) {}

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
  static async updateMember(req, res) {}

  // Partially update member data
  // Method: PATCH
  static async partialUpdateMember(req, res) {}

  // Delete member from DB
  // Method: DELETE
  static async deleteMember(req, res) {}
}

module.exports = MemberController;
