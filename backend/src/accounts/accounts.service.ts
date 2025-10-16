// El decorardo @Injetable() marca esta clase para que el sistema de Inyeccion de dependencias de NestJS lp pueda gestionar
import { Injectable } from '@nestjs/common';
// Importamos nuestro DTO. El servicio necesita saber que forma tienen los datos para crear una cuenta
import { CreateAccountDto } from './dto/create-account.dto';
// La 'entidad' define la estructura de nuestro objeto 'Account' una vezcreado
import { Account } from './entities/account.entity';

@Injectable() // Esto permite que el servicio sea "inyectado" en otras clases, como el controlador
export class AccountsService {
  // 'private' asegura que esta variable solo sea accesible desde dentro de esta clase
  // 'accounts' es nuestro array que simulará ser la base de datos
  // Los tupados con 'Account[]' para que solo pueda obtener objetos que sigan la forma de nuestra entidad
  private readonly accounts: Account[] = [];

  // Este metodo se carga de la logica para crear una cuenta
  // Recibe un parametro 'createAccountDto' que debe cumplir con la estructura de nuestro Dto.
  create(createAccountDto: CreateAccountDto): Account {
    // Creamos una nueva instancia de cuenta
    const newAccount: Account = {
      // Simulamos un ID autoincremental. Esto serpa manejado por la BBDD real mas adelante
      id: this.accounts.length + 1,
      name: createAccountDto.name,
      initialBalance: createAccountDto.initialBalance,
      // El saldo actual al momento de la creacion es el mismo que el saldo inicial.
      currentBalance: createAccountDto.initialBalance,
    };

    // Añadimo la cuenta recien creada a nuestro array en memoria.
    this.accounts.push(newAccount);
    // Devolvemos la cuenta completa como confirmacion de que fue creada exitosamente

    // Debe devolver el objeto 'newAccount' completo, no 'newAccount.id' ni otra cosa.
    return newAccount;
  }

  // Este metodo se encarga de devolver todas las cuentas que hemos creado.
  findAll() {
    // Simplemente devuelve el contenido completo de neustro array de cuentas
    return this.accounts;
  }
}
