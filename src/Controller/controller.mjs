export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.queue();
  }

  // async queue() {
  //   await this.convert();
  //   this.render();
  // }

  async getCurrency(currencyFrom, currencyTo) {
    const response = await fetch(
      `https://api.exchangerate.host/convert?from=${currencyFrom}&to=${currencyTo}`
    );
    const data = await response.json();

    this.model.perUnit = data.result;
  }

  async convert() {
    await this.getCurrency(this.model.fromCurrency, this.model.toCurrency);
  }

  leftInput() {
    this.view.leftInput.addEventListener("keyup", (e) => {
      this.view.leftInput.classList.add("active");
      this.model.fromValue = e.target.value;
      this.render();
    });
  }

  rightInput() {
    this.view.rightInput.addEventListener("keyup", (e) => {
      this.view.leftInput.classList.remove("active");
      this.model.toValue = e.target.value;
      this.render();
    });
  }

  render() {
    // if (this.view.leftInput.className !== "converters-input") {
    this.model.rateFromTo();
    this.view.rightInput.value = this.model.toValue;
    // } else {
    this.model.rateToFrom();
    this.view.leftInput.value = this.model.fromValue;
    // }

    this.view.rightRate.innerText = `1 ${this.model.toCurrency} = ${
      Math.floor((1 / this.model.perUnit) * 10 ** 6) / 10 ** 6
    } ${this.model.fromCurrency}`;
    this.view.leftRate.innerText = `1 ${this.model.fromCurrency} = ${this.model.perUnit} ${this.model.toCurrency}`;
  }
}
