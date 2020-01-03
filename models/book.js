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
        bookAmount: {
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
        book.belongsTo(models.type_book, { foreignKey: 'typeId' })
        book.belongsToMany(models.cart, { through: models.cart_book })
        book.hasMany(models.book_order, { foreignKey: 'bookId' })
    }

    return book
}