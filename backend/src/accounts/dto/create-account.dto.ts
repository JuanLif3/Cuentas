// La palabra clave 'export' permite que ests clase sea importanda y utilizada en otros archivos de nuestro proyecto.
// 'class' es el plano para crear objetos. 'CreateAcountDto' es el nombre de nuestro plano.
export class CreateAccountDto {
  // Definimos una propiedad llamada 'name' y le asignamos el tipo 'string'
  // Esto obliga a que cualquier dato para 'name' sea un texto
  name: string;

  // Definimo una propiedad llamada 'initialBalance' y le asignamos el tipo 'number'
  // Esto obliga a que cualquier fato para 'initialBalance' sea un numero
  initialBalance: number;
}
