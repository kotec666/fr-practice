import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        database: 'practice',
        username: 'banki',
        password: 'banki',
        autoLoadEntities: true,
        synchronize: true,
      }),
      // inject: [],
    }),
  ],
})
export class DatabaseModule {}
