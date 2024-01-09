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

router.put('/:id', validActionId, validateAction, (req, res, next) => {
    const { project_id, description, notes, completed} = req.body
    Action.update(req.params.id, {
        project_id,
        description,
        notes,
        completed: completed || false
    })
    .then(updatedAction => {
        res.status(200).json(updatedAction)
    })
    .catch(error => {
        next(error)
    })
})

router.delete('/:id', validActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.json(req.action)
    }
    catch (error) {
        next(error)
    }
})


 module.exports = router