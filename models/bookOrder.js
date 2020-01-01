module.exports = (sequelize, DataTypes) => {
    const bookOrder = sequelize.define('bookOrder', {
        orderAmout: {
            type: DataTypes.INTEGER
        },
    })

    bookOrder.associate = (models) => {
        bookOrder.belongsTo(models.book, { foreignKey: 'bookId' })
        bookOrder.belongsTo(models.bill, { foreignKey: 'billId'})
    }

    return bookOrder
}