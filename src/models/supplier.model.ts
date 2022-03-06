import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehicle} from './vehicle.model';

@model()
export class Supplier extends Entity {
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
  social_reason: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  telephone_number: string;

  @property({
    type: 'string',
    required: true,
  })
  eMail: string;

  @hasMany(() => Vehicle, {keyTo: 'id_supplier'})
  vehicles: Vehicle[];

  constructor(data?: Partial<Supplier>) {
    super(data);
  }
}

export interface SupplierRelations {
  // describe navigational properties here
}

export type SupplierWithRelations = Supplier & SupplierRelations;
