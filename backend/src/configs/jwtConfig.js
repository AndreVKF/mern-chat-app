export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '4d',
  algorithm: 'HS256',
}
