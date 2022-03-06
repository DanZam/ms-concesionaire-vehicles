import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CathegoryVehicle, CathegoryVehicleRelations} from '../models';

export class CathegoryVehicleRepository extends DefaultCrudRepository<
  CathegoryVehicle,
  typeof CathegoryVehicle.prototype.id,
  CathegoryVehicleRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(CathegoryVehicle, dataSource);
  }
}
