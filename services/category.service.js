// const boom = require('@hapi/boom');
// const pool = require('../libs/postgres.pool');
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CategoryService {

  constructor(){
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    // const query = 'SELECT * from tasks';
    // const result = await this.pool.query(query);
    // return result.rows;

    const result = await models.Category.findAll();
    return result;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const result = await category.update(changes);
    return result;
  }

  async delete(id) {
    const category = await this.findOne(id);
    const result = await category.destroy();
    return result;
  }

}

module.exports = CategoryService;
