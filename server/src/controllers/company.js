import lambdaAPI from 'lambda-api'
import { DynamoDB } from 'aws-sdk'

import { corsMiddleware, apiErrorHandler } from '../middlewares'
import { _log } from '../logger'

const dynamoDb = new DynamoDB.DocumentClient()

const suffix = process.env.STAGE ?? 'dev'

const PROFILES_TABLE_NAME = `profiles-${suffix}`

const api = lambdaAPI({ version: 'v1.0', base: 'v1/company' })

api.use(corsMiddleware, apiErrorHandler)

api.get('/profiles', async (req, res) => {
  const profiles = await dynamoDb
    .scan({ TableName: PROFILES_TABLE_NAME })
    .promise()

  _log.info(`Got ${profiles.Items?.length} profiles`)
  res.json(profiles.Items ?? [])
})

api.get('/:sub', async (req, res) => {
  const { sub } = req.params

  _log.info(sub)

  const profile = await dynamoDb
    .get({
      TableName: PROFILES_TABLE_NAME,
      Key: {
        sub
      }
    })
    .promise()

  _log.info('Returning the profile')
  res.json(profile.Item)
})

api.post('/:sub', async (req, res) => {
  const { sub } = req.params
  const {
    ign,
    weapons,
    lf,
    skills,
    level,
    gs,
    company,
    rank,
    armor,
    verified
  } = req.body

  _log.info(sub, ign)

  await dynamoDb
    .put({
      TableName: PROFILES_TABLE_NAME,
      Item: {
        sub,
        ign,
        rank,
        company,
        weapons,
        lf,
        skills,
        level,
        gs,
        armor,
        verified
      }
    })
    .promise()

  _log.info('Returning the new profile')
  res.json({
    ign,
    weapons,
    lf,
    skills,
    level,
    gs,
    company,
    rank,
    armor,
    verified
  })
})

api.options('/*', (_, res) => {
  res.status(200).json({})
})

export const companyV1 = async (event, context) => {
  return await api.run(event, context)
}
