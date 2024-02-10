import Service from './Service.js';
import { TIMEOUT } from '../helpers.js';
import { TIMEOUT_SEC } from '../config.js';

class EmailService extends Service {
  _init(handler = null) {
    handler();
  }

  async _run() {
    try {
      const sendEmailRequest = await Email.send({
        Host: this._data.host,
        Username: this._data.userName,
        Password: this._data.password,
        To: this._data.to,
        From: this._data.from,
        Subject: `${this._data.titlePrefix}${this._data.subject}`,
        Body: this._data.emailBody,
      });

      const message = await Promise.race([
        sendEmailRequest,
        TIMEOUT(TIMEOUT_SEC),
      ]);

      if (message !== 'OK') throw new Error(message);
    } catch (err) {
      console.error(`${err}`);
      throw err;
    }
  }
}

export default new EmailService();
