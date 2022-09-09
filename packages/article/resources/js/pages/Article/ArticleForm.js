import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Checkbox, DateTimePicker, Error, Input, Loading, Page, PageContent, Select, Wysiwyg } from "../../../../../cms/resources/js/module";
import { GET_SETTINGS } from "../../../../../cms/resources/js/queries";
import { Medias } from "../../components/Medias";
import { GET_ARTICLE, GET_ARTICLES_PAGINATED, GET_ARTICLE_CATEGORIES, UPSERT_ARTICLE } from "../../queries";

const schema = yup.object({
  name: yup.string().required(),
  slug: yup.string().required(),
  start: yup.date().required(),
  stop: yup.date().nullable(),
  content: yup.string().required(),
  excerpt: yup.string().nullable(),
  categories: yup.array(),
  medias: yup.array().of(
    yup.object().shape({
      source: yup.string().required(),
      alt: yup.string(),
    })
  ),
  isActive: yup.boolean(),
});

export const ArticleForm = () => {
  const { id } = useParams();
  const isNew = id === undefined;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categories: [],
      medias: [],
      start: new Date(),
      isActive: true,
    }
  });

  const watchStart = methods.watch('start');
  const watchStop = methods.watch('stop');

  const navigate = useNavigate();

  const getArticleResult = useQuery(GET_ARTICLE, {
    variables: {
      id
    },
    skip: isNew,
  });

  const getSettingsResult = useQuery(GET_SETTINGS, {
    variables: {
      id: 'article'
    },
  });

  const getArticleCategoriesResult = useQuery(GET_ARTICLE_CATEGORIES);

  const [upsertArticle, upsertArticleResult] = useMutation(UPSERT_ARTICLE, {
    onCompleted: (data) => {
      navigate(`/articles/${data.upsertArticle.id}`);
    },
    refetchQueries: () => [{
      query: GET_ARTICLES_PAGINATED,
      variables: {
        page: 1,
      }
    }]
  });

  const handlePublish = (data) => {
    const article = {
      id: !isNew ? id : null,

      articleCategories: {
        sync: data.categories,
      },

      articleMedias: {
        upsert: data.medias.map((media) => ({
          id: media.id || null,
          source: media.source,
          alt: media.alt,
        })),
        delete: [],
      },

      name: data.name,
      slug: data.slug,
      start: format(data.start, 'yyyy-MM-dd HH:mm:ss'),
      stop: data.stop ? format(data.stop, 'yyyy-MM-dd HH:mm:ss') : null,
      content: data.content,
      excerpt: data.excerpt,
      is_active: data.isActive,
    };

    // Deleted medias
    if (!isNew) {
      const oldMedias = getArticleResult.data.article.articleMedias;
      const newMedias = data.medias;
      const deletedMedias = [];

      oldMedias.forEach(oldMedia => {
        let deleted = true;

        newMedias.forEach(newMedia => {
          if (oldMedia.id == newMedia.id) {
            deleted = false;
          }
        });

        if (deleted) {
          deletedMedias.push(oldMedia);
        }
      });

      deletedMedias.forEach(deletedMedia => {
        article.articleMedias.delete.push(deletedMedia.id);
      });
    }

    upsertArticle({
      variables: {
        input: article
      }
    });
  };

  const handlePreview = (data) => {
    // ...
  };

  const Footer = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Button color="secondary" onClick={methods.handleSubmit(handlePreview)}>Preview</Button>
      </Box>

      <Box>
        <Button color="secondary" onClick={methods.handleSubmit(handlePublish)}>Publish</Button>
      </Box>
    </Box>
  );

  const heading = isNew ? 'Add article' : 'Edit article';

  const loading = getArticleResult.loading
    || upsertArticleResult.loading
    || getSettingsResult.loading
    || getArticleCategoriesResult.loading;
  const error = getArticleResult.error
    || upsertArticleResult.error
    || getSettingsResult.error
    || getArticleCategoriesResult.error;

  useEffect(() => {
    if (getArticleResult.loading === false && getArticleResult.data) {
      const article = getArticleResult.data.article;

      methods.setValue('categories', article.articleCategories.map((articleCategory) => articleCategory.id));
      methods.setValue('medias', article.articleMedias.map((articleMedia) => ({
        id: articleMedia.id,
        source: articleMedia.source,
        alt: articleMedia.alt ?? '',
      })));

      methods.setValue('name', article.name);
      methods.setValue('slug', article.slug);
      methods.setValue('start', parseISO(article.start));
      methods.setValue('stop', article.stop ? parseISO(article.stop) : null);
      methods.setValue('content', article.content);
      methods.setValue('excerpt', article.excerpt);
      methods.setValue('isActive', article.is_active);
    }
  }, [getArticleResult.loading, getArticleResult.data]);

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      if (name === 'name') {
        methods.setValue('slug', _.kebabCase(value.name));
      } if (name === 'start') {
        if (watchStop !== null && watchStart > watchStop) {
          methods.setValue('stop', null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [methods.watch, watchStart, watchStop]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const categoryList = getArticleCategoriesResult.data.articleCategories.map((articleCategory) => ({
    value: articleCategory.id,
    label: articleCategory.name,
  }));

  const settings = getSettingsResult.data.settings ? JSON.parse(getSettingsResult.data.settings.value) : null;
  const isExcerptsEnabled = settings?.isExcerptsEnabled ?? false;

  return (
    <FormProvider {...methods}>
      <Page
        heading={heading}
        footer={<Footer />}
      >
        <PageContent>
          <Checkbox
            label="Active"
            name="isActive"
          />

          <Input
            label="Name"
            name="name"
          />

          <Input
            label="Slug"
            name="slug"
            type="hidden"
          />

          {categoryList.length > 0 && <Select
            label="Categories"
            name="categories"
            options={categoryList}
            multiple
          />}

          <DateTimePicker
            label="Start"
            name="start"
          />

          <DateTimePicker
            label="Stop"
            name="stop"
            minDateTime={watchStart}
          />

          <Box sx={{ height: '40rem', mb: 2 }}>
            <Wysiwyg name="content" />
          </Box>

          {isExcerptsEnabled && <Box sx={{ height: '20rem', mb: 2 }}>
            <Wysiwyg name="excerpt" />
          </Box>}
        </PageContent>

        <PageContent>
          <Medias />
        </PageContent>
      </Page>
    </FormProvider>
  );
}