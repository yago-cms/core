import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Checkbox, DatePicker, DateTimePicker, Error, GET_SETTINGS, Input, Loading, Page, PageContent, Select, TimePicker, Wysiwyg } from "../../../../../cms/resources/js/module";
import { GET_OPENING_HOUR_EXCEPTION, GET_OPENING_HOUR_EXCEPTIONS, UPSERT_OPENING_HOUR_EXCEPTION } from "../../queries";
import { timeToDate } from "./OpeningHoursSettings";

const schema = yup.object({
  name: yup.string().required(),
  date: yup.date().required(),
  isClosed: yup.boolean(),
  isClosedForLunch: yup.boolean(),
  open: yup.date().nullable().when('isClosed', {
    is: false,
    then: (schema) => schema.required(),
  }),
  close: yup.date().nullable().when('isClosed', {
    is: false,
    then: (schema) => schema.required(),
  }),
  closedForLunch: yup.object().when('isClosedForLunch', {
    is: true,
    then: () => yup.object({
      close: yup.date().nullable().required(),
      open: yup.date().nullable().required(),
    })
  }),
});

export const OpeningHoursForm = () => {
  const { id } = useParams();
  const isNew = id === undefined;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isClosed: false,
      isClosedForLunch: false,
      open: null,
      close: null,
    }
  });

  const watchClosed = methods.watch('isClosed');
  const watchClosedForLunch = methods.watch('isClosedForLunch');

  const navigate = useNavigate();

  const getOpeningHourExceptionResult = useQuery(GET_OPENING_HOUR_EXCEPTION, {
    variables: {
      id
    },
    skip: isNew,
  });

  const [upsertOpeningHourException, upsertOpeningHourExceptionResult] = useMutation(UPSERT_OPENING_HOUR_EXCEPTION, {
    onCompleted: (data) => {
      navigate(`/opening-hours/${data.upsertOpeningHourException.id}`);
    },
    update: (cache, { data: { upsertOpeningHourException } }) => {
      const data = cache.readQuery({
        query: GET_OPENING_HOUR_EXCEPTIONS
      });

      if (data !== null) {
        const openingHourExceptions = _.cloneDeep(data.openingHourExceptions);

        if (isNew) {
          openingHourExceptions.push(upsertOpeningHourException);
        } else {
          openingHourExceptions.forEach(openingHourException => {
            if (openingHourException.id === upsertOpeningHourException.id) {
              openingHourException = upsertOpeningHourException;
            }
          });
        }

        cache.writeQuery({
          query: GET_OPENING_HOUR_EXCEPTIONS,
          data: {
            openingHourExceptions
          },
        });
      }
    },
  });

  const handleSave = (data) => {
    const openingHourException = {
      id: !isNew ? id : null,

      name: data.name,
      date: format(data.date, 'yyyy-MM-dd'),
      open: data.isClosed === false ? format(data.open, 'HH:mm') : '',
      close: data.isClosed === false ? format(data.close, 'HH:mm') : '',
      is_closed: data.isClosed,
      is_closed_for_lunch: data.isClosedForLunch,
      lunch_close: data.isClosedForLunch === true ? format(data.closedForLunch.close, 'HH:mm') : '',
      lunch_open: data.isClosedForLunch === true ? format(data.closedForLunch.open, 'HH:mm') : '',
    };

    upsertOpeningHourException({
      variables: {
        input: openingHourException
      }
    });
  };

  const Footer = () => (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box>
        <Button color="secondary" onClick={methods.handleSubmit(handleSave)}>Save</Button>
      </Box>
    </Box>
  );

  const heading = isNew ? 'Add opening hour exception' : 'Edit opening hour exception';

  const loading = getOpeningHourExceptionResult.loading
    || upsertOpeningHourExceptionResult.loading;
  const error = getOpeningHourExceptionResult.error
    || upsertOpeningHourExceptionResult.error;

  useEffect(() => {
    if (getOpeningHourExceptionResult.loading === false && getOpeningHourExceptionResult.data) {
      const openingHourException = getOpeningHourExceptionResult.data.openingHourException;

      methods.setValue('name', openingHourException.name);
      methods.setValue('date', parseISO(openingHourException.date));

      if (!openingHourException.is_closed) {
        methods.setValue('open', timeToDate(openingHourException.open));
        methods.setValue('close', timeToDate(openingHourException.close));
      }

      methods.setValue('isClosed', openingHourException.is_closed);
      methods.setValue('isClosedForLunch', openingHourException.is_closed_for_lunch);

      if (openingHourException.is_closed_for_lunch) {
        methods.setValue('closedForLunch.close', timeToDate(openingHourException.lunch_close));
        methods.setValue('closedForLunch.open', timeToDate(openingHourException.lunch_open));
      }

    }
  }, [getOpeningHourExceptionResult.loading, getOpeningHourExceptionResult.data]);

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

          <DatePicker
            label="Date"
            name="date"
          />

          <Box sx={{ mb: 2 }}>
            <Checkbox
              label="Closed"
              name="isClosed"
            />

            {watchClosed === false && (
              <Checkbox
                label="Closed for lunch"
                name="isClosedForLunch"
              />
            )}
          </Box>

          {watchClosed === false && (
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TimePicker
                  label="Open"
                  name="open"
                />
              </Grid>

              <Grid item xs={3}>
                <TimePicker
                  label="Close"
                  name="close"
                />
              </Grid>
            </Grid>
          )}

          {watchClosedForLunch === true && (
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TimePicker
                  label="Closing for lunch"
                  name="closedForLunch.close"
                />
              </Grid>

              <Grid item xs={3}>
                <TimePicker
                  label="Opening after lunch"
                  name="closedForLunch.open"
                />
              </Grid>
            </Grid>
          )}
        </PageContent>
      </Page>
    </FormProvider>
  );
}