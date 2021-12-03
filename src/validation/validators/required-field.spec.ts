import { MissingParamError } from '../../presentation/errors/missing-param-error'
import { RequiredFieldValidator } from './required-field'

interface SutTypes {
  sut: RequiredFieldValidator
}

const makeSut = (): SutTypes => {
  return { sut: new RequiredFieldValidator('field1') }
}

describe('Required Field Validator', () => {
  test('Garantir se o valor dos campo não for preenchido retornar MissingParamError', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      field1: ''
    })
    expect(error).toEqual(new MissingParamError('field1'))
  })

  test('Garantir se o valor do campo for preenchido válido retornar null', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      field1: 'a'
    })
    expect(error).toBeUndefined()
  })
})