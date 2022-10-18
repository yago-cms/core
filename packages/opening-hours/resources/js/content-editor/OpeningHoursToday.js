import { yupResolver } from "@hookform/resolvers/yup";
import { FormGroup } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Checkbox, Error, Input, usePrompt } from "../../../../cms/resources/js/module";

const schema = yup.object({
    showMessage: yup.boolean(),
    messageOpen: yup.string().when('showMessage', {
        is: true,
        then: (schema) => schema.required(),
    }),
    messageClosed: yup.string().when('showMessage', {
        is: true,
        then: (schema) => schema.required(),
    }),
    group: yup.boolean(),
    showClosedForLunch: yup.boolean(),
    showClosedDays: yup.boolean(),
    showExceptions: yup.boolean(),
});

export const OpeningHoursTodayBlockEditor = forwardRef(({ content, save }, ref) => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            categories: [],
        },
    });

    const watchShowMessage = methods.watch('showMessage');
    const watchGroup = methods.watch('group');

    const handleSave = (data) => {
        save(JSON.stringify(data));
    };

    const handleError = () => {
        throw new Error();
    };

    useImperativeHandle(ref, () => ({
        save() {
            return methods.handleSubmit(handleSave, handleError)();
        }
    }));

    usePrompt('Are you sure you want to leave this page? You will lose any unsaved data.', methods.isDirty);

    useEffect(() => {
        if (!content) {
            return;
        }

        let json = {};

        try {
            json = JSON.parse(content);
        } catch {
            console.log('Invalid JSON');
            return;
        }

        for (const field in json) {
            if (field in schema.fields) {
                methods.setValue(field, json[field]);
            }
        }
    }, []);

    return (
        <FormProvider {...methods}>
            <FormGroup>
                <Checkbox
                    label="Show message"
                    name="showMessage"
                />
            </FormGroup>

            {watchShowMessage === true && (
                <>
                    <Input
                        label="Open message"
                        name="messageOpen"
                        helperText='Eg. "We are open today"'
                    />

                    <Input
                        label="Closed message"
                        name="messageClosed"
                        helperText='Eg. "We are closed today"'
                    />
                </>
            )}

            <FormGroup>
                <Checkbox
                    label="Group opening hours"
                    name="group"
                    helperText='Use the format "Monday-Friday xx:xx-xx:xx" instead of listing individual days'
                />
            </FormGroup>

            <FormGroup>
                <Checkbox
                    label="Show closed for lunch"
                    name="showClosedForLunch"
                    disabled={watchGroup === true}
                />
            </FormGroup>

            <FormGroup>
                <Checkbox
                    label="Show closed days"
                    name="showClosedDays"
                />
            </FormGroup>

            <FormGroup>
                <Checkbox
                    label="Show exceptional opening hours"
                    name="showExceptions"
                    helperText="Will list exceptions one month ahead"
                />
            </FormGroup>
        </FormProvider>
    );
});