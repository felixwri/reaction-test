import { Application } from 'pixi.js';
import IdleScene from './scenes/idle';
import GameScene from './scenes/game';
import { BaseScene } from './scenes/baseScene';
import ResultsScene from './scenes/results';
import { SceneRouter } from './components/sceneRouter';
import { Routes } from './constants/routes';

export class SceneManager {
    private _idleScene: BaseScene;
    private _gameScene: BaseScene;
    private _resultsScene: BaseScene;

    private _router: SceneRouter;

    constructor(app: Application) {
        this._idleScene = new IdleScene();
        this._gameScene = new GameScene();
        this._resultsScene = new ResultsScene();

        this._router = new SceneRouter();

        app.stage.addChild(this._resultsScene);
        this._resultsScene.visible = false;

        app.stage.addChild(this._gameScene);
        this._gameScene.visible = false;

        app.stage.addChild(this._idleScene);
    }

    public init() {
        this._router.add(Routes.idle, () => {
            this._idleScene.start();
        });
        this._router.add(Routes.game, () => {
            this._gameScene.start();
        });
        this._router.add(Routes.results, (reactionTime) => {
            this._resultsScene.start(reactionTime);
        });

        this._idleScene.router = this._router;
        this._gameScene.router = this._router;
        this._resultsScene.router = this._router;
    }
}
