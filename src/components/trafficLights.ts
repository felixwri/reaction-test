import { Container, Graphics } from 'pixi.js';
import { Relative } from '../utils/layout';
import gsap from 'gsap';
import { Colors } from '../constants/colors';

export class TrafficLights extends Container {
    private _lights: Graphics[] = [];
    private _total: number = 5;
    private _timeline: gsap.core.Timeline | null = null;

    constructor() {
        super();

        this._lights = [];

        this.init();
    }

    private init() {
        for (let i = 0; i < this._total; i++) {
            const light = new Graphics();

            light.circle(0, 0, 50);
            light.fill('white');

            light.tint = 0x000000;

            const position = Relative.set(0.2 + i * (0.8 / 5), 0.3);
            light.position.set(position.x, position.y);

            this.addChild(light);
            this._lights.push(light);
        }
    }

    /**
     * Method that starts the countdown for the traffic lights.
     *
     * @param time The time the countdown should last in milliseconds
     */
    public beginCountdown(time: number = 5000) {
        this._timeline?.kill();
        this._timeline = null;

        // Adjust the time to account for the initial delay
        time = time - 1000;

        this._timeline = gsap.timeline({ delay: 1 });

        for (const light of this._lights) {
            light.tint = Colors.black;
        }

        this._lights.forEach((light, i) => {
            this._timeline.fromTo(
                light,
                {
                    pixi: {
                        //
                        // The PixiJS plugin for GSAP breaks if the tint is pure black #000000
                        // Must use a slight variation like #000001 :(
                        //
                        tint: Colors.black,
                    },
                },
                {
                    pixi: {
                        tint: 0xff0000,
                    },
                    duration: 1,
                },
                i * (time / (this._total * 1000))
            );
        });
    }

    /**
     * Failed countdown -> lights to yellow.
     */
    public countdownFailed() {
        this._timeline?.kill();
        this._timeline = null;

        this._lights.forEach((light) => {
            light.tint = Colors.yellow;
        });
    }

    /**
     * Successful countdown -> lights to green.
     */
    public endCountdown() {
        this._timeline?.kill();
        this._timeline = null;

        this._lights.forEach((light) => {
            light.tint = Colors.green;
        });
    }

    /**
     * Explicit reset
     * Redundant if `beginCountdown` is called
     */
    public reset() {
        this._timeline?.kill();
        this._timeline = null;

        this._lights.forEach((light) => {
            light.tint = Colors.black;
        });
    }
}
