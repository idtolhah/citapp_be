import jwt from 'jsonwebtoken'

const generateToken = (id, isAdmin, type) => {
  return jwt.sign(
    { id, isAdmin }, 
    type === 'token' ? process.env.JWT_SECRET : process.env.REFRESH_SECRET, 
    { 
      expiresIn: '1d', 
    }
  )
}

const verifyToken = (token, type) => {
  return jwt.verify(
    token, 
    type === 'token' ? process.env.JWT_SECRET : process.env.REFRESH_SECRET, 
  );
}

export { 
  generateToken,
  verifyToken,
}
