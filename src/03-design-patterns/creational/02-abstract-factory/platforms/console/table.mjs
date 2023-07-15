/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */

import chalk from 'chalk';
import chalkTable from 'chalk-table';

import TableComponent from '../../shared/base/tableComponent.mjs';

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareData(data);
    const options = {
      leftPad: 2,
      columns,
    };
    const table = chalkTable(options, data);

    console.log(table);
  }

  prepareData(data) {
    const [firtsItem] = data;
    const headers = Object.keys(firtsItem);

    const formatHeader = (item, index) => (
      index % 2 === 0
        ? chalk.yellow(item)
        : chalk.green(item)
    );

    const columns = headers.map((item, index) => ({
      field: item,
      name: formatHeader(item, index),
    }));

    return columns;
  }
}
