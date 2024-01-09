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
        completed: true 
    })
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch (next)

})

router.put('/:id', validateProject, validProjectId, (req, res, next) => {
    Project.update(req.params.id, {
        name: req.name,
        description: req.description,
        completed: true
    })
    .then(() => {
        Project.get(req.params.id)
    })
    .then(project => {
        res.json(...project)
    })
    .catch(next)
})

router.delete('/:id', validProjectId, (req, res, next) => {

})

router.get('/:id/actions', validProjectId, (req, res, next) => {

})

 module.exports = router