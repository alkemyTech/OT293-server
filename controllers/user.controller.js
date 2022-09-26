"use strict";

const db = require('../models/index');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

class UserController {
    constructor() { }

    // Get all user
    // Method: GET
    static async getUsers(req, res) { }

    // Get User by id
    // Method: GET
    static async getUserById(req, res) { }

    // Create new User
    // Method: POST
    static async createUser(req, res) { }

    // Update all User data
    // Method: PUT
    static async updateUser(req, res) { }

    // Partially update User data
    // Method: PATCH
    static async partialUpdateUser(req, res) { 
        
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;

            const user = await db.User.findByPk(id);

            if(!user) {
                return res.status(404).json({message: 'Not found'});
            }

            // If request has password

            const { password } = req.body;

            if(password) { 
                req.body.password = await bcrypt.hash(password, 10);
            }

            const updatedUser = await user.update(req.body);

            res.json({data: updatedUser});
            
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }

    // Delete User from DB
    // Method: DELETE
    static async deleteUser(req, res, next) {

        try {
            const { id } = req.params;

            const deletedUser = await db.User.destroy({
                where: {
                    id
                }
            });

            res.json({ data: { id: deletedUser } });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;