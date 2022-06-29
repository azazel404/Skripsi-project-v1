import Image from "next/image"
import Typography from '@mui/material/Typography';


interface IEmptyState {
    text?: string
}

const EmptyState = (props: IEmptyState) => {
    const { text } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
            <div style={{
                position: 'relative',
                height: '150px',
                width: '150px',
            }}>
                <Image
                    layout="fill"
                    src={"/static/empty-state.svg"}
                    alt="empty-stage-navbar"

                />
            </div>
            <Typography variant="body2" gutterBottom style={{ marginTop: '16px' }}>
                {text}
            </Typography>
        </div>
    )
}

export default EmptyState;