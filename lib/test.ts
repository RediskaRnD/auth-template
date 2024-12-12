import * as fs from 'fs';
import * as path from 'path';

// Function to extract IDs from the file
function extractIDsFromFile(filePath: string, outputFilePath: string): void {
  // Read the content of the file
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Regular expression to match the ID inside id="..."
  const idRegex = /id="([^"]+)"/g;

  let match;
  const ids: string[] = [];

  // Find all matches of the ID in the content
  while ((match = idRegex.exec(fileContent)) !== null) {
    if (match[1]) {
      ids.push(match[1]); // match[1] contains the ID
    }
  }

  // Write the IDs to the output file
  fs.writeFileSync(outputFilePath, ids.join('\n'), 'utf-8');
  console.log(`Extracted ${ids.length} IDs and saved to ${outputFilePath}`);
}

// Paths for input and output files
const inputFilePath = path.join(__dirname, 'input.txt');
const outputFilePath = path.join(__dirname, 'output_ids.txt');

// Call the function
// extractIDsFromFile(inputFilePath, outputFilePath);
console.log('liaw');
