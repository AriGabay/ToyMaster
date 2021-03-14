const fs = require('fs');
const { toUnicode } = require('punycode');
const gToys = require('../data/toys.json');
const sort = {
  sortByPrice: (a, b) => a.price - b.price,
  sortByABC: (a, b) => a.name.localeCompare(b.name),
};

function query() {
  return Promise.resolve(gToys);
}

function search(searchFilter) {
  if (searchFilter) {
    const { name, inStock, price, sortBy } = searchFilter;
    let filteredToys = gToys;
    if (name) {
      filteredToys = filteredToys.filter((toy) => toy.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (inStock) {
      filteredToys = filteredToys.filter((toy) => Boolean(toy.inStock) === Boolean(inStock));
    }
    if (price) {
      filteredToys = filteredToys.filter((toy) => +toy.price <= +price);
    }
    if (sortBy) {
      filteredToys = filteredToys.sort(sort[sortBy]);
    }
    return Promise.resolve(filteredToys);
  }
  return query();
}

function getById(id) {
  const toy = gToys.find((toy) => toy._id === id);
  return Promise.resolve(toy);
}
function remove(id) {
  const idx = gToys.findIndex((toy) => {
    return toy._id === id;
  });
  if (idx === -1) return;
  gToys.splice(idx, 1);
  return _saveToysToFile();
}

function save(toy) {
  onsole.log('toy:', toy);
  if (toy._id) {
    const idx = gToys.findIndex((t) => t._id === toy._id);
    gToys.splice(idx, 1, toy);
    return _saveToysToFile();
  } else {
    const id = _makeId();
    toy._id = id;
    gToys.unshift(toy);
    return _saveToysToFile();
  }
}

module.exports = {
  query,
  remove,
  save,
  getById,
  search,
};

function _saveToysToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile('./data/toys.json', JSON.stringify(gToys), (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

function _makeId(length = 4) {
  var txt = '';
  var possible = '123456789';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return +txt;
}
