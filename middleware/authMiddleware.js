const authMiddleware = (req, res, next) => {
  const idUSer = req.cookies.idUSer;

  if (!idUSer) {
    return res.status(403).json({ success: false, message: "Access denied." });
  }
  next();
};

export default authMiddleware;
