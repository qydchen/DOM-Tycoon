import Coord from './coord.js';

const DIRECTION = {
  "N": new Coord(-1, 0),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0),
  "W": new Coord(0, -1)
};

export default class Snake {
  constructor(board) {
    this.direction = 'N';
    this.turning = false;
    this.board = board;

    const center = new Coord(Math.floor(board.dim/2), Math.floor(board.dim/2));
    this.segments = [center];
  }

  turn(direction) {
    // prevent opposite turning
    if (DIRECTION[this.direction].isOpposite(DIRECTION[this.direction]) ||
      this.turning) {
        return;
      } else {
        this.turning = true;
        this.direction = direction;
      }
    }


  move() {
    //move in the same direction
    this.segments.push(this.head().plus(DIRECTION[this.direction]));
    // allow turning
    this.turning = false;

  }
}
