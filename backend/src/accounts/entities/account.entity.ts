// Primero importamos los decoradores que vamos a usar desde la librereia 'typeorm'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity(): Este decorador marca la clase 'Accoun' como un aentidad
// TypeORM ahora sabe que debe crear una tabla llamada 'account' (en minusculas) en nuestra DB
@Entity()
export class Account {
  // @PrimaryGeneratedColumn(): Designa a la propiedad 'id' como la columna de clave primaria.
  // La base de datos (PostgreSQL) se encargará de asignarle un número único y creciente a cada nueva cuenta.
  @PrimaryGeneratedColumn()
  id: number;

  // @Column(): Marca 'name' como una columna regular.
  // TypeORM es lo suficientemente inteligente para saber que si el tipo en TypeScript es 'string',
  // el tipo de columna en PostgreSQL debe ser 'character varying' (o VARCHAR).
  @Column()
  name: string;

  // @Column({ ... }): Aquí somos más específicos con la configuración.
  // 'type: 'decimal'' es el mejor tipo de dato para manejar dinero, ya que previene errores de redondeo.
  // 'precision: 10' indica que el número puede tener hasta 10 dígitos en total.
  // 'scale: 2' indica que 2 de esos dígitos estarán después del punto decimal (ej. 12345678.90).
  // 'default: 0' asegura que si no especificamos un valor, se guardará como 0.
  @Column({ type: 'decimal', precision: 10, scale: 3, default: 0 })
  initialBalance: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, default: 0 })
  currentBalance: number;
}
