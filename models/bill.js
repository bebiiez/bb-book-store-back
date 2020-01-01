module.exports = (sequelize, DataTypes) => {
    const bill = sequelize.define('bill', {
        billDate: {
            type: DataTypes.DATE
        }
    })

    bill.associate = (models) => {
        bill.hasMany(models.bookOrder, {foreiegnKey: 'billId'})
        bill.belongsTo(models.user, {foreiegnKey: 'userId'})
    }

    return bill
}