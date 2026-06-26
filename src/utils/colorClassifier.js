import NeuralNetwork from 'brain.js/dist/neural-network';

const network = new NeuralNetwork();

// Training data: input is background color (normalized 0-1), 
// output is the desired menu color ('light' or 'dark')
network.train([
  // ONLY pure white background -> dark menu
  { input: { r: 1, g: 1, b: 1 }, output: { dark: 1 } },
  
  // Any other color -> light menu
  { input: { r: 0, g: 0, b: 0 }, output: { light: 1 } },
  { input: { r: 0.5, g: 0.5, b: 0.5 }, output: { light: 1 } },
  { input: { r: 0, g: 0, b: 0.5 }, output: { light: 1 } },
  { input: { r: 0.5, g: 0, b: 0 }, output: { light: 1 } },
  
  // Specific colors from the project
  { input: { r: 0.53, g: 0.81, b: 0.92 }, output: { light: 1 } }, // #87ceeb (--light-blue)
  { input: { r: 0.72, g: 0.89, b: 0.96 }, output: { light: 1 } }, // #b8e3f5 (--sky-blue)
  
  // Both pure white and off-white should have a DARK menu (for contrast and consistency)
  { input: { r: 0.98, g: 0.98, b: 0.98 }, output: { dark: 1 } }, // #fafafa (--off-white)
  
  // Even very light colors should be white menu unless they are very close to white
  { input: { r: 0.9, g: 1, b: 0.9 }, output: { light: 1 } },
]);

/**
 * Classifies whether a background color should have a light or dark menu on top.
 * @param {number} r 0-255
 * @param {number} g 0-255
 * @param {number} b 0-255
 * @returns {'light' | 'dark'}
 */
export const classifyColor = (r, g, b) => {
  const result = network.run({ r: r / 255, g: g / 255, b: b / 255 });
  return result.light > result.dark ? 'light' : 'dark';
};
