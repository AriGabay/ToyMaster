const toyService = require('./toy.service');
const logger = require('../../services/logger.service');

async function getToy(req, res) {
  try {
    const toy = await toyService.getById(req.params.id);
    res.send(toy);
  } catch (err) {
    logger.error('Failed to get toy', err);
    res.status(500).send({ err: 'Failed to get toy' });
  }
}

async function getToys(req, res) {
  try {
    if (req.query) {
      toyService.query(req.query).then((toys) => {
        res.send(toys);
      });
    } else {
      toyService.query().then((toys) => {
        res.send(toys);
      });
    }
  } catch (err) {
    logger.error('ERROR: cannot find toys');
    res.status(500).send({ err: 'Failed to get toys' });
  }
}

async function deleteToy(req, res) {
  try {
    await toyService.remove(req.params.id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    logger.error(`ERROR: cannot remove toy ${req.params.id}`);
    res.status(500).send({ err: 'Failed to delete toy' });
  }
}

async function saveToy(req, res) {
  try {
    const toy = req.body;
    const savedToy = await toyService.save(toy);
    res.send(savedToy);
  } catch (err) {
    logger.error('Failed to save toy', err);
    res.status(500).send({ err: 'Failed to save toy' });
  }
}

module.exports = {
  getToy,
  getToys,
  deleteToy,
  saveToy,
};
