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
}


enum StatusPauta {
  NAO_INICIADA = "Sessão Não Iniciada",
  INICIADA = "Sessão em Iniciada",
  ENCERRADA = "Sessão Encerrada"
}