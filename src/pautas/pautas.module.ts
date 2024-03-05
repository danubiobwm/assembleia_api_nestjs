import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PautasService } from './pautas.service';
import {pautasProviders} from './pauta.providers';

@Module({
  imports: [DatabaseModule],
  providers: [PautasService, ...pautasProviders],
})
export class PautasModule {}
