const passport = require('passport');

module.exports = (app, db) => {
    app.get("/types", async (req, res) => {
        await db.type_book.findAll()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    })


    app.post('/add-type', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            if (req.user.userRole === 'admin') {
                await db.type_book.create({
                    typeName: req.body.typeName,
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

    app.put('/update-type/:id', passport.authenticate('jwt', { session: false }),
        async (req, res) => {
            if (req.user.userRole === 'admin') {
                let targetType = await db.type_book.findOne({ where: { id: req.params.id } })
                if (!targetType) {
                    res.status(400).send({ message: "type is not found" })
                } else {
                    targetType.update({
                        typeName: req.body.typeName,
                    })
                    res.status(200).json({ message: "success" })
                }
            } else {
                res.status(401).send({ message: 'Unauthorized' })
            }
        }
    )

    app.delete('/delete-type/:id', passport.authenticate('jwt', { session: false }),
        async function (req, res) {
            if (req.user.userRole === 'admin') {
                let targetType = await db.type_book.findOne({ where: { id: req.params.id } })
                if (!targetType) {
                    res.status(400).send({ message: "type is not found" })
                } else {
                    targetType.destroy()
                    res.status(200).json({ message: "success" })
                }
            } else {
                res.status(401).send({ message: 'Unauthorized' })
            }
        })
}