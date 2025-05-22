// nQueensGeneticAlgo.js
// Implementation of a genetic algorithm for N-Queens problem

// Moves will store all states for visualization
let moves = [[]];
// Track the current generation
let currentGeneration = 0;

/**
 * Get the current generation number
 * @returns {number} - Current generation
 */
export function getCurrentGeneration() {
  return currentGeneration;
}

/**
 * Main function to solve N-Queens problem using genetic algorithm
 * @param {number} n - Board size
 * @param {number} populationSize - Size of the population (default: 100)
 * @param {number} maxGenerations - Maximum generations to run (default: 1000)
 * @param {number} selectionRate - Percentage of top solutions to keep (default: 0.5)
 * @param {number} mutationRate - Probability of mutation (default: 0.1)
 * @returns {Array} moves - Array of board states for visualization
 */
function nQueensGeneticAlgo(
  n,
  populationSize = 100,
  maxGenerations = 1000,
  selectionRate = 0.5,
  mutationRate = 0.1
) {
  // Reset moves array and generation counter
  moves = [[]];
  currentGeneration = 0;
  
  // Generate initial population
  let population = generateInitialPopulation(n, populationSize);
  
  // Main loop
  for (let generation = 0; generation < maxGenerations; generation++) {
    // Update current generation
    currentGeneration = generation + 1;
    
    // Evaluate fitness
    const fitnessScores = population.map(solution => calculateFitness(solution));
    
    // Sort population by fitness for visualization and selection
    const sortedIndices = Array.from({ length: population.length }, (_, i) => i)
      .sort((a, b) => fitnessScores[b] - fitnessScores[a]);
    
    // Find best solution for this generation
    const bestIndex = sortedIndices[0];
    const bestSolution = population[bestIndex];
    const bestFitness = fitnessScores[bestIndex];
    
    // Record move for visualization
    moves.push([...bestSolution]);
    
    // Check if we found a solution
    if (bestFitness === getMaxFitness(n)) {
      // If found, record the solution a few more times to make it visible in the animation
      for (let i = 0; i < 10; i++) {
        moves.push([...bestSolution]);
      }
      return moves;
    }
    
    // Selection - get the top solutions based on fitness
    const selectedParents = sortedIndices
      .slice(0, Math.max(2, Math.floor(populationSize * selectionRate)))
      .map(index => population[index]);
    
    // Create new generation through crossover and mutation
    population = breed(selectedParents, populationSize, n, mutationRate);
  }
  
  // If we get here, we've reached max generations without finding a solution
  // Return the best solution we found in the last generation
  const lastFitnessScores = population.map(solution => calculateFitness(solution));
  const lastBestIndex = lastFitnessScores.indexOf(Math.max(...lastFitnessScores));
  const lastBestSolution = population[lastBestIndex];
  
  // Add the final best solution a few more times to make it visible
  for (let i = 0; i < 10; i++) {
    moves.push([...lastBestSolution]);
  }
  
  return moves;
}

/**
 * Generate initial random population
 * @param {number} n - Board size
 * @param {number} size - Population size
 * @returns {Array} population - Array of random solutions
 */
function generateInitialPopulation(n, size) {
  const population = [];
  for (let i = 0; i < size; i++) {
    population.push(generateRandomSolution(n));
  }
  return population;
}

/**
 * Generate a random solution
 * @param {number} n - Board size
 * @returns {Array} solution - Random solution
 */
function generateRandomSolution(n) {
  const solution = [];
  for (let i = 0; i < n; i++) {
    solution.push(Math.floor(Math.random() * n));
  }
  return solution;
}

/**
 * Calculate the fitness of a solution
 * @param {Array} solution - Queen positions
 * @returns {number} fitness - Number of non-attacking queen pairs
 */
function calculateFitness(solution) {
  const n = solution.length;
  let nonAttackingPairs = 0;
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Check if queens are not attacking each other
      if (
        solution[i] !== solution[j] && // Not in same column
        Math.abs(solution[i] - solution[j]) !== Math.abs(i - j) // Not in same diagonal
      ) {
        nonAttackingPairs++;
      }
    }
  }
  
  return nonAttackingPairs;
}

/**
 * Get the maximum possible fitness for a board of size n
 * @param {number} n - Board size
 * @returns {number} maxFitness - Maximum possible fitness
 */
function getMaxFitness(n) {
  // Maximum fitness is the number of possible pairs of queens
  return (n * (n - 1)) / 2;
}

/**
 * Select parents for breeding based on fitness - Not used directly anymore
 * @param {Array} population - Current population
 * @param {Array} fitnessScores - Fitness scores for population
 * @param {number} selectionRate - Percentage of top solutions to keep
 * @returns {Array} selectedParents - Selected parents for breeding
 */
function selectParents(population, fitnessScores, selectionRate) {
  // Create indices array
  const indices = Array.from({ length: population.length }, (_, i) => i);
  
  // Sort indices by fitness (descending)
  indices.sort((a, b) => fitnessScores[b] - fitnessScores[a]);
  
  // Select top percentage
  const numToSelect = Math.max(2, Math.floor(population.length * selectionRate));
  const selectedIndices = indices.slice(0, numToSelect);
  
  // Return selected parents
  return selectedIndices.map(index => population[index]);
}

/**
 * Breed new generation from parents
 * @param {Array} parents - Selected parents
 * @param {number} populationSize - Size of the population
 * @param {number} n - Board size
 * @param {number} mutationRate - Probability of mutation
 * @returns {Array} newPopulation - New generation
 */
function breed(parents, populationSize, n, mutationRate) {
  const newPopulation = [...parents]; // Keep parents in new generation
  
  // Generate children until we reach populationSize
  while (newPopulation.length < populationSize) {
    // Select two random parents
    const parent1 = parents[Math.floor(Math.random() * parents.length)];
    const parent2 = parents[Math.floor(Math.random() * parents.length)];
    
    // Perform crossover
    const child = crossover(parent1, parent2);
    
    // Perform mutation
    if (Math.random() < mutationRate) {
      mutate(child, n);
    }
    
    // Add to new population
    newPopulation.push(child);
  }
  
  return newPopulation;
}

/**
 * Perform crossover between two parents
 * @param {Array} parent1 - First parent
 * @param {Array} parent2 - Second parent
 * @returns {Array} child - Child solution
 */
function crossover(parent1, parent2) {
  const n = parent1.length;
  const child = [];
  
  // Single-point crossover
  const crossoverPoint = Math.floor(Math.random() * n);
  
  for (let i = 0; i < n; i++) {
    if (i < crossoverPoint) {
      child.push(parent1[i]);
    } else {
      child.push(parent2[i]);
    }
  }
  
  return child;
}

/**
 * Mutate a solution
 * @param {Array} solution - Solution to mutate
 * @param {number} n - Board size
 * @returns {Array} solution - Mutated solution
 */
function mutate(solution, n) {
  // Pick a random position and change its value
  const position = Math.floor(Math.random() * n);
  const newValue = Math.floor(Math.random() * n);
  
  solution[position] = newValue;
  
  return solution;
}

export default nQueensGeneticAlgo;