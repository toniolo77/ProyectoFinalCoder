const admin = true;

export const middlewares = {
  isAdmin: function (req, res, next) {
    if (admin) return next();
    else
      res
        .status(404)
        .send({
          error: -1,
          descripcion: `ruta ${req.originalUrl} no autorizado`,
        });
  },

  isLogin: function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res
        .status(404)
        .send({
          error: -1,
          descripcion: `Usuario no logeado`,
        });
    }
  },
};
// module.exports = middlewares;
