import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

async function calculateSize(dir) {
  let total = 0;
  const files = await readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const path = join(dir, file.name);
    
    // Skip node_modules and dist
    if (file.name === 'node_modules' || file.name === 'dist') continue;
    
    if (file.isDirectory()) {
      total += await calculateSize(path);
    } else if (file.name.match(/\.(js|jsx|ts|tsx|css|html|md)$/)) {
      const stats = await stat(path);
      total += stats.size;
    }
  }
  
  return total;
}

calculateSize('/home/project').then(size => {
  console.log('\nProject Code Size Analysis:');
  console.log('-------------------------');
  console.log(`Total size: ${(size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Size in KB: ${(size / 1024).toFixed(2)} KB`);
  console.log(`Size in bytes: ${size.toLocaleString()} bytes`);
}).catch(console.error);