import Board from './board';

export default class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setupGrid();


    $l(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  setupGrid() {
    let html = "";

    for (let i = 0; i < this.board.dimension; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.dimension; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }
    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  handleKeyEvent(event) {
    if (KEYS[event.keyCode]) {
      this.board.snake.turn(KEYS[event.keyCode]);
    }
  }

}

KEYS = {
  38: "N",
  39: "E",
  40: "S",
  37: "W"
}
