// add middlewares here related to actions
const Action = require('./actions-model');

async function validActionId (req, res, next) {
    try {
        console.log('Inside validprojectID middleware')
        const action = await Action.get(req.params.id);
        
        if (!action) {
           res.status(404).json({
                message: 'no action found'
            })
        } else {
            console.log('action found', action);
            req.action = action
            next()
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

function validateAction (req, res, next) {
    const { project_id, description, notes } = req.body

    if (!project_id || !description || !notes ) {
        res.status(400).json({
            message: 'project id, description, and/or notes are required'
        })
    } else {
    
        next()
    }
}

module.exports = {
    validActionId,
    validateAction
}