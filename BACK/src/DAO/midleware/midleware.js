import multer from "multer";

export const logRequest = (req, res, next) => {
  console.log(`Request recibida: ${new Date()}`);
  next();
};
export const msg = (req, res, next) => {
  console.log("gracias por consultar");
  next();
};
const storage = multer.diskStorage({
  destination: 'src/public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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

export const upload =multer({storage:storage})