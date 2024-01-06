// add middlewares here related to projects
const Project = require('./projects-model');

function logger (req, res, next) {
    const timestamp = new Date().localeString()
    const method = req.method
    const url = req.originalUrl

    console.log(`${timestamp} ${method} to ${url}`)

    next()
}

async function validProjectId(req, res, next) {
    try {
        const project = await Project.getById(req.params.id)

        if (!project) {
            next({ message: 'no user found' })
        }

    } catch (err) {
        res.status(500).json({
            message: 'no user found'
        })

    }
}

module.exports = {
    validProjectId,
    logger,
}