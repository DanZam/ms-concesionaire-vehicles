import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehicle} from './vehicle.model';

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

  @belongsTo(() => Vehicle, {name: 'vehicle'})
  id_vehicle: number;

  constructor(data?: Partial<Picture>) {
    super(data);
  }
}

export interface PictureRelations {
  // describe navigational properties here
}

export type PictureWithRelations = Picture & PictureRelations;
