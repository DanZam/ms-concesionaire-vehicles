import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cathegory, CathegoryRelations} from '../models';

export class CathegoryRepository extends DefaultCrudRepository<
  Cathegory,
  typeof Cathegory.prototype.id,
  CathegoryRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Cathegory, dataSource);
  }
}
