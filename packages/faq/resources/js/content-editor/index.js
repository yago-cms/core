import { faQuestion } from "@fortawesome/pro-duotone-svg-icons";
import { FaqBlockEditor } from "./FaqListing";

export const contentTypeGroups = [
    {
        name: 'FAQ',
        types: [
            {
                id: 'faq-listing',
                name: 'FAQ listing',
                icon: faQuestion,
                blockEditor: FaqBlockEditor,
                isPreviewDetailsHidden: true,
                isEditingDisabled: true,
            },
        ]
    }
];

export const contentTypeModules = [];