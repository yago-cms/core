import { useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Error, Input, Loading, Select, usePrompt } from "../../../../cms/resources/js/module";
import { GET_ARTICLE_CATEGORIES } from "../queries";

const schema = yup.object({
    limit: yup.number().min(0).integer(),
    categories: yup.array(),
});

export const ArticleListingBlockEditor = forwardRef(({ content, save }, ref) => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            limit: 0,
            categories: [],
        },
    });

    const getArticleCategoriesResult = useQuery(GET_ARTICLE_CATEGORIES);

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

    const loading = getArticleCategoriesResult.loading;
    const error = getArticleCategoriesResult.error;

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

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />;

    const categoryList = getArticleCategoriesResult.data.articleCategories.map((articleCategory) => ({
        value: articleCategory.id,
        label: articleCategory.name,
    }));

    return (
        <FormProvider {...methods}>
            <Input
                label="Articles per page"
                name="limit"
                helperText="The number of articles per page you want to show. Set to zero if you want to show all."
            />

            {categoryList.length > 0 && <Select
                label="Categories"
                name="categories"
                options={categoryList}
                multiple
                helperText="Select one or more categories if you want to filter by them. Leave blank if you want to show all."
            />}
        </FormProvider>
    );
});