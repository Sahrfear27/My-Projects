declare namespace Express {
  interface Request {
    tokenData: jwtcontent;
    file?: Express.Multer.File;
  }
}
