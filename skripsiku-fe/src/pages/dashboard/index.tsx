import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import DashboardStudent from "~/src/modules/dashboard/student";
import DashboardLecturer from "~/src/modules/dashboard/lecturer";
import DashboardAdmin from "~/src/modules/dashboard/admin";
import { Loader } from "~/src/components/loader";

const Dashboard = (props: any) => {
    const profile = useSelector((state: any) => state.general.profile);
    const dispatch = useDispatch();
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (profile) {
            setUser(profile);
        }
    }, [profile])

    if (user) {

    }

    const renderDashboard = (role: number) => {
        switch (role) {
            case 10:
                return (
                    <div><DashboardAdmin /></div>
                )
            case 20:
                return (
                    <div> <DashboardStudent /></div>
                )
            case 30:
            case 50:
                return (
                    <div> <DashboardLecturer /> </div>
                )
            case 40:
                return (
                    <div> <DashboardLecturer /> </div>
                )
            default:
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}><Loader /></div>
                )

        }
    }

    return (
        <>
            {user ? <div> {renderDashboard(user.role)}</div> : null}
        </>
    )

}
Dashboard.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
