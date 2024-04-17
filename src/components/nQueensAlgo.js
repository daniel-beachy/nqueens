let moves = [""];
let foundSolution = false;

function nQueensAlgo(
  n,
  colSet = new Set(),
  posDiagSet = new Set(),
  negDiagSet = new Set()
) {
  moves = [""];
  foundSolution = false;

  dfs("", n, colSet, posDiagSet, negDiagSet, 0);

  if (!foundSolution) {
    moves.push("");
  }
  return moves;
}

const dfs = (board, n, colSet, posDiagSet, negDiagSet, row) => {
  if (foundSolution) {
    return;
  }

  if (row === n) {
    foundSolution = true;
    return;
  }

  for (let col = 0; col < n; col++) {
    moves.push(board + String(col));
    const hasQueen =
      colSet.has(col) || posDiagSet.has(row + col) || negDiagSet.has(row - col);
    if (hasQueen) continue;

    backTrack(board, n, row, col, colSet, posDiagSet, negDiagSet);
    if (foundSolution) {
      return;
    }
  }
};

const backTrack = (board, n, row, col, colSet, posDiagSet, negDiagSet) => {
  colSet.add(col);
  posDiagSet.add(row + col);
  negDiagSet.add(row - col);
  board += String(col);

  dfs(board, n, colSet, posDiagSet, negDiagSet, row + 1);

  colSet.delete(col);
  posDiagSet.delete(row + col);
  negDiagSet.delete(row - col);
  board = board.substring(0, board.length - 1);
};

export default nQueensAlgo;
