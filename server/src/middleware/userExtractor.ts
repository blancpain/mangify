// const userFromToken = async (req, res, next) => {
//   const authorization = req.get('authorization')
//   if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
//     return res.status(401).json({ error: 'token missing' })
//   }

//   const session = await sessionFrom(authorization.substring(7))

//   if (!session) {
//     return res.status(401).json({ error: 'no valid session' })
//   }

//   if (session.user.disabled) {
//     return res.status(401).json({ error: 'account disabled' })
//   }

//   req.user = session.user

//   next()
// }

//! use something like above
