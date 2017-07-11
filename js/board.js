import Snake from './snake';

export default class Board {
  constructor(dimension) {
    this.dimension = dimension;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }
}
