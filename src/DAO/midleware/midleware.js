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

export const auth = (req, res, next) => {
  if (req.session?.user === 'pepe' && req.session?.admin) {
    return next();
  }
  return res.status(401).send('Error de autorización!');
};

 
export const upload =multer({storage:storage})