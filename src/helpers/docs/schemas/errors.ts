import { buildErrorResponse } from '../builders/build-errors'

export const badRequest = buildErrorResponse('MissingParamError: title')
export const serverError = buildErrorResponse('Something very wrong happened. Try again later.')
