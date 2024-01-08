 const express = require('express')
const { validProjectId } = require('./projects-middleware')
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

router.get('/:id', validProjectId, (req, res, next) => {
    console.log(validProjectId)
})

router.post('/', (req, res, next) => {
    
})

router.put('/:id', validProjectId, (req, res, next) => {
    
})

router.delete('/:id', validProjectId, (req, res, next) => {

})

router.get('/:id/actions', validProjectId, (req, res, next) => {

})

 module.exports = router