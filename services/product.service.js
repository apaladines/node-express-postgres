//const { faker } = require('@faker-js/faker');
// const pool = require('./../libs/postgres.pool');
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');


class ProductsService {

  constructor() {
    //this.products = [];
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  // generate() {
  //   const limit = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.imageUrl(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    // const query = 'SELECT * FROM tasks';
    // const result = await this.pool.query(query); // with pool
    // return result.rows;
    //const [data] = await sequelize.query(query);
    // return data;

    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset, price, price_min, price_max } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (price) {
      options.where.price = price;
    }

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    // const product = this.products.find(item => item.id === id);
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const result = await product.update(changes);
    return result;
  }

  async delete(id) {
    const product = await this.findOne(id);
    const result = await product.destroy();
    return result;
  }

}

module.exports = ProductsService;
