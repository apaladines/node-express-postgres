// const pool = require('../libs/postgres.pool');
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  async find() {
    // const query = 'SELECT * from tasks';
    // const result = await this.pool.query(query);
    // return result.rows;

    const result = await models.Order.findAll();
    return result;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    const order = await this.findOne(id);
    const result = await order.destroy();
    return result;
  }

}

module.exports = OrderService;
