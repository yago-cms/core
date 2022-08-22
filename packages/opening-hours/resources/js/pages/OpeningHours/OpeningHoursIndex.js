import { useQuery } from "@apollo/client";
import { faEdit, faPlus } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error, Loading, Page, PageContent } from "../../../../../cms/resources/js/module";
import { GET_OPENING_HOUR_EXCEPTIONS_PAGINATED } from "../../queries";

export const OpeningHoursIndex = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getOpeningHourExceptionsResult = useQuery(GET_OPENING_HOUR_EXCEPTIONS_PAGINATED, {
    variables: {
      page: 1,
    }
  });
  const navigate = useNavigate();

  const isLoading = getOpeningHourExceptionsResult.loading;
  const error = getOpeningHourExceptionsResult.error;

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <IconButton size="small" onClick={() => navigate(`/opening-hours/${params.id}`)}>
          <FontAwesomeIcon icon={faEdit} />
        </IconButton>
      ),
    }
  ];

  const rows = getOpeningHourExceptionsResult.data.openingHourExceptionsPaginated.data.map((openingHourException) => ({
    id: openingHourException.id,
    name: openingHourException.name,
    date: openingHourException.date,
  }));

  return (
    <Page
      heading="Opening hour exceptions"
      fab={{
        handleClick: () => navigate('/opening-hours/create'),
        icon: faPlus,
      }}
    >
      <PageContent>
        <div style={{ height: '60vh', width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            paginationMode="server"
            rowCount={getOpeningHourExceptionsResult.data.openingHourExceptionsPaginated.paginatorInfo.total}
            rowsPerPageOptions={[25]}
            pageSize={25}
            onPageChange={(page) => {
              setIsLoadingMore(true);
              getOpeningHourExceptionsResult.fetchMore({
                variables: {
                  page: page + 1,
                }
              }).then(() => setIsLoadingMore(false))
            }}
            loading={isLoadingMore}
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableSelectionOnClick
          />
        </div>
      </PageContent>
    </Page>
  );
}