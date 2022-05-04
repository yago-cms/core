import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Error, Input, Loading, Page, PageContent, Wysiwyg } from "../../../../../cms/resources/js/module";
import { GET_FAQ, GET_FAQS_PAGINATED, UPSERT_FAQ } from "../../queries";

const schema = yup.object({
  name: yup.string().required(),
  content: yup.string().required(),
});

export const FaqForm = () => {
  const { id } = useParams();
  const isNew = id === undefined;

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const getFaqResult = useQuery(GET_FAQ, {
    variables: {
      id
    },
    skip: isNew,
  });

  const [upsertFaq, upsertFaqResult] = useMutation(UPSERT_FAQ, {
    onCompleted: (data) => {
      navigate(`/faqs/${data.upsertFaq.id}`);
    },
    refetchQueries: () => [{
      query: GET_FAQS_PAGINATED,
      variables: {
        page: 1,
      }
    }]
  });

  const handleSave = (data) => {
    const faq = {
      id: !isNew ? id : null,

      name: data.name,
      content: data.content,
    };

    upsertFaq({
      variables: {
        input: faq
      }
    }).then(() => {
      getFaqResult.refetch();
    });
  };

  const Footer = () => (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <Button color="secondary" onClick={methods.handleSubmit(handleSave)}>Save</Button>
    </Box>
  );

  const heading = isNew ? 'Add faq' : 'Edit faq';

  const isLoading = getFaqResult.loading
    || upsertFaqResult.loading;
  const error = getFaqResult.error
    || upsertFaqResult.error;

  useEffect(() => {
    if (getFaqResult.loading === false && getFaqResult.data) {
      const faq = getFaqResult.data.faq;

      methods.setValue('name', faq.name);
      methods.setValue('content', faq.content);
    }
  }, [getFaqResult.loading, getFaqResult.data]);

  if (isLoading) return <Loading />;
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

          <Box sx={{ height: '20rem', mb: 2 }}>
            <Wysiwyg name="content" />
          </Box>
        </PageContent>
      </Page>
    </FormProvider>
  );
}