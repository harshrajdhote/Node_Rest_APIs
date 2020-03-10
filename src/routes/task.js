const express = require('express')
const Task =  require("../modal/task")
const router = new express.Router()

router.post("/tasks", async (req, res) => {
    console.log(req.body)
    const task = new Task(req.body)
    try {
        result = await task.save()
        if (result == undefined)
            res.status(404).send()
        res.status(201).send(result)
    } catch (e) {
        res.status(500).send()
    }
})
router.get('/tasks', async (req, res) => {

    try {
        result = await Task.find({})
        if (result == undefined)
            res.status(404).send()
        res.send(result) //async wait reduces the callbacks
        //await means nesting of promises should be not removed

    } catch (e) {
        res.status(500).send()
    }

})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        result = await Task.findById(_id)
        if (result == undefined)
            res.send(404).send()
        res.send(result) //async wait reduces the callbacks
        //await means nesting of promises should be not removed

    } catch (e) {
        res.status(500).send(result)
    }

})

router.patch("/tasks/:id", async (req, res) => {
    const update = Object.keys(req.body);
    const allowed = ['description', 'completed']
    const isValidOperation = update.every((up) => allowed.includes(up))
    if (!isValidOperation) {
        return res.status(400).send({
            error: "Invalid Operation"
        })
    }
    try {
        const task = await Task.findById(req.params.id)
        update.forEach((ele) => {
            task[ele] = req.body[ele]
        })
        task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })
        if (!task)
            return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router