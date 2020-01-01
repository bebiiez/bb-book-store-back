module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define('cart', {
        cartAmout: {
            type: DataTypes.INTEGER
        },
        cartTotalPrice: {
            type: DataTypes.DECIMAL(10, 2)
        }
    })

    cart.associate = (models) => {
        cart.belongsToMany(models.book, {through: 'cartBook'})
        cart.belongsTo(models.user, {foreignKet: 'userId'})
    }

    return cart
}