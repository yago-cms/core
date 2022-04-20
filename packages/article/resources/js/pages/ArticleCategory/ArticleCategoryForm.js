import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Error, Input, Loading, Page, PageContent } from "../../../../../cms/resources/js/module";
import { GET_ARTICLE_CATEGORIES, GET_ARTICLE_CATEGORY, UPSERT_ARTICLE_CATEGORY } from "../../queries";

const schema = yup.object({
  name: yup.string().required(),
  slug: yup.string().required(),
});

export const ArticleCategoryForm = () => {
  const { id } = useParams();
  const isNew = id === undefined;

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const getArticleCategoryResult = useQuery(GET_ARTICLE_CATEGORY, {
    variables: {
      id
    },
    skip: isNew,
  });

  const [upsertArticleCategory, upsertArticleCategoryResult] = useMutation(UPSERT_ARTICLE_CATEGORY, {
    onCompleted: (data) => {
      navigate(`/article-categories/${data.upsertArticleCategory.id}`);
    },
    update: (cache, { data: { upsertArticleCategory } }) => {
      const data = cache.readQuery({
        query: GET_ARTICLE_CATEGORIES
      });

      if (data !== null) {
        const articleCategories = _.cloneDeep(data.articleCategories);

        if (isNew) {
          articleCategories.push(upsertArticleCategory);
        } else {
          articleCategories.forEach(articleCategory => {
            if (articleCategory.id === upsertArticleCategory.id) {
              articleCategory = upsertArticleCategory;
            }
          });
        }

        cache.writeQuery({
          query: GET_ARTICLE_CATEGORIES,
          data: {
            articleCategories
          },
        });
      }
    },
  });

  const handleSave = (data) => {
    const articleCategory = {
      id: !isNew ? id : null,

      name: data.name,
      slug: data.slug,
    };

    upsertArticleCategory({
      variables: {
        input: articleCategory
      }
    });
  };

  const Footer = () => (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button color="secondary" onClick={methods.handleSubmit(handleSave)}>Save</Button>
    </Box>
  );

  const heading = isNew ? 'Add article' : 'Edit article';

  const loading = getArticleCategoryResult.loading || upsertArticleCategoryResult.loading;
  const error = getArticleCategoryResult.error || upsertArticleCategoryResult.error;

  useEffect(() => {
    if (getArticleCategoryResult.loading === false && getArticleCategoryResult.data) {
      const articleCategory = getArticleCategoryResult.data.articleCategory;

      methods.setValue('name', articleCategory.name);
      methods.setValue('slug', articleCategory.slug);
    }
  }, [getArticleCategoryResult.loading, getArticleCategoryResult.data]);

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      if (name === 'name') {
        methods.setValue('slug', _.kebabCase(value.name));
      }
    });

    return () => subscription.unsubscribe();
  }, [methods.watch]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <FormProvider {...methods}>
      <Page
        heading={heading}
        footer={<Footer />}
      >
        <PageContent>
          <Input
            label="Name"
            name="name"
          />

          <Input
            label="Slug"
            name="slug"
            type="hidden"
          />
        </PageContent>
      </Page>
    </FormProvider>
  );
}