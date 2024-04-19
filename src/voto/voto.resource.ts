import { OpcaoVoto } from "./voto.entity";
import {IsNotEmpty, IsIn} from "class-validator"


export class RegisterVotoResource{
  @IsNotEmpty({message:"Opção do CPF é obrigatório "})
  cpf: string;
  @IsNotEmpty({message:"Opção do voto é obrigatória "})
  @IsIn([OpcaoVoto.SIM, OpcaoVoto.NAO],{message:"Opção do voto é SIM ou NÃO "} )
  opcaoVoto: OpcaoVoto;

}

