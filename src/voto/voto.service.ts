import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OpcaoVoto, Voto } from './voto.entity';
import { Repository } from 'typeorm';
import { AssociadoService } from './associado/associado.service';
import { Result } from '../common/Result';
import { Pauta } from '../pautas/pauta.entity';
import { Associado } from './associado/associado.entity';
import { HttpError } from '../common/httpError';
import { ResultadoVotacaoResource } from './resultado/resultado.resource';

@Injectable()
export class VotoService {
  constructor(
    @Inject('VOTO_REPOSITORY')
    private readonly votoRepository: Repository<Voto>,
    private readonly associadoService: AssociadoService,
  ) { }

  async registarVoto(
    pauta: Pauta,
    cpf: string,
    opcaoVoto: OpcaoVoto,
  ): Promise<Result<Voto, HttpError>> {
    if (!pauta.isFoiInicial) {
      return new Result(null, new HttpError('A pauta não foi inicializada', HttpStatus.UNPROCESSABLE_ENTITY));
    }

    const associado: Associado = await this.associadoService.recuperarOuCadastrar(cpf);

    const votoJaRegistro: boolean = await this.existeVotoPara(pauta, associado)

    if (votoJaRegistro) {
      return new Result(null, new HttpError("Voto já registrado anteriomente.", HttpStatus.CONFLICT))
    }

    const voto: Voto = new Voto();
    voto.pauta = pauta;
    voto.associado = associado;
    voto.opcaoVoto = opcaoVoto;

    await this.votoRepository.save(voto);
    return new Result(voto, null);

  }

  async existeVotoPara(pauta: Pauta, associado: Associado): Promise<boolean> {
    const voto = await this.votoRepository.findOne({
      where: {
        pauta: {
          id: pauta.id
        },
        associado: {
          id: associado.id
        }
      }
    });
    return !!voto;
  }

  async obterVotosPorPauta(pauta: Pauta): Promise<Voto[]> {
    return await this.votoRepository.find({
      where: {
        id: pauta.id
      }
    })

  }


  obterPosicaoVencedora(sim: number, nao: number): OpcaoVoto{
    if(sim ==nao){
      return null
    }

    return sim > nao ? OpcaoVoto.SIM : OpcaoVoto.NAO;
  }


  async obterResultado(pauta:Pauta):Promise<Result<ResultadoVotacaoResource, HttpError>> {
    if(!pauta.isFoiEncerrada){
      return new Result(null, new HttpError("Resultado ainda não disponivel", HttpStatus.NOT_FOUND))
    }
    const votos: Voto[] = await this.obterVotosPorPauta(pauta)

    const qtdSim = votos.filter(voto => voto.opcaoVoto == OpcaoVoto.SIM).length;
    const qtdNao = votos.filter(voto => voto.opcaoVoto == OpcaoVoto.NAO).length;

    const posicaoVencedora = this.obterPosicaoVencedora(qtdSim, qtdNao);


    const resultado = new ResultadoVotacaoResource();
    resultado.pauta = pauta.descricao;
    resultado.abertura = pauta.abertura.toISOString();
    resultado.encerramento = pauta.fechamento;
    resultado.totalVotos = votos.length;
    resultado.quantidadeSim = qtdSim;
    resultado.quantidadeNao = qtdNao;
    resultado.opcaoGanhadora = posicaoVencedora;


    return new Result(resultado, null)

  }

}
