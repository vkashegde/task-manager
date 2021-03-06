const express = require('express')
const Task = require('../models/task')
const router = new express.Router()



//Handle Tasks
router.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    task.save().then(()=>{
        res.send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

router.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

router.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id;
    Task.findById(_id).then((task)=>{
        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })  
})

router.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body) //Converting from object to array of properties
    const allowedupdates = ['description','completed']
    const isValidOperation = updates.every((update)=>{
       return allowedupdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates'})
    }

    
    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update]=req.body[update ]
            
        })
        await task.save();
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task) 
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id',async(req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router