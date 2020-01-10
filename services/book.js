const passport = require('passport');

module.exports = (app, db) => {

    app.get('/get-book',
        (req, res) => {
            db.book.findOne({ where: { id: req.query.bookId } })
                .then(result => {
                    res.send(result)
                })
        })


    app.get("/books", async (req, res) => {
        await db.book.findAll()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    })


    app.post('/add-book',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            if (req.user.userRole === 'admin') {
                await db.book.create({
                    bookISBN: req.body.bookISBN,
                    bookName: req.body.bookName,
                    bookDes: req.body.bookDes,
                    bookPublisher: req.body.bookPublisher,
                    bookAuthor: req.body.bookAuthor,
                    bookAmount: req.body.bookAmount,
                    bookPrice: req.body.bookPrice,
                    bookPicture: req.body.bookPicture,
                    typeId: req.body.typeId
                })
                    .then(result => {
                        res.status(201).json(result)
                    })
                    .catch(err => {
                        console.error(err)
                        res.status(400).json({ message: err.message })
                    })
            } else {
                res.status(401).send({ message: 'Unauthorized' })
            }
        })

    app.put('/update-book/:id', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            if (req.user.userRole === 'admin') {
                let targetBook = await db.book.findOne({ where: { id: req.params.id } })
                if (!targetBook) {
                    res.status(400).send({ message: "Book is not found" })
                } else {
                    targetBook.update({
                        bookISBN: req.body.bookISBN,
                        bookName: req.body.bookName,
                        bookDes: req.body.bookDes,
                        bookPublisher: req.body.bookPublisher,
                        bookAuthor: req.body.bookAuthor,
                        bookAmount: req.body.bookAmount,
                        bookPrice: req.body.bookPrice,
                        bookPicture: req.body.bookPicture,
                        typeId: req.body.typeId
                    })
                    res.status(200).json({ message: "success" })
                }
            } else {
                res.status(401).send({ message: 'Unauthorized' })
            }
        }
    )

    app.delete('/delete-book/:id', passport.authenticate('jwt', { session: false }),
        async function (req, res) {
            if (req.user.userRole === 'admin') {
                let targetBook = await db.book.findOne({ where: { id: req.params.id } })
                if (!targetBook) {
                    res.status(400).send({ message: "Book is not found" })
                } else {
                    targetBook.destroy()
                    res.status(200).json({ message: "success" })
                }
            } else {
                res.status(401).send({ message: 'Unauthorized' })
            }
        })


    app.post("/upload-photo", async (req, res) => {
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: "No file uploaded"
                });
            } else {
                //Use the name of the input field (i.e. "photo") to retrieve the uploaded file
                let photo = req.files.photo;
                let photoName = new Date().getTime() + ".jpeg";
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                photo.mv("./uploads/" + photoName);
                //send response
                res.send({
                    status: true,
                    message: "File is uploaded",
                    data: {
                        name: photoName,
                        mimetype: photo.mimetype,
                        size: photo.size
                    }
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}