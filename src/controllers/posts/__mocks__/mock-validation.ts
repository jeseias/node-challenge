import { Validation } from "@/helpers/validators/validation-protocols"

export const makeValidation = (): Validation => {
  class ValidationSpy implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationSpy()
}