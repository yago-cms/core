import { FaqForm } from "./pages/Faq/FaqForm";
import { FaqIndex } from "./pages/Faq/FaqIndex";

export default [
    {
        path: '/faqs',
        exact: true,
        component: <FaqIndex />,
    },
    {
        path: '/faqs/create',
        component: <FaqForm />,
    },
    {
        path: '/faqs/:id',
        component: <FaqForm />,
    },
];
