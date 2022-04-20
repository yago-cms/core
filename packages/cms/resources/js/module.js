export const modules = [];

export const registerModule = (module, routes, menus) => {
    modules.push({
        module,
        routes,
        menus,
    });
};

export { Checkbox } from "./components/Form/Checkbox";
export { DatePicker } from "./components/Form/DatePicker";
export { DateTimePicker } from "./components/Form/DateTimePicker";
export { Input } from "./components/Form/Input";
export { Location } from "./components/Form/Location";
export { Select } from "./components/Form/Select";
export { SelectBreakpoint } from "./components/Form/SelectBreakpoint";
export { SelectMedia } from "./components/Form/SelectMedia";
export { SelectPage } from "./components/Form/SelectPage";
export { Textarea } from "./components/Form/Textarea";
export { TimePicker } from "./components/Form/TimePicker";
export { Wysiwyg } from "./components/Form/Wysiwyg";

export { Error } from "./components/Error";
export { Loading } from "./components/Loading";
export { Page } from "./components/Page";
export { PageContent } from "./components/Page";
export { PageCard } from "./components/PageCard";
export { FieldActions } from "./components/Field";
export * as Map from "./components/Map";
