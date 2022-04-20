import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

export const TimePicker = ({ name, onChangeExtra, ...props }) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        defaultValue: null,
    });

    return (
        <MuiTimePicker
            inputFormat="HH:mm"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            mask="__:__"
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