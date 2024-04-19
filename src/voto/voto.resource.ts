import { OpcaoVoto } from "./voto.entity";
import {IsNotEmpty, IsIn} from "class-validator"
import { ApiProperty } from '@nestjs/swagger'


export class RegisterVotoResource{
  @ApiProperty()
  @IsNotEmpty({message:"Opção do CPF é obrigatório "})
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({message:"Opção do voto é obrigatória "})
  @IsIn([OpcaoVoto.SIM, OpcaoVoto.NAO],{message:"Opção do voto é SIM ou NÃO "} )
  opcaoVoto: OpcaoVoto;

}

