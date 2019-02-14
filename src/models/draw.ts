import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { Length, IsDefined } from "class-validator";
import { Assignment } from "./assignment";

@Entity("draws")
export class Draw {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  @Length(1, 100)
  @IsDefined()
  name: string;

  @IsDefined()
  @OneToMany(() => Assignment, assignment => assignment.draw, {
    cascade: true,
    eager: true
  })
  assignments: Assignment[];

  @CreateDateColumn()
  createdAt: Date;
}
