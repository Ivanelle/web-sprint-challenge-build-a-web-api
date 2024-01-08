// add middlewares here related to projects
const Project = require('./projects-model');

async function validProjectId (req, res, next) {
    try {
        const project = await Project.getById(req.params.id)

        if (!project) {
            return res.status(404).json({
                message: 'no project found'
            })
        } else {
            req.project = project
            next()
        }

    } catch (err) {
        res.status(500).json({
            message: 'problem finding project'
        })
    }
}

function validateProject (req, res, next) {
    const { name, description } = req.body

    if (!name || !name.trim() || 
    !description || !description.trim()) {
        res.status(400).json({
            message: 'name and description are required'
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