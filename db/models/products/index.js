const Product = require('./Product');
const Promo = require('./Promo');
const Review = require('./Review');

Promo.belongsTo(Product, { foreignKey: { allowNull: false } });
Review.belongsTo(Product, { foreignKey: { allowNull: false } });

module.exports = { Product, Promo, Review };