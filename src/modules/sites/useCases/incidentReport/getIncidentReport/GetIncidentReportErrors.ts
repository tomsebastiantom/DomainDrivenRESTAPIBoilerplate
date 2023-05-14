import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';



export namespace GetIncidentReportErrors {
  export class AddressNotValidError extends Result<UseCaseError> {
    constructor(address: string) {
      super(false, {
        message: ` ${address} is not a valid address`
      } as UseCaseError);
    }
  }
}
