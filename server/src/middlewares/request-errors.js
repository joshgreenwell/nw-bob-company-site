import { _log } from '../logger'

export const ALREADY_EXISTS_ERROR = 'AlreadyExistsError'
export const BAD_REQUEST_ERROR = 'BadRequestError'
export const AUTHORIZATION_ERROR = 'AuthorizationError'
export const FORBIDDEN_ERROR = 'ForbiddenError'
export const SERVER_ERROR = 'ServerError'

export const throwAlreadyExistsError = (message = 'Object already exists') => {
  throw {
    name: ALREADY_EXISTS_ERROR,
    message
  }
}

export const throwBadRequestError = (message = 'Bad request input data') => {
  throw {
    name: BAD_REQUEST_ERROR,
    message
  }
}

export const throwAuthorizationError = (message = 'Not Authorized') => {
  throw {
    name: AUTHORIZATION_ERROR,
    message
  }
}

export const throwForbiddenError = (message = 'Forbidden') => {
  throw {
    name: FORBIDDEN_ERROR,
    message
  }
}

export const apiErrorHandler = (err, _, res, next) => {
  _log.error('[ERROR]', err)
  if (err.name === ALREADY_EXISTS_ERROR) {
    res.error(409, err)
  } else if (err.name === BAD_REQUEST_ERROR) {
    res.error(400, err)
  } else if (err.name === AUTHORIZATION_ERROR) {
    res.error(401, err)
  } else if (err.name === FORBIDDEN_ERROR) {
    res.error(403, err)
  } else if (err && typeof err === 'string') {
    res.error(500, { name: SERVER_ERROR, message: err })
  }
  res.cors()
  next()
}
