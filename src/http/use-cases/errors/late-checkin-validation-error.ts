export class LateCheckinValidationError extends Error {
  constructor() {
    // eslint-disable-next-line @stylistic/max-len
    super('The check-in can only be validatidate until 20 minutes of its creation.')
  }
}
