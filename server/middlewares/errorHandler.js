function errorHandler (error,req,res,next) {
    switch (error.name) {
        case 'SequelizeValidationError': //! need to add
        case 'SequelizeUniqueConstraintError': //! need to add
            res.status(400).json({message : error.errors[0].message})
            break;
        case 'JsonWebTokenError': //! need to add
            res.status(401).json({message : 'Invalid Token'})
            break
        case 'BadRequest':
            res.status(400).json({message : error.message})
            break;
        case 'NotFound':
            res.status(404).json({message : error.message})
            break;
        case 'Unauthorized':
            res.status(401).json({message : error.message})
            break;
        case 'Forbidden':
            res.status(403).json({message : error.message})
            break;
        
        default:
            res.status(500).json({message : 'Internal Server Error'})
            break;
    }
}

module.exports = errorHandler