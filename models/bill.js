module.exports = (sequelize, DataTypes) => {
    const bill = sequelize.define('bill', {
        billDate: {
            type: DataTypes.DATE
        }
    })

    bill.associate = (models) => {
        bill.hasMany(models.book_order, {foreignKey: 'billId'})
        bill.belongsTo(models.user, {foreignKey: 'userId'})
    }

    return bill
}