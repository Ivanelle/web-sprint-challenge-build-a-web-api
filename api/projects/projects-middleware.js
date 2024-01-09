// add middlewares here related to projects
const Project = require('./projects-model');

async function validProjectId (req, res, next) {
    try {
        console.log('Inside validprojectID middleware')
        const project = await Project.get(req.params.id);
        
        if (!project) {
            console.log('No project found');
           res.status(404).json({
                message: 'no project found'
            })
        } else {
            console.log('project found', project);
            req.project = project
            next()
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

function validateProject (req, res, next) {
    const { name, description, completed } = req.body

    if (!name || !name.trim() || 
    !description || !description.trim() || completed === undefined ) {
        res.status(400).json({
            message: 'name, description, and completed are required'
        })
    } else {

        req.name = name.trim()
        req.description = description.trim()
    
        next()
    }
}



module.exports = {
    validProjectId,
    validateProject
}