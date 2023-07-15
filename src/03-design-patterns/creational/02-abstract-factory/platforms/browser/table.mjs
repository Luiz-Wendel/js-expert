/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */

import TableComponent from '../../shared/base/tableComponent.mjs';

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);
    console.log(template);
  }

  prepareData(data) {
    const [firtsItem] = data;
    const tHeaders = Object.keys(firtsItem)
      .map((text) => `<th scope=col>${text}</th>`);

    const joinLists = (list) => list.join('');

    const tBodyValues = data
      .map((item) => Object.values(item)
        .map((value) => `<td>${value}</td>`))
      .map((tds) => `<tr>${joinLists(tds)}</tr>`);

    const template = `
      <table class="table table-striped">
        <thead>
          <tr>
            ${joinLists(tHeaders)}
          </tr>
        </thead>
        <tbody>
          ${joinLists(tBodyValues)}
        </tbody>
      </table>
    `;

    return template;
  }
}
