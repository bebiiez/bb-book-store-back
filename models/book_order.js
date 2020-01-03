module.exports = (sequelize, DataTypes) => {
    const book_order = sequelize.define('book_order', {
        orderAmount: {
            type: DataTypes.INTEGER
        },
    })

    book_order.associate = (models) => {
        book_order.belongsTo(models.book, { foreignKey: 'bookId' })
        book_order.belongsTo(models.bill, { foreignKey: 'billId'})
    }

    return book_order
}