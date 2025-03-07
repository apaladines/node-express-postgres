const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    let newCustomer;
    if (data.userId) {
      newCustomer = await models.Customer.create(data);
    } else {
      if (data.user) {
        newCustomer = await models.Customer.create(data, {
          include: ['user']
        });
      }
    }
    return newCustomer;
  }

  async find() {
    // const query = 'SELECT * FROM tasks';
    // const result = await this.pool.query(query);
    // return result.rows;
    const result = await models.Customer.findAll({
      include: ['user']
    });
    return result;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['user']
    });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const result = await customer.update(changes);
    return result;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    const result = await customer.destroy();
    return result;
  }
}

module.exports = CustomerService;
