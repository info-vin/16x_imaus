import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const yamlPath = path.resolve('design-docs.yaml');
const fileContent = fs.readFileSync(yamlPath, 'utf8');
const structure = yaml.load(fileContent);

function createStructure(basePath, data) {
  for (const [name, value] of Object.entries(data)) {
    const targetPath = path.join(basePath, name);

    if (name.endsWith('.md')) {
      // 建檔案
      fs.mkdirSync(basePath, { recursive: true });
      const description = value?.description || '';
      const content = `<!-- ${description} -->\n`;
      if (!fs.existsSync(targetPath)) {
        fs.writeFileSync(targetPath, content);
      } else {
        const oldContent = fs.readFileSync(targetPath, 'utf8');
        const updatedContent = oldContent.replace(/^<!--.*?-->\n?/s, content);
        fs.writeFileSync(targetPath, updatedContent);
      }
    } else {
      // 建資料夾
      fs.mkdirSync(targetPath, { recursive: true });
      createStructure(targetPath, value);
    }
  }
}

createStructure('.', structure);
console.log('✅ design-docs 資料夾與檔案生成完成！');
