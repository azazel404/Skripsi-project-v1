import React from "react";
import { CircularProgress } from '@mui/material';
import Spacer from "~/src/components/spacer";

export const DashboardLoading = () => {
    return (
        <div
            style={{
                position: "relative",
                height: "100vh",
                paddingLeft: "28px",
                paddingRight: "28px",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Spacer variant="Horizontal" />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <CircularProgress size={18} />
                                <Spacer variant="Horizontal" size={5} />
                                <small>Please wait while we validate your authentication</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

