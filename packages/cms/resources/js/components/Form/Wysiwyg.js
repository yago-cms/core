import { useMediaQuery } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useController } from 'react-hook-form';

export const defaultConfig = {
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
};

export const Wysiwyg = ({ name, ...props }) => {
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const prefersDarkMode = false;

    const {
        field: { onChange, value },
    } = useController({
        name,
        defaultValue: '',
    });


    return (
        <Editor
            init={{
                ...defaultConfig,
                skin: prefersDarkMode ? 'oxide-dark' : '',
                content_css: prefersDarkMode ? 'dark' : '',
            }}
            tinymceScriptSrc="/backend/js/tinymce/tinymce.min.js"
            value={value}
            onEditorChange={onChange}
            {...props}
        />
    );
};
