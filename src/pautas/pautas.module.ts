import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PautasService } from './pautas.service';
import {pautasProviders} from './pauta.providers';
import { PautasController } from './pautas.controller';

@Module({
  imports: [DatabaseModule],
  providers: [PautasService, ...pautasProviders],
  controllers: [PautasController],
})
export class PautasModule {}
