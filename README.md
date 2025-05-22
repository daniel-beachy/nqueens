# N-Queens Visualization

A React application for visualizing solutions to the classic N-Queens problem with an animated backtracking algorithm.

![N-Queens Screenshot](https://user-images.githubusercontent.com/your-username/nqueens/main/screenshot.png)

## What is the N-Queens Problem?

The N-Queens puzzle is the problem of placing N chess queens on an N×N chessboard so that no two queens threaten each other. Thus, a solution requires that no two queens share the same row, column, or diagonal.

## Features

- Interactive chessboard visualization
- Backtracking algorithm visualization
- Adjustable board size (1-20)
- Three animation speed options:
  - Slow (snail)
  - Normal (rabbit)
  - Fast (rocket)
- Estimated animation time display
- Responsive design that works on various screen sizes

## How to Use

1. Set the board size by entering a number between 1-20 in the input field.
2. Select your preferred animation speed using the animal icons:
   - 🐌 Slow: Good for understanding each step
   - 🐇 Normal: Balanced speed
   - 🚀 Fast: Quick visualization
3. Click "Solve" to start the algorithm visualization.
4. Click "Clear" to reset the board and try again.

## Algorithm

This application uses a backtracking algorithm to find a solution to the N-Queens problem:

1. Start in the leftmost column
2. If all queens are placed, return the solution
3. Try all rows in the current column
4. For each row:
   - If the queen can be placed safely, mark this position
   - Recursively try to place the rest of the queens
   - If that leads to a solution, return the solution
   - If not, backtrack and try other rows
5. If no row works, return false (no solution exists)

## Installation and Setup

### Prerequisites

- Node.js and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/daniel-beachy/nqueens.git
cd nqueens

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment

This project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

## Technologies Used

- React
- React Bootstrap
- SCSS for styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Created by Daniel Beachy.

---

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*
