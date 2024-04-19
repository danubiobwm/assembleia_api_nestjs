import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from '../pautas/pautas.service';
import { VotoService } from './voto.service';
import { RegisterVotoResource } from './voto.resource';
import { ErrorResponse } from '../common/erro.resource';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('pautas/:id/votos')
@ApiTags('Votos')
export class VotoController {
  constructor(
    private readonly pautasService: PautasService,
    private readonly votosService: VotoService
  ) { }

  @Post()
  @ApiOperation({ description: 'Criar Pauta' })
  async registrarVoto(
    @Param("id") idPauta: string,
    @Body() resource: RegisterVotoResource,
    @Res() response: Response,
  ) {

    const pauta = await this.pautasService.findById(idPauta);

    if(!pauta) {
      return response.status(HttpStatus.NOT_FOUND)
      .send(new ErrorResponse("Pauta não encontrada"))
    }

    const result = await this.votosService.registarVoto(pauta, resource.cpf, resource.opcaoVoto);

    if(result.isError()){
      const error = result.error;
      return response.status(error.status).send(new ErrorResponse(error.message))
    }

    return response.status(HttpStatus.ACCEPTED).send()
  }

}
