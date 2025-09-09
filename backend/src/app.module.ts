import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { EmpresaModule } from './empresa/empresa.module';
import { DireccionModule } from './direccion/direccion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { OfertaEmpleoModule } from './oferta-empleo/oferta-empleo.module';
import { EstadoModule } from './estado/estado.module';
import { EstudioModule } from './estudio/estudio.module';
import { ExperienciaModule } from './experiencia/experiencia.module';
import { FormularioCvModule } from './formulario-cv/formulario-cv.module';
import { IdiomaModule } from './idioma/idioma.module';
import { LocalidadModule } from './localidad/localidad.module';
import { NivelModule } from './nivel/nivel.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { SolicitudEmpleoModule } from './solicitud-empleo/solicitud-empleo.module';
import { ProvinciaController } from './provincia/provincia.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'bolsaempleo',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    // Módulos de la aplicación
    EmpresaModule,
    DireccionModule,
    UsuarioModule,
    OfertaEmpleoModule,
    EstadoModule,
    EstudioModule,
    ExperienciaModule,
    FormularioCvModule,
    IdiomaModule,
    LocalidadModule,
    NivelModule,
    ProvinciaModule,
    SolicitudEmpleoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
