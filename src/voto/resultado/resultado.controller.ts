import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { VotoService } from '../voto.service';
import { PautasService } from '../../pautas/pautas.service';
import { ErrorResponse } from '../../common/erro.resource';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('pautas/:id/resultados')
@ApiTags('Resultados')
export class ResultadoController {
  constructor(
    private readonly votoService: VotoService,
    private readonly pautasService: PautasService
  ){}

  @Get()
  @ApiOperation({ description: 'Resultados da votação' })
  async obterResultado(@Param('id') idPauta: string, @Res() response: Response,
){

  const pauta = await this.pautasService.findById(idPauta);

  if(!pauta) {
    return response.status(HttpStatus.NOT_FOUND)
    .send(new ErrorResponse("Pauta não encontrada"))
  }

    const result = await this.votoService.obterResultado(pauta);

    if(result.isError()){

      return response
        .status(result.error.status)
        .send(new ErrorResponse(result.error.message))
    }

    return response.status(HttpStatus.OK).send(result.value);
  }
}
