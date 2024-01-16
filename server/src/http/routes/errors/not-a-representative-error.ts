export class NotARepresentativeError extends Error {
  constructor() {
    super('User is not a business representative.')
  }
}
