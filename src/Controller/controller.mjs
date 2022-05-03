export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.init();
    this.convert();
    this.render();
    this.leftInput();
    this.rightInput();
  }

  async getCurrency(currencyFrom, currencyIn) {
    const response = await fetch(
      `https://api.exchangerate.host/latest?base=${currencyFrom}&symbols=${currencyIn}`
    );
    const data = await response.json();

    return Object.values(data.rates)[0];
  }

  convert() {
    const tempArr = this.model.tempArr;
    Promise.all([
      this.getCurrency(tempArr[0].rate, tempArr[1].rate),
      this.getCurrency(tempArr[1].rate, tempArr[0].rate),
    ]).then((data) => {
      tempArr[0].perUnit = data[0];
      tempArr[1].perUnit = data[1];
    });
  }

  leftInput() {
    this.view.leftInput.addEventListener("keyup", (e) => {
      this.view.leftInput.classList.add("active");
      this.model.tempArr[0].summ = e.target.value;
      this.render();
    });
  }

  rightInput() {
    this.view.rightInput.addEventListener("keyup", (e) => {
      this.view.leftInput.classList.remove("active");
      this.model.tempArr[1].summ = e.target.value;
      this.render();
    });
  }

  render() {
    this.view.leftButtons.innerHTML = "";
    this.view.rightButtons.innerHTML = "";
    const tempArr = this.model.tempArr;
    this.model.checkedCange();

    setTimeout(() => {
      if (this.view.leftInput.className === "converters-input active") {
        this.model.rate();
        this.view.rightInput.value = tempArr[1].summ;
      } else {
        this.model.rate2();
        this.view.leftInput.value = tempArr[0].summ;
      }
      this.view.leftRate.innerText = `1 ${tempArr[0].rate} = ${tempArr[0].perUnit} ${tempArr[1].rate}`;
      this.view.rightRate.innerText = `1 ${tempArr[1].rate} = ${tempArr[1].perUnit} ${tempArr[0].rate}`;
    }, 100);

    this.model.arrLeft.forEach((el, index) => {
      const input = this.view.createInput({
        type: "radio",
        name: "currency",
        class: "checked-inputs",
        id: index,
        checked: el.checked,
      });

      const label = this.view.createLabel({
        text: el.rate,
        class: "checked-labels",
        for: index,
      });

      input.addEventListener("click", (e) => {
        tempArr[0].rate = label.innerText;
        this.convert();
        this.render();
      });

      this.view.leftButtons.append(input);
      this.view.leftButtons.append(label);
    });

    this.model.arrRight.forEach((el, index) => {
      const input = this.view.createInput({
        type: "radio",
        name: "currency-2",
        class: "checked-inputs",
        id: `input-${index}`,
        checked: el.checked,
      });

      const label = this.view.createLabel({
        text: el.rate,
        class: "checked-labels",
        for: `input-${index}`,
      });

      input.addEventListener("click", (e) => {
        tempArr[1].rate = label.innerText;

        this.convert();
        this.render();
      });

      this.view.rightButtons.append(input);
      this.view.rightButtons.append(label);
    });
  }
}
