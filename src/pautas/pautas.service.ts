import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pauta } from './pauta.entity';
import { Result } from 'src/common/Result'

@Injectable()
export class PautasService {
  constructor(
    @Inject('PAUTA_REPOSITORY')
    private readonly pautaRepository: Repository<Pauta>,
  ) { }

  static TEMP_PADRAO_PAUTA: number = 10;

  async save(pauta: Pauta): Promise<Result<Pauta>> {
    const descricao = pauta.descricao;

    const possivelPauta = await this.pautaRepository.findOne({
      where: {
        descricao: descricao
      }
    });
    if (possivelPauta) {
      return new Result(null, new Error('Pauta já cadastrada'));
    }

    pauta = await this.pautaRepository.save(pauta);
    return new Result(pauta, null);
  }

  async findAll(): Promise<Pauta[]> {
    return await this.pautaRepository.find();
  }

  async iniciarSessao(pauta: Pauta, minutes: number = PautasService.TEMP_PADRAO_PAUTA): Promise<boolean> {
    if (!pauta.isPossivelIniciarSessao()) {
      return false;
    }

    pauta.abertura = new Date();
    pauta.fechamento = new Date(pauta.abertura.getTime() + minutes * 60000); // Adicionando minutos a data atual

    try {
      await this.pautaRepository.update(pauta.id, pauta);
      return true;
    } catch (error) {
      console.log("Erro ao tentar salvar a sessão de uma pauta");
      return false;
    }

  }

  async findById(id: string): Promise<Pauta>{
    return await this.pautaRepository.findOneBy({
      id: id
    });
  }

}
