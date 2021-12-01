import { Validator } from "../contracts/validator";

export class ValidatorComposite implements Validator {
  constructor (private readonly validations: Validator[]) {}

  validate (data: any): Error {
    for (const validator of this.validations) {
      const error = validator.validate(data)
      if (error) {
        return error
      }
    }
  }
}