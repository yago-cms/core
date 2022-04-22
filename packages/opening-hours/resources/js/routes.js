import { OpeningHoursForm } from './pages/OpeningHours/OpeningHoursForm';
import { OpeningHoursIndex } from './pages/OpeningHours/OpeningHoursIndex';
import { OpeningHoursSettings } from './pages/OpeningHours/OpeningHoursSettings';

export default [
    // Opening hours
    {
        path: '/opening-hours',
        exact: true,
        component: <OpeningHoursIndex />,
    },
    {
        path: '/opening-hours/create',
        component: <OpeningHoursForm />,
    },
    {
        path: '/opening-hours/:id',
        component: <OpeningHoursForm />,
    },
    {
        path: '/opening-hours/settings',
        exact: true,
        component: <OpeningHoursSettings />,
    },
];
