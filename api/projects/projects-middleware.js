// add middlewares here related to projects
const Project = require('./projects-model');

async function validProjectId (req, res, next) {
    try {
        const project = await Project.getById(req.params.id)

        if (!project) {
            res.status(404).json({
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



module.exports = {
    validProjectId,
}