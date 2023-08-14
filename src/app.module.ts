import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'nest',
      entities: [Users], // 여기에 다른 엔티티들도 추가할 수 있습니다.
      synchronize: true, // 개발 중에는 true로 설정하여 데이터베이스와 엔티티 간의 동기화를 활성화합니다.
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
