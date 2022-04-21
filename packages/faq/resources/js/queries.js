import { gql } from "@apollo/client";

// Application
export const GET_FAQS = gql`
    query GetFaqs {
        faqs {
            id

            name
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