export const corsMiddleware = (_, res, next) => {
  res.cors()
  next()
}
