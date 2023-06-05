import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { UniversModule } from './univers/univers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterModule } from './character/character.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'db_user',
    password: 'db_password',
    database: 'api_chat_DB',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
}), UserModule, ChatModule, MessageModule, UniversModule, CharacterModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, 
  ],
})
export class AppModule {}
