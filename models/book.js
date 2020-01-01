module.exports = (sequelize, DataTypes) => {
    const book = sequelize.define('book', {
        bookISBN: {
            type: DataTypes.STRING(30)
        },
        bookName: {
            type: DataTypes.STRING(200)
        },
        bookDes: {
            type: DataTypes.STRING(500)
        },
        bookPublisher: {
            type: DataTypes.STRING(200)
        },
        bookAuthor: {
            type: DataTypes.STRING(200)
        },
        bookAmout: {
            type: DataTypes.INTEGER
        },
        bookPrice: {
            type: DataTypes.DECIMAL(10, 2)
        },
        bookPicture: {
            type: DataTypes.STRING(500)
        }
    })

    book.associate = (models) => {
        book.belongsTo(models.typeBook, { foreignKey: 'typeId' })
        book.belongsToMany(models.cart, { through: 'cartBook' })
        book.hasMany(models.bookOrder, { foreignKey: 'bookId' })
    }

    return book
}