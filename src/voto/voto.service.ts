import { Inject, Injectable } from '@nestjs/common';
import { OpcaoVoto, Voto } from './voto.entity';
import { Repository } from 'typeorm';
import { AssociadoService } from './associado/associado.service';
import { Result } from '../common/Result';
import { Pauta } from '../pautas/pauta.entity';
import { Associado } from './associado/associado.entity';

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
  ): Promise<Result<Voto>> {
    if (!pauta.isFoiInicial) {
      return new Result(null, new Error('A pauta não foi inicializada'));
    }

    const associado: Associado = await this.associadoService.recuperarOuCadastrar(cpf);

    const votoJaRegistro: boolean = await this.existeVotoPara(pauta, associado)

    if (votoJaRegistro) {
      return new Result(null, new Error("Voto já registrado anteriomente."))
    }

    const voto: Voto = new Voto();
    voto.pauta = pauta;
    voto.associado = associado;
    voto.opcaoVoto = opcaoVoto;

    await this.votoRepository.save(voto);
    return new Result(voto, null);

  }

  async existeVotoPara(pauta: Pauta, associado: Associado): Promise<boolean> {
    const voto = this.votoRepository.findOne({
      where: {
        pauta: {
          id: pauta.id
        }, associado: {
          id: associado.id
        }
      }
    });
    return !!voto;
  }
}
