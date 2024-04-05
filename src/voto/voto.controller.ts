import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from '../pautas/pautas.service';
import { VotoService } from './voto.service';
import { RegisterVotoResource } from './voto.resource';

@Controller('pautas/:id/votos')
export class VotoController {
  constructor(
    private readonly pautasService: PautasService,
    private readonly votosService: VotoService
  ) { }

  @Post()
  async registrarVoto(
    @Param("id") idPauta: string,
    @Body() resource: RegisterVotoResource,
    @Res() response: Response,
  ) {
    return response.status(HttpStatus.ACCEPTED).send()
  }

}
