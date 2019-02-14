//import type definitions from typeorm that describe the physical
//charachteristics of fields that we will store in the database
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
//Import functions from the class-valadiator package that we will
//use to validate data when someone is creating or editing a user
import { Length, IsDefined } from "class-validator";
//This decorator (denoted by the @ symbol) tells type-orm that
//we want to call the database table users
@Entity("draws")
//Export the User class so we can use it elsewhere in our project
export class Draw {
  @PrimaryGeneratedColumn("uuid") //Tell Postgre to generate a Unique Key for this column
  id: string; //Name of the column is id and type is string

  @Column("text")
  @Length(1, 100)
  @IsDefined()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
