import * as PIXI from 'pixi.js';
import IdleScene from './scenes/idle';
import GameScene from './scenes/game';

const app = new PIXI.Application();
await app.init({
  resizeTo: window,
  backgroundColor: 0x111111,
});

document.body.appendChild(app.canvas);

const idleScene = new IdleScene();
app.stage.addChild(idleScene);

const gameScene = new GameScene();
app.stage.addChild(gameScene);
gameScene.visible = false;