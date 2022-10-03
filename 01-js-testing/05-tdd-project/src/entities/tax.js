class Tax {
  static get taxesBadesOnAge() {
    return [
      { from: 18, to: 25, value: 1.1 },
      { from: 26, to: 30, value: 1.5 },
      { from: 31, to: 150, value: 1.3 },
    ];
  }
}

module.exports = Tax;
