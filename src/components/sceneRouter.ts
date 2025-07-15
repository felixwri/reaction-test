import { Route } from "../constants/routes";

export class SceneRouter {
    private _scenes: Map<Route, (data?: object) => void>;

    constructor() {
        this._scenes = new Map();
    }

    /**
     * Registers a scene with the router.
     * 
     * @param name
     * @param callback Optionally takes an object with data to pass to the next scene.
     */
    add(name: Route, callback: (data?: object) => void): void {
        if (this._scenes.has(name)) {
            throw new Error(`Scene with name ${name} already exists.`);
        }

        this._scenes.set(name, callback);
    }

    /**
     * Calls the registered callback for this route.
     * 
     * @param name
     * @param data If provided, this data will be passed to the scene's start method.
     */
    to(name: Route, data?: object): void {
        const callback = this._scenes.get(name);
        if (!callback) {
            throw new Error(`Scene with name ${name} does not exist.`);
        }

        if (data) {
            callback(data);
        } else {
            callback();
        }
    }
}