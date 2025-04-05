import jwt from 'jsonwebtoken';

function roleAuthMiddleware(roles) {
  return (req, res, next) => {
    try {
      const token = req.header('Authorization')?.split(' ')[1];
      if (!token) {
        return res.status(401).send({ message: 'token not provided' });
      }
      let data = jwt.verify(token, 'getToken');
      if (!data) {
        return res.send('token notogri');
      }
      if (roles.includes(data.role)) {
        req.userId = data.id;
        req.userRole = data.role;
        req.user = data;
        next();
      } else {
        return res.status(402).send({ message: 'not allowed' });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export { roleAuthMiddleware };
