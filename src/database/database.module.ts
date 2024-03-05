import { Module, Provider } from '@nestjs/common';
import { dataBaseProviders } from './database.providers';

@Module({
  providers: dataBaseProviders.map(({ provider, useFactory }): Provider => ({
    provide: provider,
    useFactory: useFactory,
  })),
  exports: dataBaseProviders.map(({ provider, useFactory }): Provider => ({
    provide: provider,
    useFactory: useFactory,
  })),
})
export class DatabaseModule {}
