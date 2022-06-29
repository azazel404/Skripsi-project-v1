import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardLoading } from "./dashboard-loading";
import { useSession, getSession, signOut } from "next-auth/react"
import Toast from "../../components/toast";
import {
    closeToast, storeProfile
} from "../../actions";
import AuthAPI from "../../api/AuthAPI";


interface LayoutInterface {
    children?: React.ReactNode,
}

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    paddingTop: 54,
    [theme.breakpoints.up("lg")]: {
        paddingLeft: 280,
    },
}));



export const DashboardLayout = (props: LayoutInterface) => {
    const { children } = props;
    const toast = useSelector((state: any) => state.general.toast);
    const dispatch = useDispatch();

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { data: session, status } = useSession()


    const retrieveProfile = () => {
        AuthAPI.profile().then(res => {
            dispatch(storeProfile(res?.data));
        })
            .catch(err => {
                console.log("error", err)
            })
    }

    useEffect(() => {
        if (session?.accessToken) {
            retrieveProfile();
        }
    }, [session])

    // typeof window !== "undefined" &&
    if (status === "loading") {
        return <DashboardLoading />
    }

    if (status === "unauthenticated") {
        return signOut({ callbackUrl: "/login" });
    }

    // if (session) {
    //     let token = session.accessToken;
    //     localStorage.setItem("access_token", `${token}`);
    // }




    const handleCloseSuccessError = () => {
        dispatch(closeToast());
    };

    return (
        <>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: "flex",
                        flex: "1 1 auto",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    {children}
                    <Toast open={toast.open} text={`${toast.message}`} type={toast.type} handleClose={handleCloseSuccessError} />
                </Box>
            </DashboardLayoutRoot>
            <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
            <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
        </>
    );

};

