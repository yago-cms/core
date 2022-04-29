import { useQuery } from "@apollo/client";
import { faEdit, faPlus } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error, Loading, Page, PageContent } from "../../../../../cms/resources/js/module";
import { GET_FAQS } from "../../queries";

export const FaqIndex = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getFaqsResult = useQuery(GET_FAQS, {
    variables: {
      page: 1,
    }
  });
  const navigate = useNavigate();

  const isLoading = getFaqsResult.loading;
  const error = getFaqsResult.error;

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <IconButton size="small" onClick={() => navigate(`/faqs/${params.id}`)}>
          <FontAwesomeIcon icon={faEdit} />
        </IconButton>
      ),
    }
  ];

  const rows = getFaqsResult.data.faqs.data.map((faq) => ({
    id: faq.id,
    name: faq.name,
  }));

  return (
    <Page
      heading="Faqs"
      fab={{
        handleClick: () => navigate('/faqs/create'),
        icon: faPlus,
      }}
    >
      <PageContent>
        <div style={{ height: '60vh', width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            paginationMode="server"
            rowCount={getFaqsResult.data.faqs.paginatorInfo.total}
            rowsPerPageOptions={[25]}
            pageSize={25}
            onPageChange={(page) => {
              setIsLoadingMore(true);
              getFaqsResult.fetchMore({
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