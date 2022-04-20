import { faNewspaper } from "@fortawesome/pro-duotone-svg-icons";

export default [
    {
        name: 'Articles',
        icon: faNewspaper,
        children: [
            {
                name: 'Manage',
                route: '/articles',
            },
            {
                name: 'Categories',
                route: '/article-categories',
            },
            {
                name: 'Settings',
                route: '/articles/settings',
            }
        ]
    },
];