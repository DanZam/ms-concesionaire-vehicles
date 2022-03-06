import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Picture, PictureRelations, Vehicle} from '../models';
import {VehicleRepository} from './vehicle.repository';

export class PictureRepository extends DefaultCrudRepository<
  Picture,
  typeof Picture.prototype.id,
  PictureRelations
> {

  public readonly vehicle: BelongsToAccessor<Vehicle, typeof Picture.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehicleRepository') protected vehicleRepositoryGetter: Getter<VehicleRepository>,
  ) {
    super(Picture, dataSource);
    this.vehicle = this.createBelongsToAccessorFor('vehicle', vehicleRepositoryGetter,);
    this.registerInclusionResolver('vehicle', this.vehicle.inclusionResolver);
  }
}
