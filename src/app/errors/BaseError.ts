export class BaseError extends Error {
  constructor(
      public name: string,
      public statusCode: number,
      public description: string) {
    super(description);
  }
}
