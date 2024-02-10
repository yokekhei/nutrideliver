export default class Service {
  _data;

  init(handler = null) {
    this._init(handler);
  }

  async run(data) {
    try {
      this._data = data;
      await this._run();
    } catch (err) {
      console.error(`${err}`);
      throw err;
    }
  }
}
