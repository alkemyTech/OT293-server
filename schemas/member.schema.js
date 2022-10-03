/**
 * These schemas are used to validate data with express-validator,
 * The schemas are passed to the function checkSchema()
 */

const deleteMemberSchema = {
  id: {
    in: "params",
    isInt: true,
    errorMessage: "ID is wrong",
  },
};

module.exports = { deleteMemberSchema };
