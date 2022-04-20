import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Checkbox, Error, Input, Loading, Page, PageContent } from "../../../../../cms/resources/js/module";
import { GET_SETTINGS, UPSERT_SETTINGS } from "../../../../../cms/resources/js/queries";

const schema = yup.object({
  isExcerptsEnabled: yup.boolean(),
});

export const ArticleSettings = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
    }
  });

  const watchIsExcerptsEnabled = methods.watch('isExcerptsEnabled');

  const navigate = useNavigate();

  const getSettingsResult = useQuery(GET_SETTINGS, {
    variables: {
      id: 'article'
    },
  });

  const [upsertSettings, upsertSettingsResult] = useMutation(UPSERT_SETTINGS, {
    update: (cache, { data: { upsertSettings } }) => {
      const data = cache.readQuery({
        query: GET_SETTINGS,
        variables: {
          id: 'article'
        },
      });

      if (data !== null) {
        cache.writeQuery({
          query: GET_SETTINGS,
          data: {
            settings: upsertSettings
          },
          variables: {
            id: 'article'
          }
        });
      }
    },
  });

  const handleSave = (data) => {
    upsertSettings({
      variables: {
        id: 'article',
        value: JSON.stringify(data),
      }
    });
  };

  const Footer = () => (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <Button color="secondary" onClick={methods.handleSubmit(handleSave)}>Save</Button>
    </Box>
  );

  const loading = getSettingsResult.loading
    || upsertSettingsResult.loading;
  const error = getSettingsResult.error
    || upsertSettingsResult.error;

  useEffect(() => {
    if (getSettingsResult.loading === false && getSettingsResult.data && getSettingsResult.data.settings) {
      const data = JSON.parse(getSettingsResult.data.settings.value);

      methods.setValue('isExcerptsEnabled', data.isExcerptsEnabled);
    }
  }, [getSettingsResult.loading, getSettingsResult.data]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <FormProvider {...methods}>
      <Page
        heading="Article settings"
        footer={<Footer />}
      >
        <PageContent>
          <Checkbox
            label="Use excerpts"
            name="isExcerptsEnabled"
          />

          {watchIsExcerptsEnabled === false && <Input
            label="Truncate content length"
            name="truncate"
            helperText="Number of characters to show of the article's content while previewing."
          />}
        </PageContent>
      </Page>
    </FormProvider>
  );
}