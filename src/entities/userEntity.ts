import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ObjectID,
} from "typeorm";

export type TLogin = {
  email: string;
  password: string;
};

export type TUserData = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  password: string;
};

@Entity("user")
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  _id!: ObjectID;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  updatedAt?: Date;

  @Column()
  name!: string;

  @Column({ nullable: true })
  email!: string;

  @Column()
  password!: string;
}

export default UserEntity;
