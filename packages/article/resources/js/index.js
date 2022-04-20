import { registerModule } from "../../../cms/resources/js/module";
import menus from "./menus";
import routes from "./routes";

registerModule('article', routes, menus);