export const errorHandler = (err,req,res,next) => {
    console.log(err,res);
    res.status(500).json({
        error: -3,
        descripcion: "Se produjo un error al intentar realizar la operacion",
      });
} 