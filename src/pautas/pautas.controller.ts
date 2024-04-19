import { Controller, Body, Res, Post, HttpStatus, Get, Param, Logger } from '@nestjs/common';
import { Response } from 'express';
import { PautasService } from './pautas.service';
import { CriarPautaResource, NovaSessaoResource, toDomain, toRepresentation } from './pautas.resource';
import { Pauta } from './pauta.entity';
import { ErrorResponse } from '../common/erro.resource';

@Controller('pautas')
export class PautasController {

  private readonly logger = new Logger(PautasController.name);
  constructor(
    private readonly pautasService: PautasService
  ) { }

  @Post()
  async save(@Body() pauta: CriarPautaResource, @Res() response: Response) {

    this.logger.log("Criando nova pauta")
    const pautaDomain: Pauta = toDomain(pauta);
    const result = await this.pautasService.save(pautaDomain);

    if (result.isError()) {
      this.logger.error("Erro ao cria nova pauta")
      return response
        .status(HttpStatus.CONFLICT)
        .send(new ErrorResponse(result.error.message));
    }
    return response.status(HttpStatus.CREATED).send(toRepresentation(result.value));
  }

  @Get()
  async listAll(@Res() response: Response) {
    const result = await this.pautasService.findAll();

    return response.status(HttpStatus.OK).send(result.map(toRepresentation));
  }

  @Post(':id/sessao')
  async criarSessao(@Param('id') id: string,
    @Body() resource: NovaSessaoResource, @Res() response: Response) {

    const pauta: Pauta = await this.pautasService.findById(id);
    if (!pauta) {
      return response.status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse(`Não existe uma pauta com o ID ${id}`));
    }

    const sucesso = await this.pautasService.iniciarSessao(pauta, resource.minutes)

    if (sucesso) {
      return response.status(HttpStatus.OK).send()
    }

    const errorResponse = new ErrorResponse(
      `Não foi possivel iniciar a sessão para esta pauta, sua sessão ja foi iniciada ou encerrada`);

    return response.status(HttpStatus.CONFLICT).send(errorResponse)

  }

}
