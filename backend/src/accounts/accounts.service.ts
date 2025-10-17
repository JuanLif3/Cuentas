// El decorardo @Injetable() marca esta clase para que el sistema de Inyeccion de dependencias de NestJS lp pueda gestionar
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Importamos nuestro DTO. El servicio necesita saber que forma tienen los datos para crear una cuenta
import { CreateAccountDto } from './dto/create-account.dto';
// La 'entidad' define la estructura de nuestro objeto 'Account' una vezcreado
import { Account } from './entities/account.entity';
@Injectable() // Esto permite que el servicio sea "inyectado" en otras clases, como el controlador
export class AccountsService {
  //Inyectamos el repositorio del constructor
  // @InjectRepostory(Account) le dice a NestJS: "por favor dame el repositorio para la entidad account"
  // 'private accountRepository: Repository<Account>' crea una propiedad en esta clase
  // para que podamos usarla más abajo con 'this.accountRepository'.

  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}
  //  El metodo 'create' ahora es asincrono.
  // Devuelve una 'Promise' que es un apromesa de que eventualmente tendremos un objeto 'Account'

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    // Creamos una nueva instancia de la entidad a partir de los datos del DTO
    // Esto todavia esta solo en la memoria, no en la base de datos
    const newAccount = this.accountRepository.create({
      ...createAccountDto,
      currentBalance: createAccountDto.initialBalance,
    });

    // this.accountRepository.save() es la magia
    // Toma el objeto 'newAccount', genera un comando SQL 'INSERT' y lo envia a la DB supabase
    // 'await' espera a que la DB confirme la operacion fue exitosa
    return this.accountRepository.save(newAccount);
  }

  // 'findAll' tambien es asincrono
  async findAll(): Promise<Account[]> {
    // this.accountRepository.find() genera un comando SQL 'SELECT * FROM account'
    // y lo envía a la base de datos. 'await' espera la respuesta con todas las filas.
    return this.accountRepository.find();
  }
}
