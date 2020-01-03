module.exports = (sequelize, DataTypes) => {
    const cart_book = sequelize.define('cart_book', {
        amount: {
            type: DataTypes.INTEGER
        },
    })

    return cart_book
}