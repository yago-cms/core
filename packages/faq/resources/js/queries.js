import { gql } from "@apollo/client";

// Application
export const GET_FAQS = gql`
    query GetFaqs($page: Int!) {
        faqs(first: 25, page: $page) @connection(key: "faq") {
            id

            name
        }
    }
`;

export const GET_FAQS_PAGINATED = gql`
    query GetFaqsPaginated($page: Int!) {
        faqsPaginated(first: 25, page: $page) @connection(key: "faq") {
            data {
                id

                name
            }

            paginatorInfo {
                total
            }
        }
    }
`;

export const GET_FAQ = gql`
    query GetFaq($id: ID!) {
        faq(id: $id) {
            id

            name
            content
        }
    }
`;

export const UPSERT_FAQ = gql`
    mutation UpsertFaq($input: UpsertFaqInput!) {
        upsertFaq(input: $input) {
            id

            name
            content
        }
    }
`;

export const DELETE_FAQ = gql`
    mutation DeleteFaq($id: ID!) {
        deleteFaq(id: $id) {
            id
        }
    }
`;