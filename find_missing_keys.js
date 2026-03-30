
import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('.map(')) {
    let hasKey = false;
    // Check current line and next 5 lines for 'key='
    for (let i = 0; i < 6; i++) {
      if (lines[index + i] && lines[index + i].includes('key=')) {
        hasKey = true;
        break;
      }
    }
    if (!hasKey) {
      console.log(`Line ${index + 1}: ${line.trim()}`);
      for (let i = 1; i < 4; i++) {
        if (lines[index + i]) console.log(`  +${i}: ${lines[index + i].trim()}`);
      }
    }
  }
});
