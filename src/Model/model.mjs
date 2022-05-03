export default class Model {
  constructor() {
    this.arrLeft = [
      { rate: "RUB" },
      { rate: "USD" },
      { rate: "TRY" },
      { rate: "AZN" },
    ];

    this.arrRight = [
      { rate: "RUB" },
      { rate: "USD" },
      { rate: "TRY" },
      { rate: "AZN" },
    ];

    this.perUnit = null;

    this.fromCurrency = "RUB";

    this.toCurrency = "USD";

    this.fromValue = 1;

    this.toValue = null;
  }

  fromTo() {
    this.toValue = this.perUnit * this.fromValue;
  }

  toFrom() {
    this.fromValue = (1 / this.perUnit) * this.toValue;
  }
}
