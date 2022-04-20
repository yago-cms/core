import { gql } from "@apollo/client";

// Article
export const GET_ARTICLES = gql`
    query GetArticles {
        articles {
            id

            articleCategories {
                id

                name
                slug
            }

            name
            slug
            start
            stop
        }
    }
`;

export const GET_ARTICLE = gql`
    query GetArticle($id: ID!) {
        article(id: $id) {
            id

            articleCategories {
                id

                name
                slug
            }

            articleMedias {
                id

                source
                alt
            }

            name
            slug
            start
            stop
            content
            excerpt
        }
    }
`;

export const UPSERT_ARTICLE = gql`
    mutation UpsertArticle($input: UpsertArticleInput!) {
        upsertArticle(input: $input) {
            id

            articleCategories {
                id

                name
                slug
            }

            articleMedias {
                id

                source
                alt
            }

            name
            slug
            start
            stop
            content
            excerpt
        }
    }
`;

// Article category
export const GET_ARTICLE_CATEGORIES = gql`
    query GetArticleCategories {
        articleCategories {
            id

            name
            slug
        }
    }
`;

export const GET_ARTICLE_CATEGORY = gql`
    query GetArticleCategory($id: ID!) {
        articleCategory(id: $id) {
            id

            name
            slug
        }
    }
`;

export const UPSERT_ARTICLE_CATEGORY = gql`
    mutation UpsertArticleCategory($input: UpsertArticleCategoryInput!) {
        upsertArticleCategory(input: $input) {
            id

            name
            slug
        }
    }
`;

// Article media
export const GET_ARTICLE_MEDIAS = gql`
    query GetArticleMedias {
        articleMedias {
            id

            source
        }
    }
`;

export const GET_ARTICLE_MEDIA = gql`
    query GetArticleMedia($id: ID!) {
        articleMedia(id: $id) {
            id

            article {
                id
            }

            source
            alt
        }
    }
`;

export const UPSERT_ARTICLE_MEDIA = gql`
    mutation UpsertArticleMedia($input: UpsertArticleMediaInput!) {
        upsertArticleMedia(input: $input) {
            id

            article {
                id
            }

            source
            alt
        }
    }
`;