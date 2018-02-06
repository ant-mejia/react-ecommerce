const Product = require('./Product');
const Promo = require('./Promo');

Promo.belongsTo(Product, { foreignKey: { allowNull: false } });
module.exports = { Product, Promo };