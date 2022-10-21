'use strict';
const { pagination } = require('../helpers/pagination');
const db = require('../models/index');
const { uploadfile, getSignUrl } = require('../utils/s3');

class MemberController {
  // Get all members
  // Method: GET
  static async findAll(req, res, next) {
    try {
      const members = await pagination(req, 'Member');
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
      const { body } = req;
      const { file } = req.files;

      // Upload image to AWS S3 and get singUrl
      uploadfile(file);

      const createMember = await db.Member.create({
        ...body,
        image: file.name,
      });

      // Get image url form AWS
      const imageUrl = await getSignUrl(file.name);

      res
        .status(201)
        .json({ data: { ...createMember.dataValues, image: imageUrl } });
    } catch (error) {
      next(error);
    }
  }

  // Update all member data
  // Method: PUT
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      
      if (req.files) {
        // Upload image to AWS S3 and get singUrl
        const { file } = req.files;
        uploadfile(file);
        body.image = file.name;
      }

      const member = await db.Member.findByPk(id);
      if (!member) {
        return res.status(404).json({ message: 'Not found' });
      }

      const update = await member.update(body);

      // Get image url form AWS
      const imageUrl = await getSignUrl(update.dataValues.image);

      res.status(200).json({ data: { ...update.dataValues, image: imageUrl } });
    } catch (error) {
      next(error);
    }
  }

  // Delete member from DB
  // Method: DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const member = await db.Member.findByPk(id);
      if (!member) {
        return res.status(404).json({ message: 'Not found' });
      }

      await member.destroy();
      res.json({ data: { id: Number.parseInt(id) } });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MemberController;
