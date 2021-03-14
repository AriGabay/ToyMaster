const dbService = require('../../services/db.service.js');
const ObjectId = require('mongodb').ObjectID;
const sort = {
  sortByPrice: { price: 1 },
  sortByABC: { name: 1 },
};

module.exports = {
  query,
  getById,
  remove,
  save,
};

async function query(query = {}) {
  try {
    const toysCollection = await dbService.getCollection('toys');
    const filterBy = {};
    const options = {};
    let skip = 0;
    const limit = 20;
    if (query) {
      const { name, inStock, price, sortBy, page } = query;
      if (name) {
        filterBy['name'] = { $regex: new RegExp(name, 'i') };
      }
      if (inStock) {
        filterBy['inStock'] = Boolean(inStock);
      }
      if (price) {
        filterBy['price'] = { $lte: +price };
      }
      if (sortBy) {
        options['sort'] = sort[sortBy];
      }
      if (!options.sort) {
        options['sort'] = sort.sortByABC;
      }
      skip = (page - 1) * 20;
      skip = skip > 0 ? skip : 0;
    }
    return await toysCollection.find(filterBy, options).skip(skip).limit(limit).toArray();
  } catch (err) {
    console.log('ERROR: cannot find toys');
    throw err;
  }
}
async function getById(toyId) {
  try {
    const collection = await dbService.getCollection('toys');
    const toy = await collection.findOne({ _id: ObjectId(toyId) });
    return toy;
  } catch (err) {
    console.log(`ERROR: cannot find toy ${toyId}`);
    throw err;
  }
}

async function remove(id) {
  try {
    const collection = await dbService.getCollection('toys');
    return await collection.deleteOne({ _id: ObjectId(id) });
  } catch (err) {
    console.log(`ERROR: cannot remove toy ${id}`);
    throw err;
  }
}

async function save(toy) {
  const toys = await dbService.getCollection('toys');
  try {
    if (toy._id) {
      const { _id, ...updatedToy } = toy;
      return await toys.updateOne({ _id: ObjectId(_id) }, { $set: updatedToy });
    } else {
      return await toys.insertOne(toy);
    }
  } catch (err) {
    console.log(`ERROR: cannot update toy ${toy._id}`);
    throw err;
  }
  return toy;
}
