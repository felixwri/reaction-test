import * as PIXI from 'pixi.js';

export default class IdleScene extends PIXI.Container {

    protected _background: PIXI.Graphics;
    protected _title: PIXI.Text;
    protected _prompt: PIXI.Text;

    constructor() {
        // Initialize the idle scene
        super();
        this.init();
    }

    protected init() {
        console.log('Idle scene initialized');
        // Additional setup for the idle scene can go here
        this._background = new PIXI.Graphics();
        this._background.rect(0, 0, 1920, 1080).fill(0xff9933);
        this.addChild(this._background);

        this._title = new PIXI.Text({
            text: 'Reaction Test',
            style: new PIXI.TextStyle({
                fontSize: 200,
                fill: '#ffffff',
                align: 'center'
            })
        });
        this._title.anchor.set(0.5);
        this._title.position.set(960, 540);
        this.addChild(this._title);

        this._prompt = new PIXI.Text({
            text: 'Click to start',
            style: new PIXI.TextStyle({
                fontSize: 50,
                fill: '#ffffff',
                align: 'center'
            })
        });
        this._prompt.anchor.set(0.5);
        this._prompt.position.set(960, 950);
        this.addChild(this._prompt);
    }
}