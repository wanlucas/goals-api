export default class DateTime extends Date {
  constructor() {
    super();
  }

  public endOfDay(): Date {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 23, 59, 59, 999);
  }

  public startOfDay(): Date {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0);
  }

  public toYearMonthDay() {
    const date = this.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short' });
    return date.split('/').reverse().join('-');
  }
}