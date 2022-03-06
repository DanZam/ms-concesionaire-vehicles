import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Brand} from './brand.model';
import {Cathegory} from './cathegory.model';
import {CathegoryVehicle} from './cathegory-vehicle.model';
import {Picture} from './picture.model';
import {Supplier} from './supplier.model';

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
  price: number;

  @property({
    type: 'number',
    default: 0
  })
  discount?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  status?: boolean;

  @belongsTo(() => Brand, {name: 'belongsToBrand'})
  id_brand: number;

  @hasMany(() => Cathegory, {through: {model: () => CathegoryVehicle, keyFrom: 'id_vehicle', keyTo: 'id_cathegory'}})
  cathegories: Cathegory[];

  @hasMany(() => Picture, {keyTo: 'id_vehicle'})
  pictures: Picture[];

  @belongsTo(() => Supplier, {name: 'supplier'})
  id_supplier: number;

  constructor(data?: Partial<Vehicle>) {
    super(data);
  }
}

export interface VehicleRelations {
  // describe navigational properties here
}

export type VehicleWithRelations = Vehicle & VehicleRelations;
