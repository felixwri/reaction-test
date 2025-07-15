import * as PIXI from 'pixi.js';
import { BaseScene } from './baseScene';
import { Routes } from '../constants/routes';

export default class GameScene extends BaseScene {
    protected _background: PIXI.Graphics;
    protected _prompt: PIXI.Text;
    protected _timer: PIXI.Text;
    protected _ticker: PIXI.Ticker;

    private _startTime: number;
    private _timerStarted: boolean = false;
    private _timeoutId: number | null = null;

    // Lower and upper bounds for random time
    private _minRandomTime: number = 2000; 
    private _maxRandomTime: number = 4000; 

    constructor() {
        // Initialize the game scene
        super();
        this.init();
    }
    
    public start() {
        this.visible = true;
        this._prompt.text = 'Ready...';
        
        this._timeoutId = setTimeout(() => {
            this._prompt.text = 'Go!';
            this._ticker.start();
            this._startTime = Date.now();
            this._timerStarted = true;
        }, this.randomTimeGenerator());
    }

    public async end() {
        if (!this._timerStarted) {
            console.log('Timer not started yet.');
            this._prompt.text = 'Too early!';
            clearTimeout(this._timeoutId!);

            await this.wait(2000);
            this.start();
            return;
        }

        const reactionTime = Date.now() - this._startTime;

        this.visible = false;
        
        this._ticker.stop();
        this._timer.text = '00:00.000';
        
        console.log(`Reaction time: ${reactionTime} ms`);
        this._router.to(Routes.results, { reactionTime });
    }

    protected init() {
        console.log('Game scene initialized');
        // Additional setup for the game scene can go here
        this._background = new PIXI.Graphics();
        this._background.interactive = true;
        this._background.on('pointertap', () => {
            this.end();
        });
        this._background.rect(0, 0, window.innerWidth, window.innerHeight).fill(0xffcc00);
        this.addChild(this._background);

        this._prompt = new PIXI.Text({
            text: 'Ready...',
            style: new PIXI.TextStyle({
                fontFamily: 'RacingSans',
                fontSize: 100,
                fill: '#ffffff',
                align: 'center'
            })
        });
        this._prompt.anchor.set(0.5);
        this._prompt.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.addChild(this._prompt);

        this._timer = new PIXI.Text({
            text: '00:00.000',
            style: new PIXI.TextStyle({
                fontSize: 50,
                fill: '#ffffff',
                align: 'center'
            })
        });
        this._timer.position.set(window.innerWidth / 2, window.innerHeight / 2 + 100);
        this.addChild(this._timer);
        this._timer.visible = true;

        this._ticker = new PIXI.Ticker();
        this._ticker.add(() => {
            this.updateTimer();
        })  
    }

    private updateTimer() {
        const elapsed = Date.now() - this._startTime;
        const seconds = Math.floor(elapsed / 1000);
        const milliseconds = elapsed % 1000;
        const formattedTime = `00:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
        this._timer.text = formattedTime;
    }

    private randomTimeGenerator() {
        const diff = this._maxRandomTime - this._minRandomTime;
        return Math.random() * diff + this._minRandomTime;
    }

    private wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}