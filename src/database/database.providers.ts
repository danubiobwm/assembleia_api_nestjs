import { createConnection } from 'net';
import { DataSource } from 'typeorm';


export const dataBaseProviders = [
  {
    provider: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'assembleia',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });
      return dataSource.initialize();
    }

  }
];