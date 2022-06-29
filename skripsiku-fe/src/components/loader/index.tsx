import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
interface LoaderInterface {
    error?: any,
    pastDelay?: any,
}

export const Loader = (props: LoaderInterface) => {

    const loadingMessages = [
        "Memuat tidak akan lama"
        // t("Please wait while im gearing up stuff for you .."),
        // t("Have you check your Appl ?"),
    ];

    const prepareMessages = () => {
        var index = Math.floor(Math.random() * loadingMessages.length) + 1;

        if (index < loadingMessages.length) {
            return loadingMessages[index];
        }

        return loadingMessages[0];
    };

    return (
        <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
        >
            <CircularProgress />
            <Typography variant="body2" gutterBottom style={{ marginTop: '16px' }}>
                {prepareMessages()}
            </Typography>
        </div>
    );
};
