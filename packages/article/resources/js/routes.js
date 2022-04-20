import { ArticleForm } from './pages/Article/ArticleForm';
import { ArticleIndex } from './pages/Article/ArticleIndex';
import { ArticleSettings } from './pages/Article/ArticleSettings';
import { ArticleCategoryForm } from './pages/ArticleCategory/ArticleCategoryForm';
import { ArticleCategoryIndex } from './pages/ArticleCategory/ArticleCategoryIndex';

export default [
    // Article
    {
        path: '/articles',
        exact: true,
        component: <ArticleIndex />,
    },
    {
        path: '/articles/create',
        component: <ArticleForm />,
    },
    {
        path: '/articles/:id',
        component: <ArticleForm />,
    },
    {
        path: '/articles/settings',
        exact: true,
        component: <ArticleSettings />,
    },

    // Article category
    {
        path: '/article-categories',
        exact: true,
        component: <ArticleCategoryIndex />,
    },
    {
        path: '/article-categories/create',
        component: <ArticleCategoryForm />,
    },
    {
        path: '/article-categories/:id',
        component: <ArticleCategoryForm />,
    },
];
