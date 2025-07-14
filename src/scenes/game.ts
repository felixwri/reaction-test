import * as PIXI from 'pixi.js';

export default class GameScene extends PIXI.Container {

    protected _background: PIXI.Graphics;
    protected _prompt: PIXI.Text;
    protected _timer: PIXI.Text;

    constructor() {
        // Initialize the game scene
        super();
        this.init();
    }

    protected init() {
        console.log('Game scene initialized');
        // Additional setup for the game scene can go here
        this._background = new PIXI.Graphics();
        this._background.rect(0, 0, 1920, 1080).fill(0xffcc00);
        this.addChild(this._background);

        this._prompt = new PIXI.Text({
            text: 'Ready...',
            style: new PIXI.TextStyle({
                fontSize: 150,
                fill: '#ffffff',
                align: 'center'
            })
        });
        this._prompt.anchor.set(0.5);
        this._prompt.position.set(960, 540);
        this.addChild(this._prompt);

        this._timer = new PIXI.Text({
            text: '00:00.000',
            style: new PIXI.TextStyle({
                fontSize: 50,
                fill: '#ffffff',
                align: 'left'
            })
        });
        this._timer.position.set(960, 540);
        this.addChild(this._timer);
        this._timer.visible = false;
    }
}