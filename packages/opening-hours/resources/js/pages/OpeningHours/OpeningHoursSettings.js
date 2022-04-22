import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";
import { format } from "date-fns";
import { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { Checkbox, Error, Input, Loading, Page, PageCard, PageContent, TimePicker } from "../../../../../cms/resources/js/module";
import { GET_OPENING_HOURS, UPSERT_OPENING_HOUR } from "../../queries";

export const timeToDate = (time) => {
  const [hours, minutes] = time.split(':');
  return new Date(0, 0, 0, hours, minutes);
};

const Day = ({ label, name }) => {
  const { watch } = useFormContext();

  const watchClosed = watch(`${name}.isClosed`);
  const watchClosedForLunch = watch(`${name}.isClosedForLunch`);

  return (
    <>
      <PageCard heading={label}>
        <Input
          name={`${name}.id`}
          type="hidden"
        />

        <Box sx={{ mb: 2 }}>
          <Checkbox
            label="Closed"
            name={`${name}.isClosed`}
          />

          {watchClosed === false && (
            <Checkbox
              label="Closed for lunch"
              name={`${name}.isClosedForLunch`}
            />
          )}
        </Box>

        {watchClosed === false && (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TimePicker
                label="Open"
                name={`${name}.open`}
              />
            </Grid>

            <Grid item xs={3}>
              <TimePicker
                label="Close"
                name={`${name}.close`}
              />
            </Grid>
          </Grid>
        )}

        {watchClosedForLunch === true && (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TimePicker
                label="Closing for lunch"
                name={`${name}.closedForLunch.close`}
              />
            </Grid>

            <Grid item xs={3}>
              <TimePicker
                label="Opening after lunch"
                name={`${name}.closedForLunch.open`}
              />
            </Grid>
          </Grid>
        )}
      </PageCard>
    </>
  );
};

export const OpeningHoursSettings = () => {
  const dayList = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const daySchema = yup.object({
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

  const schema = yup.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
  });


  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      monday: {
        isClosed: false,
        isClosedForLunch: false,
        open: null,
        close: null,
      },
      tuesday: {
        isClosed: false,
        isClosedForLunch: false,
        open: null,
        close: null,
      },
      wednesday: {
        isClosed: false,
        isClosedForLunch: false,
        open: null,
        close: null,
      },
      thursday: {
        isClosed: false,
        isClosedForLunch: false,
        open: null,
        close: null,
      },
      friday: {
        isClosed: false,
        isClosedForLunch: false,
        open: null,
        close: null,
      },
      saturday: {
        isClosed: false,
        isClosedForLunch: false,
        open: null,
        close: null,
      },
      sunday: {
        isClosed: false,
        isClosedForLunch: false,
        open: null,
        close: null,
      },
    }
  });

  const getOpeningHoursResult = useQuery(GET_OPENING_HOURS);

  const [upsertOpeningHour, upsertOpeningHourResult] = useMutation(UPSERT_OPENING_HOUR);

  const handleSave = (data) => {
    const input = [];

    dayList.forEach((day) => {
      const dayData = data[day];

      input.push({
        id: dayData.id || null,
        name: day,
        open: dayData.isClosed === false ? format(dayData.open, 'HH:mm') : '',
        close: dayData.isClosed === false ? format(dayData.close, 'HH:mm') : '',
        is_closed: dayData.isClosed,
        is_closed_for_lunch: dayData.isClosedForLunch,
        lunch_close: dayData.isClosedForLunch === true ? format(dayData.closedForLunch.close, 'HH:mm') : '',
        lunch_open: dayData.isClosedForLunch === true ? format(dayData.closedForLunch.open, 'HH:mm') : '',
      });
    });

    upsertOpeningHour({
      variables: {
        input,
      }
    });

    getOpeningHoursResult.refetch();
  };

  const Footer = () => (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <Button color="secondary" onClick={methods.handleSubmit(handleSave)}>Save</Button>
    </Box>
  );

  const loading = getOpeningHoursResult.loading
    || upsertOpeningHourResult.loading;
  const error = getOpeningHoursResult.error
    || upsertOpeningHourResult.error;

  useEffect(() => {
    if (getOpeningHoursResult.loading === false && getOpeningHoursResult.data) {
      getOpeningHoursResult.data.openingHours.forEach(openingHour => {
        methods.setValue(`${openingHour.name}.id`, openingHour.id);

        if (!openingHour.is_closed) {
          methods.setValue(`${openingHour.name}.open`, timeToDate(openingHour.open));
          methods.setValue(`${openingHour.name}.close`, timeToDate(openingHour.close));
        }

        methods.setValue(`${openingHour.name}.isClosed`, openingHour.is_closed);
        methods.setValue(`${openingHour.name}.isClosedForLunch`, openingHour.is_closed_for_lunch);

        if (openingHour.is_closed_for_lunch) {
          methods.setValue(`${openingHour.name}.closedForLunch.close`, timeToDate(openingHour.lunch_close));
          methods.setValue(`${openingHour.name}.closedForLunch.open`, timeToDate(openingHour.lunch_open));
        }
      })
    }
  }, [getOpeningHoursResult.loading, getOpeningHoursResult.data]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <FormProvider {...methods}>
      <Page
        heading="Regular opening hours"
        footer={<Footer />}
      >
        <PageContent>
          <Day
            label="Monday"
            name="monday"
          />

          <Day
            label="Tuesday"
            name="tuesday"
          />

          <Day
            label="Wednesday"
            name="wednesday"
          />

          <Day
            label="Thursday"
            name="thursday"
          />

          <Day
            label="Friday"
            name="friday"
          />

          <Day
            label="Saturday"
            name="saturday"
          />

          <Day
            label="Sunday"
            name="sunday"
          />
        </PageContent>
      </Page>
    </FormProvider>
  );
}