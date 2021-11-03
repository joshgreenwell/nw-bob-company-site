import winston, { format } from 'winston'

const { combine, timestamp, json, label, printf } = format
const customFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}][${level}]: ${message}`
)

const createLogger = (service, level = 'info') => {
  const combinedFormat = combine(
    label({ label: service }),
    timestamp(),
    customFormat
  )
  const format = process.env.NODE_ENV === 'production' ? json() : combinedFormat

  return winston.createLogger({
    level,
    format,
    transports: [new winston.transports.Console()]
  })
}

export const _log = createLogger('Main')
