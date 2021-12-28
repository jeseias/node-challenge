import { Validation } from "../../../helpers/validators/validation-protocols"

export const makeValidation = (): Validation => {
  class ValidationSpy implements Validation {
    validate (input: any): Error {
      return new Error('some_error')
    }
  }

  return new ValidationSpy()
}