const { Activities } = require('../models/index');

  const getActivities = async (req, res) => { };

  const getActivitiesById = async (req, res) => { };

  const createActivities = async (req, res) => { 
    try {
      const { name, content, image } = req.body;
      if (!(name && content)) { return res.status(404).send("Name y Content obligatorios") };
      const container = await Activities.findOne({ where: { name: name.toLowerCase() } });
      if (!container) {
      const createActivity = await Activities.create({
        name: name.toLowerCase(),
        content,
        image
      });
      createActivity ? res.send(createActivity) : res.status(404).send('Ocurrió un error durante la creación');
    } else {
      res.status(404).send('Ya existe una actividad con ese nombre, pruebe con otro');
    }
    } catch (error) {
      console.log(error);
    }
  };

  const updateActivities = async (req, res) => { };

  const partialUpdateActivities = async (req, res) => { };

  const deleteActivities = async (req, res) => { };

module.exports = {
  createActivities
};