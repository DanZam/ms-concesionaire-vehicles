import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Vehicle, VehicleRelations, Brand, Cathegory, CathegoryVehicle, Picture, Supplier} from '../models';
import {BrandRepository} from './brand.repository';
import {CathegoryVehicleRepository} from './cathegory-vehicle.repository';
import {CathegoryRepository} from './cathegory.repository';
import {PictureRepository} from './picture.repository';
import {SupplierRepository} from './supplier.repository';

export class VehicleRepository extends DefaultCrudRepository<
  Vehicle,
  typeof Vehicle.prototype.id,
  VehicleRelations
> {

  public readonly belongsToBrand: BelongsToAccessor<Brand, typeof Vehicle.prototype.id>;

  public readonly cathegories: HasManyThroughRepositoryFactory<Cathegory, typeof Cathegory.prototype.id,
          CathegoryVehicle,
          typeof Vehicle.prototype.id
        >;

  public readonly pictures: HasManyRepositoryFactory<Picture, typeof Vehicle.prototype.id>;

  public readonly supplier: BelongsToAccessor<Supplier, typeof Vehicle.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BrandRepository') protected brandRepositoryGetter: Getter<BrandRepository>, @repository.getter('CathegoryVehicleRepository') protected cathegoryVehicleRepositoryGetter: Getter<CathegoryVehicleRepository>, @repository.getter('CathegoryRepository') protected cathegoryRepositoryGetter: Getter<CathegoryRepository>, @repository.getter('PictureRepository') protected pictureRepositoryGetter: Getter<PictureRepository>, @repository.getter('SupplierRepository') protected supplierRepositoryGetter: Getter<SupplierRepository>,
  ) {
    super(Vehicle, dataSource);
    this.supplier = this.createBelongsToAccessorFor('supplier', supplierRepositoryGetter,);
    this.registerInclusionResolver('supplier', this.supplier.inclusionResolver);
    this.pictures = this.createHasManyRepositoryFactoryFor('pictures', pictureRepositoryGetter,);
    this.registerInclusionResolver('pictures', this.pictures.inclusionResolver);
    this.cathegories = this.createHasManyThroughRepositoryFactoryFor('cathegories', cathegoryRepositoryGetter, cathegoryVehicleRepositoryGetter,);
    this.registerInclusionResolver('cathegories', this.cathegories.inclusionResolver);
    this.belongsToBrand = this.createBelongsToAccessorFor('belongsToBrand', brandRepositoryGetter,);
    this.registerInclusionResolver('belongsToBrand', this.belongsToBrand.inclusionResolver);
  }
}
