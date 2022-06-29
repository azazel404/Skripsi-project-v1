import Head from "next/head";
import { Box, Container } from "@mui/material";
import TableDynamic from "../../components/table/tableComponent";
import { ToolbarComponent } from "../../components/toolbar";
import { DashboardLayout } from "../../layout/dashboard/dashboard-layout";
import { customers } from "../../__mocks__/customers";

const ActionRequired = (props: any) => {

    const columns = [
        {
            displayName: 'Name',
            name: 'name'
        },
        {
            displayName: 'Email',
            name: 'email'
        },
        {
            displayName: 'Phone',
            name: 'phone'
        },
    ];
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    paddingTop: '24px',
                    paddingBottom: '24px'
                }}
            >
                <Container maxWidth={false}>
                    <ToolbarComponent title="Action Required" />
                    <Box sx={{ mt: 3 }}>
                        <TableDynamic
                            data={customers}
                            count={10}
                            columns={columns}

                        />
                    </Box>
                </Container>
            </Box>
        </>
    )
}
ActionRequired.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default ActionRequired;
