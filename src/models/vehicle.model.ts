import {Entity, model, property} from '@loopback/repository';

@model()
export class Vehicle extends Entity {
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
  color: string;

  @property({
    type: 'number',
    required: true,
  })
  model: number;

  @property({
    type: 'string',
    required: true,
  })
  chassis_series: string;

  @property({
    type: 'string',
    required: true,
  })
  serie_engine: string;

  @property({
    type: 'number',
    required: true,
  })
  prices: number;

  @property({
    type: 'number',
    required: true,
  })
  discount: number;

  @property({
    type: 'boolean',
    default: True,
  })
  status?: boolean;


  constructor(data?: Partial<Vehicle>) {
    super(data);
  }
}

export interface VehicleRelations {
  // describe navigational properties here
}

export type VehicleWithRelations = Vehicle & VehicleRelations;
