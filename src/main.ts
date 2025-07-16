import * as PIXI from 'pixi.js';
import { SceneManager } from './sceneManager';
import { AssetLoader } from './assetLoader';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application();
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
