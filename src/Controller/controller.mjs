export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.render();
    this.getAPI();
  }

  render() {
    this.view.fromLeft.forEach((el) => {
      el.addEventListener("click", (event) => {
        this.model.fromCurrency = event.target.value;
        this.getAPI();
      });
    });

    this.view.toRight.forEach((el) => {
      el.addEventListener("click", (event) => {
        this.model.toCurrency = event.target.value;
        this.getAPI();
      });
    });

    this.refreshInputs();
  }

  refreshInputs() {
    this.view.leftInput.addEventListener("keyup", () => {
      this.view.leftInput.value = this.view.leftInput.value;
      this.view.rightInput.value = this.data * this.view.leftInput.value;
    });

    this.view.rightInput.addEventListener("keyup", () => {
      this.view.rightInput.value = this.view.rightInput.value;
      this.view.leftInput.value = this.view.rightInput.value * (1 / this.data);
    });
  }

  getAPI() {
    fetch(
      `https://api.exchangerate.host/convert?from=${this.model.fromCurrency}&to=${this.model.toCurrency}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.data = data.result;
        this.view.leftRate.innerText = `1 ${this.model.fromCurrency} = ${this.data} ${this.model.toCurrency} `;
        this.view.rightRate.innerText = `1 ${this.model.toCurrency} = ${
          Math.floor((1 / this.data) * 10 ** 6) / 10 ** 6
        } ${this.model.fromCurrency}`;
        this.view.rightInput.value = this.data * this.view.leftInput.value;
      });
  }
}
