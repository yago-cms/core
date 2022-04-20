import { Box, Button } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { FieldActions } from "../../../../cms/resources/js/module";
import { Input } from "../../../../cms/resources/js/module";
import { SelectMedia } from "../../../../cms/resources/js/module";
import { PageCard } from "../../../../cms/resources/js/module";

export const Medias = () => {
  const { fields, append, remove, swap } = useFieldArray({
    name: 'medias',
    keyName: 'key'
  });

  return (
    <Box>
      {fields.map((field, index) => {
        return <PageCard
          key={field.key}
          footer={
            <FieldActions
              fields={fields}
              index={index}
              swap={swap}
              remove={remove}
            />
          }
        >
          <Input
            name={`medias.${index}.id`}
            type="hidden"
          />

          <SelectMedia
            label="Media"
            name={`medias.${index}.source`}
          />

          <Input
            label="Alternative text"
            name={`medias.${index}.alt`}
          />
        </PageCard>
      })}

      <Button onClick={() => append({})}>
        Add media
      </Button>
    </Box>
  );
};