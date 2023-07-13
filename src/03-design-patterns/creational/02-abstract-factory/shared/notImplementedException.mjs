export default class NotImplementedException extends Error {
  constructor(message = 'Not implemented') {
    super(`the "${message}" method is not implemented`);
    this.name = 'NotImplementedException';
  }
}
