module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define('cart', {
        cartAmount: {
            type: DataTypes.INTEGER
        },
        cartTotalPrice: {
            type: DataTypes.DECIMAL(10, 2)
        }
    })

    cart.associate = (models) => {
        cart.belongsToMany(models.book, {through: models.cart_book})
        cart.belongsTo(models.user, {foreignKet: 'userId'})
    }

    return cart
}