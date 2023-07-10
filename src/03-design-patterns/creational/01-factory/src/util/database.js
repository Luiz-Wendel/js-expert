class Database {
  constructor({ connectionString }) {
    this.connectionString = connectionString;
  }

  static async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async connect() {
    await this.sleep(100);

    return this;
  }

  async find() {
    await this.sleep(100);

    return [{ name: 'John Doe' }];
  }
}

module.exports = Database;
