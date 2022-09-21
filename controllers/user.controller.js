"use strict";

const db = require('../models/index');

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
    static async partialUpdateUser(req, res) { }

    // Delete User from DB
    // Method: DELETE
    static async deleteUser(req, res) {

        const { id } = req.params;

        const deletedUser = await db.User.destroy({
            where: {
                id
            }
        });

        res.json({data: {id: deletedUser}});
    }
}

module.exports = UserController;