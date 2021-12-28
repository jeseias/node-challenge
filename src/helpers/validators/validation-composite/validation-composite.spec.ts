import { MissingParamError } from '../../errors'
import { Validation } from '../validation-protocols'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationSpy implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationSpy()
}

interface SutTypes {
  sut: Validation
  validationSpys: Validation[]
}

const makeSut = (): SutTypes => {
  const validationSpys = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationSpys)
  return {
    sut,
    validationSpys
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any Validation fails', () => {
    const { sut, validationSpys } = makeSut()
    jest.spyOn(validationSpys[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return an error if any Validation fails', () => {
    const { sut, validationSpys } = makeSut()
    jest.spyOn(validationSpys[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationSpys[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
