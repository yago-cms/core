import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

export const DateTimePicker = ({ name, onChangeExtra, ...props }) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        defaultValue: null,
    });

    return (
        <DesktopDateTimePicker
            inputFormat="yyyy-MM-dd HH:mm"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            mask="____-__-__ __:__"
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