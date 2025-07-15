import { Container } from "pixi.js";
import { SceneRouter } from "../components/sceneRouter";

export abstract class BaseScene extends Container {
    public abstract start(data?: object): void;
    
    public abstract end(): void;

    protected abstract init(): void;

    public setRouter (router: SceneRouter): void {
        this._router = router;
    }

    protected _router: SceneRouter;
}