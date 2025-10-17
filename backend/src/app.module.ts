import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  // El array 'imports' es donde registramos otros modulos que nuestra aplicacion necesita.
  imports: [
    // 1. Configurar el modulo par aleer el archivo .env
    // 'isGlobal: true' hace que no necesitemos importar ConfigModule en ningun otro lugar para poder usar las variables de entorno.
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Configuramosl a conexion a la base de datos.
    // Usamos 'forRootAsync' porque necesuta esperar a que ConfigModule cargue la DATABASE_URL antes de intetar conectar
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Le decimos que es bloque depende de ConfigModule
      useFactory: () => ({
        type: 'postgres', // El tipo de base de datos que usamos
        url: process.env.DATABASE_URL, // Aqui es donde lee la URL del archivo .env
        autoLoadEntities: true, // typeORM buscará automaticamente nuestro archivos de entidad (como account.entity.ts)
        synchronize: true, // En desarrollo, esto crea y actuliza las tablas por nosotros. NUNCA USAR EN PRODUCCION
      }),
    }),

    // 3. Nuestro modulo de Cuentas sigue siendo parte de la apicacion
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
