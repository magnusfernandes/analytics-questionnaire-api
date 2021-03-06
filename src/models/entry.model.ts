import {
  Optional,
  Model,
  BuildOptions,
  Sequelize,
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";
import { ResponseModel } from "./response.model";

export interface EntryAttributes {
  id: number;
  user: string;
  test: string;
  version: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EntryCreationAttributes
  extends Optional<EntryAttributes, "id"> {}

export class EntryModel
  extends Model<EntryAttributes, EntryCreationAttributes>
  implements EntryAttributes {
  id!: number;
  user!: string;
  test!: string;
  version!: string;

  // timestamps!
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  public createResponse!: HasManyCreateAssociationMixin<ResponseModel>;
  public getResponses!: HasManyGetAssociationsMixin<ResponseModel>;
}

export type EntryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EntryModel;
};

export function EntryFactory(config: Sequelize) {
  return <EntryStatic>config.define("entries", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.UUID,
      unique: true,
    },
    test: {
      type: DataTypes.STRING,
    },
    version: {
      type: DataTypes.STRING,
    },
  });
}
