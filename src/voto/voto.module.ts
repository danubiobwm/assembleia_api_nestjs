import { Module } from '@nestjs/common';
import { VotoController } from './voto.controller';
import { DatabaseModule } from 'src/database/database.module'
import { votoProviders } from "./voto.providers"
import { VotoService } from './voto.service';


@Module({
  controllers: [VotoController],
  imports: [DatabaseModule],
  providers: [...votoProviders, VotoService]
})
export class VotoModule {}
