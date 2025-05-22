/**
 * Array to store all positions during the backtracking process for animation
 * Each element in moves represents a board state in the solving process
 */
let moves = [[]];

/**
 * Flag to track if a solution has been found
 */
let foundSolution = false;

/**
 * Solves the N-Queens problem using backtracking algorithm
 * 
 * @param {number} n - Size of the chessboard (N×N) and number of queens to place
 * @param {Set} colSet - Set to track occupied columns
 * @param {Set} posDiagSet - Set to track occupied positive diagonals (row + col)
 * @param {Set} negDiagSet - Set to track occupied negative diagonals (row - col)
 * @returns {Array} - Array of board states for animation
 */
function nQueensAlgo(
  n,
  colSet = new Set(),
  posDiagSet = new Set(),
  negDiagSet = new Set()
) {
  // Reset state for new solution
  moves = [[]];
  foundSolution = false;

  // Start backtracking from the first row
  dfs([], n, colSet, posDiagSet, negDiagSet, 0);

  // If no solution found, add empty board to moves
  if (!foundSolution) {
    moves.push([]);
  }
  return moves;
}

/**
 * Depth-first search implementation of backtracking algorithm
 * 
 * @param {Array} board - Current board state (array of column positions)
 * @param {number} n - Board size
 * @param {Set} colSet - Set of occupied columns
 * @param {Set} posDiagSet - Set of occupied positive diagonals
 * @param {Set} negDiagSet - Set of occupied negative diagonals
 * @param {number} row - Current row being processed
 */
const dfs = (board, n, colSet, posDiagSet, negDiagSet, row) => {
  // Stop if solution already found
  if (foundSolution) {
    return;
  }

  // If all queens are placed successfully
  if (row === n) {
    foundSolution = true;
    moves.push([...board]);
    return;
  }

  // Try placing queen in each column of the current row
  for (let col = 0; col < n; col++) {
    const newBoard = [...board, col];
    
    // Add current attempt to moves for animation
    moves.push(newBoard);
    
    // Check if current position is under attack
    const hasQueen =
      colSet.has(col) || posDiagSet.has(row + col) || negDiagSet.has(row - col);
    if (hasQueen) continue;

    // Place queen and continue to next row
    backTrack(newBoard, n, row, col, colSet, posDiagSet, negDiagSet);
    if (foundSolution) {
      return;
    }
  }
};

/**
 * Helper function to place a queen, explore, and backtrack if needed
 * 
 * @param {Array} board - Current board state
 * @param {number} n - Board size
 * @param {number} row - Current row
 * @param {number} col - Current column
 * @param {Set} colSet - Set of occupied columns
 * @param {Set} posDiagSet - Set of occupied positive diagonals
 * @param {Set} negDiagSet - Set of occupied negative diagonals
 */
const backTrack = (board, n, row, col, colSet, posDiagSet, negDiagSet) => {
  // Mark current position as occupied
  colSet.add(col);
  posDiagSet.add(row + col);
  negDiagSet.add(row - col);

  // Move to next row
  dfs(board, n, colSet, posDiagSet, negDiagSet, row + 1);

  // Backtrack: remove queen if solution not found
  colSet.delete(col);
  posDiagSet.delete(row + col);
  negDiagSet.delete(row - col);
};

export default nQueensAlgo;
