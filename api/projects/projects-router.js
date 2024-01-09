 const express = require('express')
const { 
    validProjectId, 
    validateProject 
} = require('./projects-middleware')
const Project = require('./projects-model')

const router = express.Router()

router.get('/', async (req, res, next) => {
   try {
    const projects = await Project.get();

    if (!projects || projects.length === 0) {
        return res.status(200).json([])
    } else {
        res.status(200).json(projects)
    }
   }
   catch (error) {
        res.status(500).json({
            message: error.message
        })
        next()
   }

  
})

router.get('/:id', validProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert({ 
        name: req.name,
        description: req.description,
        completed: true || false
    })
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch (next)

})

router.put('/:id', validateProject, validProjectId, (req, res, next) => {
    const { name, description, completed} = req.body
    Project.update(req.params.id, {
        name,
        description,
        completed: completed || false
    })
    .then(updatedProject => {
        res.status(200).json(updatedProject)
    })
    .catch(error => {
        next(error)
    })
})

router.delete('/:id', validProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            if (!actions) {
                res.status(200).json([])
            } else {
                res.status(200).json(actions)
            }
        })
        .catch(next)
})  

 module.exports = router