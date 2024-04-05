import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Associado } from "./associado/associado.entity";
import { Pauta } from "../pautas/pauta.entity";

@Entity()
export class Voto{
  @PrimaryGeneratedColumn()
  id?: string;

  @ManyToOne(()=>Pauta)
  @JoinColumn( {name: 'id_pauta'} )
  pauta: Pauta;


  @ManyToOne(()=>Associado)
  @JoinColumn( {name: 'id_associado'} )
  associado: Associado;


  @Column({ name: "voto"})
  opcaoVoto: OpcaoVoto;

}

export enum OpcaoVoto {
  SIM = "SIM",
  NAO = "NAO",
}