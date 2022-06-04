import bcrypt from 'bcryptjs'

const password = bcrypt.hashSync('abc123456', 10)
const users = [
  {
    id: 1,
    name: 'Administrator',
    email: 'mr.tolhah@gmail.com',
    password: password,
    is_admin: 1,
  }
]

export default users
