import { registerModule } from "../../../cms/resources/js/module";
import menus from "./menus";
import routes from "./routes";
import { contentTypeGroups, contentTypeModules } from './content-editor';

registerModule(
    'article',
    routes,
    menus,
    contentTypeGroups,
    contentTypeModules
);