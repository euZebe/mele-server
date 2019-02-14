import {Entity, PrimaryGeneratedColumn, ManyToOne, Column} from "typeorm";
import { IsDefined } from "class-validator";
import { Draw } from "./draw";

@Entity("assignments")
export class Assignment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  @IsDefined()
  from: string;

  @Column("text")
  @IsDefined()
  to: string;

  @ManyToOne(() => Draw, draw => draw.assignments)
  draw: Draw;
}
