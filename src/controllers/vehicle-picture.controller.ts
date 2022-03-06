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
  Picture,
} from '../models';
import {VehicleRepository} from '../repositories';

export class VehiclePictureController {
  constructor(
    @repository(VehicleRepository) protected vehicleRepository: VehicleRepository,
  ) { }

  @get('/vehicles/{id}/pictures', {
    responses: {
      '200': {
        description: 'Array of Vehicle has many Picture',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Picture)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Picture>,
  ): Promise<Picture[]> {
    return this.vehicleRepository.pictures(id).find(filter);
  }

  @post('/vehicles/{id}/pictures', {
    responses: {
      '200': {
        description: 'Vehicle model instance',
        content: {'application/json': {schema: getModelSchemaRef(Picture)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Vehicle.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Picture, {
            title: 'NewPictureInVehicle',
            exclude: ['id'],
            optional: ['id_vehicle']
          }),
        },
      },
    }) picture: Omit<Picture, 'id'>,
  ): Promise<Picture> {
    return this.vehicleRepository.pictures(id).create(picture);
  }

  @patch('/vehicles/{id}/pictures', {
    responses: {
      '200': {
        description: 'Vehicle.Picture PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Picture, {partial: true}),
        },
      },
    })
    picture: Partial<Picture>,
    @param.query.object('where', getWhereSchemaFor(Picture)) where?: Where<Picture>,
  ): Promise<Count> {
    return this.vehicleRepository.pictures(id).patch(picture, where);
  }

  @del('/vehicles/{id}/pictures', {
    responses: {
      '200': {
        description: 'Vehicle.Picture DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Picture)) where?: Where<Picture>,
  ): Promise<Count> {
    return this.vehicleRepository.pictures(id).delete(where);
  }
}
