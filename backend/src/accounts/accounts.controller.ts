// Importamos los decoradores que necesitamos. Controller para la clse, get/post para los metodos y body para el payload
import { Controller, Get, Body, Post } from '@nestjs/common';
// Importamos nuestro servicio para poder llamar a sus metodos
import { AccountsService } from './accounts.service';
// Importamos nuestro DTO para definir el tipo de dato que esperamos en el body de la peticion POST
import { CreateAccountDto } from './dto/create-account.dto';

// @Controller('accounts') define la ruta base para todos los endpoints dentro de esta clase Ej: http://localhost:3000/accounts
@Controller('accounts')
export class AccountsController {
  // El 'constructor' es un metodo especial que se ejecuta al crear una instancia de la clase
  // Aqui, NestJS "inyecta" una instancia de AccountsService para que podmoa usarla
  // 'private readonly' es una tajao de TypeScript para crear y asignar una propiedad a la clase
  constructor(private readonly accountsService: AccountsService) {}

  // @Post() deocra este metodo par que se ejecute cuando llegue la peticion HTTP POST a la ruta bse '/accounts'
  // @Body() es un decorador de parametro que extrae el JSON del cuerpo de la peticion y lo convierte en nuestro DTO
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    // Llama al metodo 'create' de nuestro servicio, pasandole los datos validos por el DTO
    // Lo que retorne el servicio, se enviará automaticamente como respuesta JSON al cliente
    return this.accountsService.create(createAccountDto);
  }

  // @Get() decora este metodo para que se ejecute cuando llegue una peticion HTTP GET a la ruta base '/accounts'.
  @Get()
  findAll() {
    // LLama al metodo 'findAll' del servicio, que devuelve la lista de todas las cuentas
    return this.accountsService.findAll();
  }
}
