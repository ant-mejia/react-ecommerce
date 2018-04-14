const Product = require('./Product');
const Promo = require('./Promo');
const Review = require('./Review');
const Collection = require('./Collection');

Review.belongsTo(Product)
Product.hasMany(Review, { as: 'productReviews' })
Product.belongsToMany(Collection, { through: 'productCollection' });
Collection.belongsToMany(Product, { through: 'productCollection' });
Promo.belongsToMany(Product, { through: 'productPromo' });
Product.belongsToMany(Promo, { through: 'productPromo' });

module.exports = { Product, Promo, Review, Collection };