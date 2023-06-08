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
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: 'root_password',
    database: 'api_chat_DB',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
}), UserModule, ChatModule, MessageModule, UniversModule, CharacterModule, AuthModule, OpenAIModule],
  controllers: [AppController],
  providers: [AppService, 
  ],
})
export class AppModule {}
