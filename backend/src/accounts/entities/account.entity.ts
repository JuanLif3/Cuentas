// Esta clse define la 'forma' que tendrá un objeto de cuenta dentro de nuestro sistema.
export class Account {
  id: number; // Cada cuenta tendrá un identificador numérico.
  name: string; // El nombre de la cuenta, como "Ahorros" o "Tarjeta de Crédito".
  initialBalance: number; // El saldo con el que se creó la cuenta.
  currentBalance: number; // El saldo actual, que cambiará con las transacciones.
}
