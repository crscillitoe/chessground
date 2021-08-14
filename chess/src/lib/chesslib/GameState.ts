/**
 * `GameState` will be used to indicate to the
 * client(s) whether or not a game has been
 * concluded, and how.
 */
export enum GameState {
  // White has won, via one of the special conditions in this mode.
  WHITE_WIN_VARIANT,

  // White has won, via good ol' checkmate.
  WHITE_WIN_CHECKMATE,

  // Black has won, via one of the special conditions in this mode.
  BLACK_WIN_VARIANT,

  // Black has won, via good ol' checkmate.
  BLACK_WIN_CHECKMATE,

  // The game has ended in a draw, the current player has no legal moves and is not in check.
  DRAW,

  // The game has ended in a draw because of some special condidtion in this mode.
  DRAW_VARIANT,

  // The game is not over, it is in progress, and it is white's turn
  IN_PROGRESS_WHITE_TURN,

  // The game is not over, it is in progress, and it is black's turn
  IN_PROGRESS_BLACK_TURN
}
