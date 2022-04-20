import { faNewspaper } from "@fortawesome/pro-duotone-svg-icons";
import { ArticleFeaturedBlockEditor } from "./ArticleFeatured";
import { ArticleListingBlockEditor } from "./ArticleListing";

export const contentTypeGroups = [
    {
        name: 'Article',
        types: [
            {
                id: 'article-featured',
                name: 'Featured articles',
                icon: faNewspaper,
                blockEditor: ArticleFeaturedBlockEditor,
                isPreviewDetailsHidden: true,
            },
            {
                id: 'article-listing',
                name: 'Listing',
                icon: faNewspaper,
                blockEditor: ArticleListingBlockEditor,
                isPreviewDetailsHidden: true,
            },
        ],
    },
];

export const contentTypeModules = [
    {
        id: 'article-carousel',
        name: 'Article',
    }
];