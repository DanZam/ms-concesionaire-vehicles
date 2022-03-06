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
  Supplier,
} from '../models';
import {VehicleRepository} from '../repositories';

export class VehicleSupplierController {
  constructor(
    @repository(VehicleRepository)
    public vehicleRepository: VehicleRepository,
  ) { }

  @get('/vehicles/{id}/supplier', {
    responses: {
      '200': {
        description: 'Supplier belonging to Vehicle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Supplier)},
          },
        },
      },
    },
  })
  async getSupplier(
    @param.path.number('id') id: typeof Vehicle.prototype.id,
  ): Promise<Supplier> {
    return this.vehicleRepository.supplier(id);
  }
}
