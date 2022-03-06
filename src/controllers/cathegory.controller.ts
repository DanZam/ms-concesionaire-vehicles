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
import {Cathegory} from '../models';
import {CathegoryRepository} from '../repositories';

export class CathegoryController {
  constructor(
    @repository(CathegoryRepository)
    public cathegoryRepository : CathegoryRepository,
  ) {}

  @post('/cathegories')
  @response(200, {
    description: 'Cathegory model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cathegory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cathegory, {
            title: 'NewCathegory',
            exclude: ['id'],
          }),
        },
      },
    })
    cathegory: Omit<Cathegory, 'id'>,
  ): Promise<Cathegory> {
    return this.cathegoryRepository.create(cathegory);
  }

  @get('/cathegories/count')
  @response(200, {
    description: 'Cathegory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cathegory) where?: Where<Cathegory>,
  ): Promise<Count> {
    return this.cathegoryRepository.count(where);
  }

  @get('/cathegories')
  @response(200, {
    description: 'Array of Cathegory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cathegory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cathegory) filter?: Filter<Cathegory>,
  ): Promise<Cathegory[]> {
    return this.cathegoryRepository.find(filter);
  }

  @patch('/cathegories')
  @response(200, {
    description: 'Cathegory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cathegory, {partial: true}),
        },
      },
    })
    cathegory: Cathegory,
    @param.where(Cathegory) where?: Where<Cathegory>,
  ): Promise<Count> {
    return this.cathegoryRepository.updateAll(cathegory, where);
  }

  @get('/cathegories/{id}')
  @response(200, {
    description: 'Cathegory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cathegory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cathegory, {exclude: 'where'}) filter?: FilterExcludingWhere<Cathegory>
  ): Promise<Cathegory> {
    return this.cathegoryRepository.findById(id, filter);
  }

  @patch('/cathegories/{id}')
  @response(204, {
    description: 'Cathegory PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cathegory, {partial: true}),
        },
      },
    })
    cathegory: Cathegory,
  ): Promise<void> {
    await this.cathegoryRepository.updateById(id, cathegory);
  }

  @put('/cathegories/{id}')
  @response(204, {
    description: 'Cathegory PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cathegory: Cathegory,
  ): Promise<void> {
    await this.cathegoryRepository.replaceById(id, cathegory);
  }

  @del('/cathegories/{id}')
  @response(204, {
    description: 'Cathegory DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cathegoryRepository.deleteById(id);
  }
}
