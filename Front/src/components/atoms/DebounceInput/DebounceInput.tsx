import * as React from 'react';
import {OutlinedInput, OutlinedInputProps} from '@mui/material';

type DebounceInputProps = {
    handleDebounce: (value: string) => void;
    debounceTimeout: number;
} & OutlinedInputProps;

const DebounceInput: React.FC<DebounceInputProps> = ({handleDebounce, debounceTimeout = 300, ...other}) => {
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            handleDebounce(event.target.value);
        }, debounceTimeout);
    };

    return <OutlinedInput {...other} onChange={handleChange}/>;
};

export default DebounceInput;
