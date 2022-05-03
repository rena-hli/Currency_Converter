export default class View {
  constructor() {
    this.leftInput = document.getElementById("left-input");
    this.rightInput = document.getElementById("right-input");

    this.fromLeft = document.querySelectorAll("input[name='from-left']");
    this.toRight = document.querySelectorAll("input[name='to-right']");

    this.leftRate = document.getElementById("left-rate");
    this.rightRate = document.getElementById("right-rate");
  }
}
