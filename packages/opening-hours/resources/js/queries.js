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
    query GetOpeningHourExceptions($page: Int!) {
        openingHourExceptions(first: 25, page: $page) @connection(key: "opening-hour-exception") {
            id

            name
            date
        }
    }
`;

export const GET_OPENING_HOUR_EXCEPTIONS_PAGINATED = gql`
    query GetOpeningHourExceptionsPaginated($page: Int!) {
        openingHourExceptionsPaginated(first: 25, page: $page) @connection(key: "opening-hour-exception") {
            data {
                id

                name
                date
            }

            paginatorInfo {
                total
            }
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
    mutation UpsertOpeningHourException($input: UpsertOpeningHourExceptionInput!) {
        upsertOpeningHourException(input: $input) {
            id

            name
            date
        }
    }
`;

export const DELETE_OPENING_HOUR_EXCEPTION = gql`
    mutation DeleteOpeningHourException($id: ID!) {
        deleteOpeningHourException(id: $id) {
            id
        }
    }
`;