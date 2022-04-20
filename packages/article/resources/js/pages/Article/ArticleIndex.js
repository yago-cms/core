import { useQuery } from "@apollo/client";
import { faEdit, faPlus } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Loading, Page, PageContent } from "../../../../../cms/resources/js/module";
import { GET_ARTICLES } from "../../queries";

export const ArticleIndex = () => {
  const getArticlesResult = useQuery(GET_ARTICLES);
  const navigate = useNavigate();

  const loading = getArticlesResult.loading;
  const error = getArticlesResult.error;

  if (loading) return <Loading />;
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
        <IconButton size="small" onClick={() => navigate(`/articles/${params.id}`)}>
          <FontAwesomeIcon icon={faEdit} />
        </IconButton>
      ),
    }
  ];

  const rows = getArticlesResult.data.articles.map((faq) => ({
    id: faq.id,
    name: faq.name,
  }));

  return (
    <Page
      heading="Articles"
      fab={{
        handleClick: () => navigate('/articles/create'),
        icon: faPlus,
      }}
    >
      <PageContent>
        <div style={{ height: '60vh', width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
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