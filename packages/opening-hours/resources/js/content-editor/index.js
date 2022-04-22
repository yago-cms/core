import { faClock } from "@fortawesome/pro-duotone-svg-icons";
import { OpeningHoursListingBlockEditor } from "./OpeningHoursListing";
import { OpeningHoursTodayBlockEditor } from "./OpeningHoursToday";

export const contentTypeGroups = [
    {
        name: 'Opening hours',
        types: [
            {
                id: 'opening-hours-today',
                name: 'Today',
                icon: faClock,
                blockEditor: OpeningHoursTodayBlockEditor,
                isPreviewDetailsHidden: true,
            },
            {
                id: 'opening-hours-listing',
                name: 'Listing',
                icon: faClock,
                blockEditor: OpeningHoursListingBlockEditor,
                isPreviewDetailsHidden: true,
                isEditingDisabled: true,
            },
        ],
    },
];

export const contentTypeModules = [];