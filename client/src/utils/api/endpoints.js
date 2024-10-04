export const baseUrl = 'http://localhost:5000'
export const endpoints = {
  login: '/users/login',
  register: '/users/register',
  refresh: '/auth/refresh',
  verify: '/auth/verify',
  game: '/game',
  lobby: '/lobby',
  getAllUsers: '/users',
  getOneUser: '/users/:id',
  createUser: '/users',
  updateUser: '/users/:id',
  deleteUser: '/users/:id'
}
