import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
} from "@mui/material";


export const AccountProfile = (props: any) => {
    const { account } = props;
    return (
        <Card >
            <CardContent>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Avatar
                        // src={account.avatar}
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64,
                        }}
                    />
                    {/* <Typography color="textPrimary" gutterBottom variant="h5">
                        {account?.first_name} {account?.last_name}
                    </Typography> */}
                </Box>
            </CardContent>
            <Divider />
            {/* <CardActions>
			<Button color="primary" fullWidth variant="text">
				Upload picture
			</Button>
		</CardActions> */}
        </Card>
    );
}
