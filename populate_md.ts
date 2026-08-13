import * as fs from 'fs';
import * as path from 'path';

// Parse sortingCode.ts manually because importing it directly in ts-node can sometimes fail with Next.js specific aliases if any, or it might just work.
// But we can just import it directly here assuming ts-node can handle it.

const { sortingCodeBlocks } = require('./lib/sortingCode.ts');

const algorithms = Object.keys(sortingCodeBlocks);
const mdDir = path.join(__dirname, 'md_files', 'sorting');

algorithms.forEach(algo => {
  const algoDir = path.join(mdDir, algo);
  if (!fs.existsSync(algoDir)) {
    console.log(`Directory not found for ${algo}: ${algoDir}`);
    return;
  }
  
  const mdFile = path.join(algoDir, '02-implementation.md');
  const code = sortingCodeBlocks[algo];
  
  // Format the title from camelCase to Title Case
  const title = algo.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Wrapper', '');
  
  let mdContent = `---
title: Implementing ${title.trim()}
order: 2
type: lesson
---

# Code Implementations

Here is the exact implementation of **${title.trim()}** in multiple programming languages.
`;

  const languages = [
    { key: 'javascript', label: 'JavaScript', tag: 'javascript' },
    { key: 'typescript', label: 'TypeScript', tag: 'typescript' },
    { key: 'python', label: 'Python', tag: 'python' },
    { key: 'java', label: 'Java', tag: 'java' },
    { key: 'cpp', label: 'C++', tag: 'cpp' },
    { key: 'c', label: 'C', tag: 'c' },
    { key: 'go', label: 'Go', tag: 'go' },
    { key: 'php', label: 'PHP', tag: 'php' },
    { key: 'rust', label: 'Rust', tag: 'rust' }
  ];

  languages.forEach(lang => {
    if (code[lang.key]) {
      mdContent += `\n## ${lang.label}\n\`\`\`${lang.tag}\n${code[lang.key].join('\n')}\n\`\`\`\n`;
    }
  });

  fs.writeFileSync(mdFile, mdContent);
  console.log(`Updated ${mdFile}`);
});
