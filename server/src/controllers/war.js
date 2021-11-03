import lambdaAPI from 'lambda-api'
import { DynamoDB } from 'aws-sdk'
import { v4 as uuid } from 'uuid'

import { corsMiddleware, apiErrorHandler } from '../middlewares'
import { _log } from '../logger'

const dynamoDb = new DynamoDB.DocumentClient()

const suffix = process.env.STAGE ?? 'dev'

const WAR_DETAILS_TABLE_NAME = `war-details-${suffix}`

const api = lambdaAPI({ version: 'v1.0', base: 'v1/war' })

api.use(corsMiddleware, apiErrorHandler)

api.post('/check-in', async (req, res) => {
  const { id, checkIn } = req.body
  const timestamp = Date.now()

  _log.info(id, checkIn, timestamp)

  const { Item } = await dynamoDb
    .get({
      TableName: WAR_DETAILS_TABLE_NAME,
      Key: { id }
    })
    .promise()

  _log.info(Item)

  await dynamoDb
    .update({
      TableName: WAR_DETAILS_TABLE_NAME,
      Key: { id },
      ExpressionAttributeValues: {
        ':c': [...Item.checkedin, { ...checkIn, timestamp }]
      },
      UpdateExpression: 'SET checkedin = :c'
    })
    .promise()

  _log.info('Done checking in')
  res.json({ ...checkIn, timestamp })
})

api.get('/details', async (req, res) => {
  const warDetails = await dynamoDb
    .scan({ TableName: WAR_DETAILS_TABLE_NAME })
    .promise()

  _log.info(`Got ${warDetails.Items?.length} wars`)
  res.json(warDetails.Items ?? [])
})

api.post('/details', async (req, res) => {
  const { type, groups, auxs, where, when, checkedin } = req.body

  _log.info(type, groups, auxs, where, when, checkedin)

  await dynamoDb
    .put({
      TableName: WAR_DETAILS_TABLE_NAME,
      Item: {
        id: uuid(),
        type,
        groups,
        auxs,
        where,
        when,
        checkedin,
        code: (Math.random() + 1).toString(36).substring(7)
      }
    })
    .promise()

  _log.info('Done adding war')

  const warDetails = await dynamoDb
    .scan({ TableName: WAR_DETAILS_TABLE_NAME })
    .promise()

  _log.info('Returning all wars')
  res.json(warDetails.Items ?? [])
})

api.options('/*', (_, res) => {
  res.status(200).json({})
})

export const warV1 = async (event, context) => {
  return await api.run(event, context)
}
