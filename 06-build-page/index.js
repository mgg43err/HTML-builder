const path = require('path');
const {readFile, writeFile, readdir, copyFile, mkdir} = require('fs/promises');

const pathDistDir = path.resolve(__dirname, 'project-dist');
const pathTemplate = path.resolve(__dirname, 'template.html');
const pathComponents = path.resolve(__dirname, 'components');
const dirAssets = 'assets';
const pathStyles = path.resolve(__dirname, 'styles');

async function createDistDir(fs) {
  await mkdir(pathDistDir, {recursive: true});

  fs();
}

async function createHtml() {
  let template = await readFile(pathTemplate, {encoding: 'utf-8'});

  const components = template.matchAll(/{{(.+?)}}/g);

  for (let component of components) {
    const newComponent = await readFile(
      path.join(pathComponents, component[1] + '.html'), {encoding: 'utf-8'}
    );

    template = template.replace(component[0], newComponent);
  }

  await writeFile(path.resolve(pathDistDir, 'index.html'), template);
}

async function copyAssets(dirAssets) {
  await mkdir(path.resolve(__dirname, pathDistDir, dirAssets), { recursive: true });
  const assets = await readdir(path.resolve(__dirname, dirAssets), { withFileTypes: true });

  for (let asset of assets) {
    if (asset.isDirectory()) {
      await copyAssets(path.join(dirAssets, asset.name));
    } else {
      await copyFile(path.resolve(__dirname, dirAssets, asset.name),
        path.resolve(__dirname, pathDistDir, dirAssets, asset.name)
      );
    }
  }
}

async function mergeStyles() {
  const styles = await readdir(pathStyles, {withFileTypes: true});

  const filteredCss = styles.filter(item => {
    if (item.isDirectory()) return false;
    return path.extname(item.name).toLowerCase() === '.css';
  });

  const style = [];
  for (let i = 0; i < filteredCss.length; i++) {
    style[i] = await readFile(path.resolve(pathStyles, filteredCss[i].name), {encoding: 'utf-8'});
  }

  await writeFile(path.resolve(pathDistDir, 'style.css'), style.join(''));
}

createDistDir(() => {
  createHtml();
  mergeStyles();
  copyAssets(dirAssets);
});
