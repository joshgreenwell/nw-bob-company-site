import lambdaAPI from 'lambda-api'
import axios from 'axios'

import { corsMiddleware, apiErrorHandler } from '../middlewares'
import { _log } from '../logger'

const api = lambdaAPI({ version: 'v1.0', base: 'v1/world' })

api.use(corsMiddleware, apiErrorHandler)

api.get('/status', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://firstlight.aeternum.sbs/ext/v1/worlds/samavasarana',
      {
        headers: {
          Authorization: `Bearer ${process.env.STATUS_TOKEN}`
        }
      }
    )
    res.json(data.message)
  } catch (error) {
    _log.error(error?.response?.status)
    res.json({})
  }
})

api.get('/dev', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://newworldfans.com/api/v1/dev_tracker?page=1&source=forum&language=en'
    )
    res.json(data)
  } catch (error) {
    _log.error(error?.response?.status)
    _log.error(error?.response?.data)
    res.json({ data: error?.response?.status })
  }
})

api.options('/*', (_, res) => {
  res.status(200).json({})
})

export const worldV1 = async (event, context) => {
  return await api.run(event, context)
}
