import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { DireccionModule } from './direccion/direccion.module';
import { EmpleoOfrecidoModule } from './empleo-ofrecido/empleo-ofrecido.module';
import { EmpresaModule } from './empresa/empresa.module';
import { EstadoModule } from './estado/estado.module';
import { EstudioModule } from './estudio/estudio.module';
import { ExperienciaModule } from './experiencia/experiencia.module';
import { FormularioCvModule } from './formulario-cv/formulario-cv.module';
import { IdiomaModule } from './idioma/idioma.module';
import { LocalidadModule } from './localidad/localidad.module';
import { NivelModule } from './nivel/nivel.module';
import { OfertaEmpleoModule } from './oferta-empleo/oferta-empleo.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { SolicitudEmpleoModule } from './solicitud-empleo/solicitud-empleo.module';
import { UsuarioModule } from './usuario/usuario.module';
import { entities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'postgres',
      database: 'bolsaempleo',
      synchronize: true,
      entities,
    }),
    TypeOrmModule.forFeature(entities),
    DireccionModule,
    EmpleoOfrecidoModule,
    EmpresaModule,
    EstadoModule,
    EstudioModule,
    ExperienciaModule,
    FormularioCvModule,
    IdiomaModule,
    LocalidadModule,
    NivelModule,
    OfertaEmpleoModule,
    ProvinciaModule,
    SolicitudEmpleoModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
