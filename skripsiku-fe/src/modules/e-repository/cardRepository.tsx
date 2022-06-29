import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import DetailModal from './detailModal';

const CardRepository = (props: any) => {
    const { data } = props;
    const [open, setOpen] = React.useState(false);
    const [repositoryId, setRepositoryId] = React.useState(null)

    const handleClickOpen = (id: any) => {
        setRepositoryId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setRepositoryId(null)
        setOpen(false);
    };

    console.log("data", data)

    return (
        <>
            <Card >
                <CardContent>
                    <Typography variant="h5" sx={{ fontSize: "16px" }} component="div">
                        {data.name}
                    </Typography>
                    <div style={{
                        display: "flex",
                        alignItems: 'center',
                        paddingTop: '12px',
                        paddingBottom: '12px'
                    }}>
                        <Avatar sx={{ width: 40, height: 40 }} src={"/static/user-placeholder.png"} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontSize: '14px', paddingLeft: '8px', fontWeight: 'bold' }}>
                                {data.publisher}
                            </Typography>
                            <Typography sx={{ fontSize: '14px', paddingLeft: '8px' }} color="text.secondary">
                                {data.major.name}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="body2" sx={{ fontSize: '14px' }}>
                        {data.description.length > 400 ? data.description.substring(0, 400) + "..." : data.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={() => handleClickOpen(data.id)} size="small">Selengkapnya</Button>
                </CardActions>
            </Card>
            <DetailModal open={open} handleClose={handleClose} repositoryId={repositoryId} />
        </>
    );
}

export default CardRepository