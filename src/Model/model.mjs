export default class Model {
    constructor() {
      this.arrLeft = [
        { rate: "RUB", checked: "checked" },
        { rate: "USD", checked: "" },
        { rate: "TRY", checked: "" },
        { rate: "AZN", checked: "" },
      ];

      this.arrRight = [
        { rate: "RUB", checked: "" },
        { rate: "USD", checked: "checked" },
        { rate: "TRY", checked: "" },
        { rate: "AZN", checked: "" },
      ];
      
      this.tempArr = [
        { rate: "RUB", summ: "1", perUnit: "" },
        { rate: "USD", summ: "", perUnit: "" },
      ];
    }
  
    checkedCange() {
      this.arrLeft.forEach((el) => {
        this.tempArr[0].rate === el.rate? (el.checked = "checked") : (el.checked = "");
      });
  
      this.arrRight.forEach((el) => {
        this.tempArr[1].rate === el.rate? (el.checked = "checked") : (el.checked = "");
      });
    }
  
    rate() {
      this.tempArr[1].summ = this.tempArr[0].perUnit * this.tempArr[0].summ;
    }
  
    rate2() {
      this.tempArr[0].summ = this.tempArr[1].perUnit * this.tempArr[1].summ;
    }
  }