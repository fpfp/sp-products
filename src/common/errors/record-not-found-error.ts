export class RecordNotFoundError extends Error {
  constructor(id?: string | number) {
    super(`The requested record ${id} was not found.`);
    this.name = 'RecordNotFoundError';
  }
}
