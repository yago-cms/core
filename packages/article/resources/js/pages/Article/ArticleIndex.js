import { useQuery, useMutation } from "@apollo/client";
import { faEdit, faPlus, faTrash } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading, Page, PageContent } from "../../../../../cms/resources/js/module";
import { DELETE_ARTICLE, GET_ARTICLES_PAGINATED } from "../../queries";

export const ArticleIndex = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getArticlesResult = useQuery(GET_ARTICLES_PAGINATED, {
    variables: {
      page: 1,
    }
  });

  const [deleteArticle, deleteArticleResult] = useMutation(DELETE_ARTICLE, {
    refetchQueries: [
      {
        query: GET_ARTICLES_PAGINATED,
        variables: {
          page: 1,
        }
      }
    ]
  });

  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this item?')) {
      deleteArticle({
        variables: {
          id
        }
      });
    }
  };

  const isLoading = getArticlesResult.loading;
  const error = getArticlesResult.error;

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'displayPeriod',
      headerName: 'Display period',
      width: 220,
      renderCell: (params) => (
        params.row.isShowing ? (params.row.displayPeriod) : (
          <Typography sx={{
            color: '#aaa'
          }} variant="body2">
            {params.row.displayPeriod}
          </Typography>
        )
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.isActive && <Chip label="Active" color="primary" />}
        </>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <IconButton size="small" onClick={() => handleDelete(params.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>

          <IconButton size="small" onClick={() => navigate(`/articles/${params.id}`)}>
            <FontAwesomeIcon icon={faEdit} />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = getArticlesResult.data.articlesPaginated.data.map((article) => ({
    id: article.id,
    name: article.name,
    displayPeriod: format(new Date(article.start), 'yyyy-MM-dd') + (article.stop ? ` to ${format(new Date(article.stop), 'yyyy-MM-dd')}` : ' and beyond'),
    isActive: article.is_active,
    isShowing: new Date() > new Date(article.start) && (!article.stop || new Date() < new Date(article.stop)),
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
            paginationMode="server"
            rowCount={getArticlesResult.data.articlesPaginated.paginatorInfo.total}
            rowsPerPageOptions={[25]}
            pageSize={25}
            onPageChange={(page) => {
              setIsLoadingMore(true);
              getArticlesResult.fetchMore({
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