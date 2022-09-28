const { readFile } = require('fs/promises')
const { join } = require('path')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
}

class File {
  static async csvToJson(filePath) {
    const content =  await File.getFileContent(filePath)

    const validation = File.isValid(content)

    if (!validation.valid) throw new Error(validation.error)

    return content
  }

  static async getFileContent(filePath) {
    const filename = join(__dirname, filePath)

    return (await readFile(filename)).toString('utf8')
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ..._lines] = csvString.split('\n')

    const isHeaderValid = header === options.fields.join(',')
    if (!isHeaderValid) {
      return {
        valid: false,
        error: error.FILE_FIELDS_ERROR_MESSAGE,
      }
    }
  }
}

(async () => {
  const result = await File.csvToJson('./../mocks/header-invalid.csv')

  console.log(result);
})()
