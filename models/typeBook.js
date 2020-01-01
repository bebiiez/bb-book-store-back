module.exports = (sequelize, DataTypes) => {
    const typeBook = sequelize.define('typeBook', {
        typeName: {
            type: DataTypes.STRING(200)
        }
    })

    typeBook.associate = (models) => {
        typeBook.hasMany(models.book, {foreignKey: 'typeId'})
    }
    return typeBook
}