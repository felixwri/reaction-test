import { Container } from "pixi.js";
import { SceneRouter } from "../components/sceneRouter";

export abstract class BaseScene extends Container {
    /**
     * Called when the scene is transitioned to.
     * @param data Optional data to start the scene with.
     * @todo Better type definition for data.
     */
    public abstract start(data?: object): void;
    
    /**
     * Called when the scene is transitioned away from.
     */
    public abstract end(): void;

    /**
     * Initializes the scene. Called in the constructor.
     */
    protected abstract init(): void;

    /**
     * Setter for the scene router.
     * The router is used by the scene to transition to other scenes.
     */
    public set router (router: SceneRouter) {
        this._router = router;
    }

    protected _router: SceneRouter;
}