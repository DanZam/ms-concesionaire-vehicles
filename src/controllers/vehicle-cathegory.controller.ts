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
Vehicle,
CathegoryVehicle,
Cathegory,
} from '../models';
import {VehicleRepository} from '../repositories';

export class VehicleCathegoryController {
  constructor(
    @repository(VehicleRepository) protected vehicleRepository: VehicleRepository,
  ) { }

  @get('/vehicles/{id}/cathegories', {
    responses: {
      '200': {
        description: 'Array of Vehicle has many Cathegory through CathegoryVehicle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cathegory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cathegory>,
  ): Promise<Cathegory[]> {
    return this.vehicleRepository.cathegories(id).find(filter);
  }

  @post('/vehicles/{id}/cathegories', {
    responses: {
      '200': {
        description: 'create a Cathegory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cathegory)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Vehicle.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cathegory, {
            title: 'NewCathegoryInVehicle',
            exclude: ['id'],
          }),
        },
      },
    }) cathegory: Omit<Cathegory, 'id'>,
  ): Promise<Cathegory> {
    return this.vehicleRepository.cathegories(id).create(cathegory);
  }

  @patch('/vehicles/{id}/cathegories', {
    responses: {
      '200': {
        description: 'Vehicle.Cathegory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cathegory, {partial: true}),
        },
      },
    })
    cathegory: Partial<Cathegory>,
    @param.query.object('where', getWhereSchemaFor(Cathegory)) where?: Where<Cathegory>,
  ): Promise<Count> {
    return this.vehicleRepository.cathegories(id).patch(cathegory, where);
  }

  @del('/vehicles/{id}/cathegories', {
    responses: {
      '200': {
        description: 'Vehicle.Cathegory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cathegory)) where?: Where<Cathegory>,
  ): Promise<Count> {
    return this.vehicleRepository.cathegories(id).delete(where);
  }
}
