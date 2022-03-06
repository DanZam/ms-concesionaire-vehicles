import {Entity, model, property} from '@loopback/repository';

@model()
export class Cathegory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Cathegory>) {
    super(data);
  }
}

export interface CathegoryRelations {
  // describe navigational properties here
}

export type CathegoryWithRelations = Cathegory & CathegoryRelations;
