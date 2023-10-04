import multer from "multer";
import { EErrors } from "../../services/errors/Enums.js";
import { logger } from "../../logger.js";

export const logRequest = (req, res, next) => {
  logger.http(`Request recibida: ${new Date()}`);
  next();
};
export const msg = (req, res, next) => {
  logger.info("gracias por consultar");
  next();
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;
    
    if (file.fieldname === 'profileImage') {
      folder = 'profiles';
    } else if (file.fieldname === 'productImage') {
      folder = 'products';
    } else if (file.fieldname === 'identificacion') {
      folder = 'documents';
    }else if (file.fieldname === 'comp_domicilio') {
      folder = 'documents';
    }else if (file.fieldname === 'estado_cuenta') {
      folder = 'documents';
    }
    
    cb(null, `src/public/uploads/${folder}`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


export const authMiddleware = (req, res, next) => {
  if(req.session.user){
      next()
  }else{
      res.render('login', { status: 'failed'})
  }
}


export const adminRole = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado" });
  }
};


export const userRole = (req, res, next) => {
  if (req.session.user && req.session.user.role === "usuario") {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado" });
  }
};

export const premiumRole = (req, res, next) => {
  if (req.session.user && req.session.user.role === "premium") {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado" });
  }
};

export default (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
      case EErrors.INVALID_TYPES:
          res.send({ status: 'error', error: error.name })
          break;

      case EErrors.INVALID_PARAM:
          res.send({ status: 'error', error: error.name, cause: error.cause })
          break;
      
      default:
          res.send({ status: 'error', error: 'Unhandled error' })
  }
}

export const upload =multer({storage:storage})