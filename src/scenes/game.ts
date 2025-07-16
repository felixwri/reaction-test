import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { BaseScene } from './baseScene';
import { Routes } from '../constants/routes';
import { Colors } from '../constants/colors';
import { Relative } from '../utils/layout';
import { wait } from '../utils/wait';
import { TrafficLights } from '../components/trafficLights';

export default class GameScene extends BaseScene {
    protected _background: PIXI.Graphics;
    protected _prompt: PIXI.Text;
    protected _timer: PIXI.Text;
    protected _ticker: PIXI.Ticker;
    protected _lights: TrafficLights;

    private _timeline: gsap.core.Timeline;
    private _startTime: number;
    private _timerStarted: boolean = false;
    private _timeoutId: number | null = null;

    // Lower and upper bounds for random time
    private _minRandomTime: number = 6000;
    private _maxRandomTime: number = 7500;

    constructor(lights: TrafficLights = new TrafficLights()) {
        // Initialize the game scene
        super();
        this._lights = lights;
        this.init();
    }

    public async start() {
        this.visible = true;

        await wait(1000);

        this._lights.beginCountdown(this._minRandomTime - 500);

        this._timeoutId = setTimeout(() => {
            this._lights.endCountdown();
            this._ticker.start();
            this._startTime = Date.now();
            this._timerStarted = true;
        }, this.randomTimeGenerator());
    }

    public async end() {
        // In the case of a false start, show yellow lights
        if (!this._timerStarted) {
            console.log('Timer not started yet.');
            this._prompt.text = 'False start!';
            clearTimeout(this._timeoutId!);

            this._lights.countdownFailed();

            await wait(2000);
            this._prompt.text = 'Wait for the lights to turn green';
            this.start();
            return;
        }

        this._ticker.stop();

        this._timeline = gsap.timeline({ delay: 0.5 });

        this._timeline.fromTo(
            this,
            {
                pixi: {
                    alpha: 1,
                },
            },
            {
                pixi: {
                    alpha: 0,
                },
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    this.reset();
                    const reactionTime = Date.now() - this._startTime;
                    this._router.to(Routes.results, { reactionTime });
                },
            }
        );
    }

    protected init() {
        console.log('Game scene initialized');
        // Additional setup for the game scene can go here
        this._background = new PIXI.Graphics();
        this._background.interactive = true;
        this._background.on('pointertap', () => {
            this.end();
        });
        this._background.rect(0, 0, window.innerWidth, window.innerHeight).fill(Colors.darkGray);
        this.addChild(this._background);

        this._prompt = new PIXI.Text({
            text: 'Wait for the lights to turn green',
            style: new PIXI.TextStyle({
                fontFamily: 'RacingSans',
                fontSize: 36,
                fill: '#ffffff',
                align: 'center',
            }),
        });
        this._prompt.anchor.set(0.5);
        this._prompt.position = Relative.set(0.5, 0.5);
        this.addChild(this._prompt);

        this._timer = new PIXI.Text({
            text: '0.000',
            style: new PIXI.TextStyle({
                fontFamily: 'RacingSans',
                fontSize: 100,
                fill: '#ffffff',
                align: 'center',
            }),
        });
        this._timer.anchor.set(0.5);
        this._timer.position = Relative.set(0.5, 0.6);
        this.addChild(this._timer);
        this._timer.visible = true;

        this._ticker = new PIXI.Ticker();
        this._ticker.add(() => {
            this.updateTimer();
        });

        this.addChild(this._lights);
    }

    private reset() {
        this._timerStarted = false;
        this._lights.reset();
        this.alpha = 1;
        this.visible = false;

        this._timer.text = '0.000';
    }

    private updateTimer() {
        const elapsed = Date.now() - this._startTime;
        const seconds = Math.floor(elapsed / 1000);
        const milliseconds = elapsed % 1000;
        const formattedTime = `${seconds}:${String(milliseconds).padStart(3, '0')}`;
        this._timer.text = formattedTime;
    }

    private randomTimeGenerator() {
        const diff = this._maxRandomTime - this._minRandomTime;
        return Math.random() * diff + this._minRandomTime;
    }
}
