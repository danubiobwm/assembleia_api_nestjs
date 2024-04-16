import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { VotoService } from '../voto.service';

@Controller('pautas/:id/resultados')
export class ResultadoController {
  constructor(
    private readonly votoService: VotoService
  ){}

  @Get()
  async obterResultado(@Param('id') idPauta: string, @Res() response: Response,
){
    return response.status(HttpStatus.OK).send();
  }
}
