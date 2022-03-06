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
  Supplier,
  Vehicle,
} from '../models';
import {SupplierRepository} from '../repositories';

export class SupplierVehicleController {
  constructor(
    @repository(SupplierRepository) protected supplierRepository: SupplierRepository,
  ) { }

  @get('/suppliers/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Array of Supplier has many Vehicle',
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
    return this.supplierRepository.vehicles(id).find(filter);
  }

  @post('/suppliers/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Supplier model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehicle)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Supplier.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehicle, {
            title: 'NewVehicleInSupplier',
            exclude: ['id'],
            optional: ['id_supplier']
          }),
        },
      },
    }) vehicle: Omit<Vehicle, 'id'>,
  ): Promise<Vehicle> {
    return this.supplierRepository.vehicles(id).create(vehicle);
  }

  @patch('/suppliers/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Supplier.Vehicle PATCH success count',
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
    return this.supplierRepository.vehicles(id).patch(vehicle, where);
  }

  @del('/suppliers/{id}/vehicles', {
    responses: {
      '200': {
        description: 'Supplier.Vehicle DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehicle)) where?: Where<Vehicle>,
  ): Promise<Count> {
    return this.supplierRepository.vehicles(id).delete(where);
  }
}
