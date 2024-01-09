const express = require('express')
const {
    validActionId,
    validateAction
} = require('./actions-middlware')

const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            if (!actions || actions.length === 0) {
                res.status(200).json([])
            } else {
                res.status(200).json(actions)
            }
        })
        .catch(next)
})

router.get('/:id', validActionId, (req, res, next) => {
    res.status(200).json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    const { project_id, description, notes} = req.body
    Action.insert({
        project_id,
        description,
        notes,
    })
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    
})

router.delete('/:id', (req, res, next) => {

})

router.get('/:id/actions', (req, res, next) => {

})

 module.exports = router