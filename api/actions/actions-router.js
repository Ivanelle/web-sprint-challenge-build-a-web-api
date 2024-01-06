const express = require('express')

const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            console.log(actions)
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