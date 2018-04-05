const paymentSource = require('./paymentSource');
const order = require('./order');
const orderItems = require('./orderItems');

orderItems.belongsTo(order, { foreignKey: { allowNull: false } });

module.exports = { paymentSource, order, orderItems };