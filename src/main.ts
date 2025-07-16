import {Application} from 'pixi.js';
import { SceneManager } from './sceneManager';
import { AssetLoader } from './assetLoader';

const app = new Application();
await app.init({
  resizeTo: window,
  antialias: true,
  autoDensity: true,
  resolution: window.devicePixelRatio || 1,
  backgroundColor: 0x111111,
});

document.body.appendChild(app.canvas);

await AssetLoader.loadAssets();

const sceneManager = new SceneManager(app);

sceneManager.init();