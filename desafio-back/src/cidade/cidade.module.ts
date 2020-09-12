import { EstadoModule } from './../estado/estado.module';
import { CidadeService } from './cidade.service';
import { Module } from '@nestjs/common';
import { CidadeSchema } from './cidade.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CidadeController } from './cidade.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Cidade', schema: CidadeSchema }]),
        EstadoModule
    ],
    controllers: [CidadeController],
    providers: [CidadeService]
})
export class CidadeModule { }
