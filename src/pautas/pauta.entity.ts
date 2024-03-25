import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pauta {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  descricao: string;

  @CreateDateColumn({ name: 'data_cadastro' })
  dataCadastro?: Date;

  @Column({ type: 'timestamp', nullable: true })
  abertura?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechamento?: Date;

  obterStatus(): string {
    if (this.fechamento && this.fechamento < new Date()) {
      return StatusPauta.ENCERRADA
    }
    if (this.abertura) {
      return StatusPauta.INICIADA
    }
    return StatusPauta.NAO_INICIADA

  }

  public isFoiInicial(): boolean {
    return this.isInSatus(StatusPauta.INICIADA);
  }

  public isFoiEncerrada(): boolean {

    return this.isInSatus(StatusPauta.ENCERRADA);
  }

  public isPossivelIniciarSessao(): boolean {

    return this.isInSatus(StatusPauta.NAO_INICIADA);
  }

  public isInSatus(statusVerificar: StatusPauta): boolean {
    const status = this.obterStatus();
    return status == statusVerificar;
  }
}


enum StatusPauta {
  NAO_INICIADA = "Sessão Não Iniciada",
  INICIADA = "Sessão em Iniciada",
  ENCERRADA = "Sessão Encerrada"
}