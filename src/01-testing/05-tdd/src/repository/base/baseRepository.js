class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async find(itemId) {
    const content = await this.file.getContent();

    if (!itemId) return content;

    return content.find(({ id }) => id === itemId);
  }
}

module.exports = BaseRepository;
