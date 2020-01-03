module.exports = (sequelize, DataTypes) => {
    const type_book = sequelize.define('type_book', {
        typeName: {
            type: DataTypes.STRING(200)
        }
    })

    type_book.associate = (models) => {
        type_book.hasMany(models.book, {foreignKey: 'typeId'})
    }
    return type_book
}