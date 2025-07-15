import * as PIXI from 'pixi.js';
import { BaseScene } from './baseScene';
import { Routes } from '../constants/routes';

export default class IdleScene extends BaseScene{
    protected _background: PIXI.Graphics;
    protected _title: PIXI.Text;
    protected _prompt: PIXI.Text;

    constructor() {
        // Initialize the idle scene
        super();
        this.init();
    }
    
    public start() {
        this.visible = true;
    }

    public end() {
        this._router.to(Routes.game);
        this.visible = false;
    }

    protected init() {
        console.log('Idle scene initialized');

        this._background = new PIXI.Graphics();
        this._background.interactive = true;
        this._background.on('pointertap', () => {
            this.end();
        });
        this._background.rect(0, 0, window.innerWidth, window.innerHeight).fill(0xff9933);
        this.addChild(this._background);

        this._title = new PIXI.Text({
            text: 'Reaction Test',
            style: new PIXI.TextStyle({
                fontFamily: 'RacingSans',
                fontSize: 100,
                fill: '#ffffff',
                align: 'center',
            })
        });
        this._title.anchor.set(0.5);
        this._title.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.addChild(this._title);

        this._prompt = new PIXI.Text({
            text: 'Click to start',
            style: new PIXI.TextStyle({
                fontFamily: 'sans-serif',
                fontSize: 50,
                fill: '#ffffff',
                align: 'center'
            })
        });
        this._prompt.anchor.set(0.5);
        this._prompt.position.set(window.innerWidth / 2, window.innerHeight / 2 + 100);
        this.addChild(this._prompt);
    }
}