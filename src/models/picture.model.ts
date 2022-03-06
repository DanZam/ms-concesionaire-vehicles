import {Entity, model, property} from '@loopback/repository';

@model()
export class Picture extends Entity {
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


  constructor(data?: Partial<Picture>) {
    super(data);
  }
}

export interface PictureRelations {
  // describe navigational properties here
}

export type PictureWithRelations = Picture & PictureRelations;
