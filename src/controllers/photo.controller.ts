import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Picture} from '../models';
import {PictureRepository} from '../repositories';

export class PhotoController {
  constructor(
    @repository(PictureRepository)
    public pictureRepository : PictureRepository,
  ) {}

  @post('/pictures')
  @response(200, {
    description: 'Picture model instance',
    content: {'application/json': {schema: getModelSchemaRef(Picture)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Picture, {
            title: 'NewPicture',
            exclude: ['id'],
          }),
        },
      },
    })
    picture: Omit<Picture, 'id'>,
  ): Promise<Picture> {
    return this.pictureRepository.create(picture);
  }

  @get('/pictures/count')
  @response(200, {
    description: 'Picture model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Picture) where?: Where<Picture>,
  ): Promise<Count> {
    return this.pictureRepository.count(where);
  }

  @get('/pictures')
  @response(200, {
    description: 'Array of Picture model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Picture, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Picture) filter?: Filter<Picture>,
  ): Promise<Picture[]> {
    return this.pictureRepository.find(filter);
  }

  @patch('/pictures')
  @response(200, {
    description: 'Picture PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Picture, {partial: true}),
        },
      },
    })
    picture: Picture,
    @param.where(Picture) where?: Where<Picture>,
  ): Promise<Count> {
    return this.pictureRepository.updateAll(picture, where);
  }

  @get('/pictures/{id}')
  @response(200, {
    description: 'Picture model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Picture, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Picture, {exclude: 'where'}) filter?: FilterExcludingWhere<Picture>
  ): Promise<Picture> {
    return this.pictureRepository.findById(id, filter);
  }

  @patch('/pictures/{id}')
  @response(204, {
    description: 'Picture PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Picture, {partial: true}),
        },
      },
    })
    picture: Picture,
  ): Promise<void> {
    await this.pictureRepository.updateById(id, picture);
  }

  @put('/pictures/{id}')
  @response(204, {
    description: 'Picture PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() picture: Picture,
  ): Promise<void> {
    await this.pictureRepository.replaceById(id, picture);
  }

  @del('/pictures/{id}')
  @response(204, {
    description: 'Picture DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pictureRepository.deleteById(id);
  }
}
