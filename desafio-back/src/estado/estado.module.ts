import { EstadoService } from './estado.service';
import { EstadoSchema } from './estado.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { EstadoController } from './estado.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Estado', schema: EstadoSchema }])
    ],
    controllers: [EstadoController],
    providers: [EstadoService],
    exports: [EstadoService]
})
export class EstadoModule { }
