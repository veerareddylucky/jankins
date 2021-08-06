import { IPetType, ISelectOption } from '../../types/index';
import { url, submitForm } from '../../util/index';
import { request, request_promise, xhr_request_promise } from '../../util/index';
const toSelectOptions = (pettypes: IPetType[]): ISelectOption[] => pettypes.map(pettype => ({ value: pettype.id, name: pettype.name }));
import { APMService } from '../../main';

export default (ownerId: string, petLoaderPromise: Promise<any>): Promise<any> => {
  return Promise.all(
    [
      xhr_request_promise('api/pettypes').then(toSelectOptions),
      xhr_request_promise('api/owners/' + ownerId),
      petLoaderPromise,
    ]
  ).then(results => {
    return {
      pettypes: results[0],
      owner: results[1],
      pet: results[2]
    };
  });
};
