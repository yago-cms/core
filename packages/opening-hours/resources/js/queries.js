import { gql } from "@apollo/client";

// Opening hours
export const GET_OPENING_HOURS = gql`
    query GetOpeningHours {
        openingHours {
            id

            name
            open
            close
            is_closed
            is_closed_for_lunch
            lunch_close
            lunch_open
        }
    }
`;

export const GET_OPENING_HOUR = gql`
    query GetOpeningHour($id: ID!) {
        openingHour(id: $id) {
            id

            name
            open
            close
            is_closed
            is_closed_for_lunch
            lunch_close
            lunch_open
        }
    }
`;

export const UPSERT_OPENING_HOUR = gql`
    mutation UpsertOpeningHours($input: [UpsertOpeningHourInput]!) {
        upsertOpeningHours(input: $input)
    }
`;

// Opening hour exceptions
export const GET_OPENING_HOUR_EXCEPTIONS = gql`
    query GetOpeningHourExceptions {
        openingHourExceptions {
            id

            name
            date
        }
    }
`;

export const GET_OPENING_HOUR_EXCEPTION = gql`
    query GetOpeningHourException($id: ID!) {
        openingHourException(id: $id) {
            id

            name
            date
            open
            close
            is_closed
            is_closed_for_lunch
            lunch_close
            lunch_open
        }
    }
`;

export const UPSERT_OPENING_HOUR_EXCEPTION = gql`
    mutation UpsertOpeningHour($input: UpsertOpeningHourExceptionInput!) {
        upsertOpeningHourException(input: $input) {
            id

            name
            date
        }
    }
`;