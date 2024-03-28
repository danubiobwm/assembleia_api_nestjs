import { Module } from '@nestjs/common';
import { VotoController } from './voto.controller';

@Module({
  controllers: [VotoController]
})
export class VotoModule {}
