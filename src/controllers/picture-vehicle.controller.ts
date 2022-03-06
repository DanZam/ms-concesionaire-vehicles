import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Picture,
  Vehicle,
} from '../models';
import {PictureRepository} from '../repositories';

export class PictureVehicleController {
  constructor(
    @repository(PictureRepository)
    public pictureRepository: PictureRepository,
  ) { }

  @get('/pictures/{id}/vehicle', {
    responses: {
      '200': {
        description: 'Vehicle belonging to Picture',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehicle)},
          },
        },
      },
    },
  })
  async getVehicle(
    @param.path.number('id') id: typeof Picture.prototype.id,
  ): Promise<Vehicle> {
    return this.pictureRepository.vehicle(id);
  }
}
