import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehicle,
  Brand,
} from '../models';
import {VehicleRepository} from '../repositories';

export class VehicleBrandController {
  constructor(
    @repository(VehicleRepository)
    public vehicleRepository: VehicleRepository,
  ) { }

  @get('/vehicles/{id}/brand', {
    responses: {
      '200': {
        description: 'Brand belonging to Vehicle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Brand)},
          },
        },
      },
    },
  })
  async getBrand(
    @param.path.number('id') id: typeof Vehicle.prototype.id,
  ): Promise<Brand> {
    return this.vehicleRepository.belongsToBrand(id);
  }
}
