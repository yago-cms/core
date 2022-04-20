import { useQuery } from "@apollo/client";
import { faEdit, faPlus } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Error, Loading, Page, PageContent } from "../../../../../cms/resources/js/module";
import { GET_ARTICLE_CATEGORIES } from "../../queries";

export const ArticleCategoryIndex = () => {
  const getArticleCategoriesResult = useQuery(GET_ARTICLE_CATEGORIES);
  const navigate = useNavigate();

  const loading = getArticleCategoriesResult.loading;
  const error = getArticleCategoriesResult.error;

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
        <IconButton size="small" onClick={() => navigate(`/article-categories/${params.id}`)}>
          <FontAwesomeIcon icon={faEdit} />
        </IconButton>
      ),
    }
  ];

  const rows = getArticleCategoriesResult.data.articleCategories.map((faq) => ({
    id: faq.id,
    name: faq.name,
  }));

  return (
    <Page
      heading="Article categories"
      fab={{
        handleClick: () => navigate('/article-categories/create'),
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