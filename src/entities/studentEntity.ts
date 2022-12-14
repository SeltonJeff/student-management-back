import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ObjectID,
} from "typeorm";

export type TStudentData = {
  ra: string;
  name: string;
  email: string;
  cpf: string;
};

@Entity("student")
class StudentEntity extends BaseEntity {
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

  @Column({
    unique: true,
  })
  ra!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  email!: string;

  @Column()
  cpf!: string;
}

export default StudentEntity;
