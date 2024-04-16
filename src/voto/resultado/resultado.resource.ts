import { OpcaoVoto } from "../voto.entity";


export class ResultadoVotacaoResource{
  pauta: string;
  abertura: string;
  encerramento: Date;
  totalVotos: number;
  quantidadeSim: number;
  quantidadeNão: number;
  opcaoGanhadora: OpcaoVoto;
}