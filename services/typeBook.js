module.exports = (app, db) => {
    app.get("/types", (req, res) => {
        db.typeBook.findAll()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    })

    app.post('/addType', (req, res) => {
        db.typeBook.create({
            typeName: req.body.name,
        })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                console.error(err)
                res.status(400).json({ message: err.message })
            })
    })
}