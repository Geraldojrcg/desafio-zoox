import { AuthMiddleware } from './middleware/auth.middleware';
import { Module, CacheModule, CacheInterceptor, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CidadeModule } from './cidade/cidade.module';
import { EstadoModule } from './estado/estado.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import * as databaseConfig from './config/database.config.json';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${databaseConfig.user}:${databaseConfig.password}@${databaseConfig.address}/${databaseConfig.database}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    }),
    CacheModule.register(),
    EstadoModule,
    CidadeModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
