import {Listeners} from "./listeners.js";
import {Elements} from "./elements.js";
import {Renderer} from "./renderer.js";
import {SideEffects} from "./sideEffects.js";
import {Router} from "./router.js";

export class Bootstrap {
    public static runBootstrap(){
        Elements.secretInput().focus();
        Listeners.initialize();
        SideEffects.initialize();
        Renderer.run();
        Router.initialize();
    }
}

Bootstrap.runBootstrap();