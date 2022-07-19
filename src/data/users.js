import bcrypt from 'bcryptjs'

const password = bcrypt.hashSync('abc123456', 10)
const users = [
  {
    id: 1,
    name: 'Administrator',
    email: 'mr.tolhah@gmail.com',
    password: password,
    is_admin: 1,
  },
  // Manager
  {id: 2, name: 'Eri', email: 'eri@mailinator.com', password: password, is_admin: 0},
  // Team Leaders
  {id: 3, name: 'Sigit', email: 'sigit@mailinator.com', password: password, is_admin: 0},
  {id: 4, name: 'Grand', email: 'grand@mailinator.com', password: password, is_admin: 0},
  {id: 5, name: 'Stevanus', email: 'stevanus@mailinator.com', password: password, is_admin: 0},
  // Members
  {id: 6, name: 'Cris', email: 'cris@mailinator.com', password: password, is_admin: 0},
  {id: 7, name: 'Sita', email: 'sita@mailinator.com', password: password, is_admin: 0},
  {id: 8, name: 'Galih', email: 'galih@mailinator.com', password: password, is_admin: 0},
  {id: 9, name: 'Tolhah', email: 'tolhah@mailinator.com', password: password, is_admin: 0},
]

export default users
