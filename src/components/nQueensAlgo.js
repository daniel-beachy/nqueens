let moves = [[]];
let foundSolution = false;

function nQueensAlgo(
  n,
  colSet = new Set(),
  posDiagSet = new Set(),
  negDiagSet = new Set()
) {
  moves = [[]];
  foundSolution = false;

  dfs([], n, colSet, posDiagSet, negDiagSet, 0);

  if (!foundSolution) {
    moves.push([]);
  }
  return moves;
}

const dfs = (board, n, colSet, posDiagSet, negDiagSet, row) => {
  if (foundSolution) {
    return;
  }

  if (row === n) {
    foundSolution = true;
    moves.push([...board]);
    return;
  }

  for (let col = 0; col < n; col++) {
    const newBoard = [...board, col];
    moves.push(newBoard);
    const hasQueen =
      colSet.has(col) || posDiagSet.has(row + col) || negDiagSet.has(row - col);
    if (hasQueen) continue;

    backTrack(newBoard, n, row, col, colSet, posDiagSet, negDiagSet);
    if (foundSolution) {
      return;
    }
  }
};

const backTrack = (board, n, row, col, colSet, posDiagSet, negDiagSet) => {
  colSet.add(col);
  posDiagSet.add(row + col);
  negDiagSet.add(row - col);

  dfs(board, n, colSet, posDiagSet, negDiagSet, row + 1);

  colSet.delete(col);
  posDiagSet.delete(row + col);
  negDiagSet.delete(row - col);
};

export default nQueensAlgo;
