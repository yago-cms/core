import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

export const DatePicker = ({ name, onChangeExtra, ...props }) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        defaultValue: null,
    });

    return (
        <DesktopDatePicker
            inputFormat="yyyy-MM-dd"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            mask="____-__-__"
            renderInput={(params) => <TextField
                fullWidth
                error={!!error?.message}
                helperText={error?.message}
                {...params}
            />}
            {...props}
        />
    );
};