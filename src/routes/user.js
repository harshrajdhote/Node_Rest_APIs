const express = require('express')
const User = require('../modal/user')
const router = new express.Router()

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({
            error: "Invalid Operation"
        })

    } //allowed updates are return such becoz if none of the keys are provided 
    //then update operation just ignored and old object is returned
    try {
        
        const user = await User.findById(req.params.id)
        
        updates.forEach((element) => {user[element] = req.body[element]})  
        
        console.log(user)
        user.save()//this done because findandupdate bypasses mongoose save
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })
        if (!user) //this is just ignored 
            return res.status(404).send()
        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users', async (req, res) => {
    console.log(req.body)
    try {
        const user = new User(req.body)
        user.save()
        if (user == undefined)
            res.status(500).send()
        res.status(200).send("added")
        // res.send('before')
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/users/login', async (req, res) => {
    console.log("inside login")
    try {
        console.log("inside login")
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)

    } catch (e) {
        res.status(404).send(e)
    }
})
router.get("/users", async (req, res) => {
    User.find({}).then((user) => {
        res.send(user)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

router.get("/user/:_id", async (req, res) => { //"/user/:id/:name"
    const _id = req.params._id
    User.findById(_id).then((user) => {
        if (!user) {
            res.status(404).send("Record not found")
        }
        res.send(user)
    }).catch((err) => {
        res.status(500).send()
    })
})
module.exports = router