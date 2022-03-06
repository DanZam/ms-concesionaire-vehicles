import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Brand,
  Vehicle,
} from '../models';
import {BrandRepository} from '../repositories';

export class BrandVehicleController {
  constructor(
    @repository(BrandRepository) protected brandRepository: BrandRepository,
  ) { }

  @get('/brands/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Array of Brand has many Vehicle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehicle)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehicle>,
  ): Promise<Vehicle[]> {
    return this.brandRepository.vehicles(id).find(filter);
  }

  @post('/brands/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Brand model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehicle)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Brand.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {
            title: 'NewVehicleInBrand',
            exclude: ['id'],
            optional: ['id_brand']
          }),
        },
      },
    }) vehicle: Omit<Vehicle, 'id'>,
  ): Promise<Vehicle> {
    return this.brandRepository.vehicles(id).create(vehicle);
  }

  @patch('/brands/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Brand.Vehicle PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {partial: true}),
        },
      },
    })
    vehicle: Partial<Vehicle>,
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.brandRepository.vehicles(id).patch(vehicle, where);
  }

  @del('/brands/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Brand.Vehicle DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.brandRepository.vehicles(id).delete(where);
  }
}
