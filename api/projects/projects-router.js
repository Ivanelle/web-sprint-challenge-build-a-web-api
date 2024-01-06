 const express = require('express')

const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            console.log(projects)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    
})

router.post('/', (req, res, next) => {
    
})

router.put('/:id', (req, res, next) => {
    
})

router.delete('/:id', (req, res, next) => {

})

router.get('/:id/actions', (req, res, next) => {

})

 module.exports = router