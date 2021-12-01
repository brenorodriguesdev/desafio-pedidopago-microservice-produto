import { Validator } from "../../../validation/contracts/validator"
import { RequiredFieldValidator } from "../../../validation/validators/required-field"
import { ValidatorComposite } from "../../../validation/validators/validator-composite"


export const makeClonarProdutoValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
    const requiredFields = ['id']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidator(field))
    }
    return new ValidatorComposite(validations)
  }