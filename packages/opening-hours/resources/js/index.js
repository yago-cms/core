import { registerModule } from "../../../cms/resources/js/module";
import { contentTypeGroups, contentTypeModules } from './content-editor';
import menus from "./menus";
import routes from "./routes";

registerModule(
    'opening-hours',
    routes,
    menus,
    contentTypeGroups,
    contentTypeModules
);