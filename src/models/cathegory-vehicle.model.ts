import {Entity, model, property} from '@loopback/repository';

@model()
export class CathegoryVehicle extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_vehicle?: number;

  @property({
    type: 'number',
  })
  id_cathegory?: number;

  constructor(data?: Partial<CathegoryVehicle>) {
    super(data);
  }
}

export interface CathegoryVehicleRelations {
  // describe navigational properties here
}

export type CathegoryVehicleWithRelations = CathegoryVehicle & CathegoryVehicleRelations;
