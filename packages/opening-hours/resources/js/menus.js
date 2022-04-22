import { faClock } from "@fortawesome/pro-duotone-svg-icons";

export default [
    {
        name: 'Opening hours',
        icon: faClock,
        children: [
            {
                name: 'Manage',
                route: '/opening-hours',
            },
            {
                name: 'Settings',
                route: '/opening-hours/settings',
            },
        ]
    },
];