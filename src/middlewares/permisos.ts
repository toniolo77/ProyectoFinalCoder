const admin = true;

export const middlewares = {

    isAdmin : function (req, res, next) {
        if (admin) return next();
        else 
        res.status(404).send({error: -1, descripcion: `ruta ${req.originalUrl} no autorizado`});
    }
};
// module.exports = middlewares;