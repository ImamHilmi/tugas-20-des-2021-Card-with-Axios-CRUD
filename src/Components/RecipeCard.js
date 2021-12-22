import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Modal, Box, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useRef} from "react";

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const RecipeCard = ({ card, editJudul, editDeskripsi, editFoto, onDelete, onEdit }) => {
    const classes = useStyles();
    console.log(card)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={card.foto}
                        title={card.judul}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {card.judul}
                        </Typography>
                        <Typography>
                            {card.deskripsi}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={handleOpen} >Edit</Button>
                        <Button size="small" onClick={onDelete} >Delete</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Box
                    component="form"
                    sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                    id="outlined-judul"
                    name="judul"
                    label="judul"
                    inputRef={editJudul}
                    />
                </Box>
                <Box
                    component="form"
                    sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                    id="outlined-deskripsi"
                    name="deskripsi"
                    label="deskripsi"
                    inputRef={editDeskripsi}
                    />
                </Box>
                <Box
                    component="form"
                    sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                    id="outlined-foto"
                    name="foto"
                    label="foto"
                    inputRef={editFoto}
                    />
                </Box>
                <Button variant="contained" onClick={onEdit}>
                    Edit Menu
                </Button> 
                </Box>
            </Modal>
        </>
    );
};
export default RecipeCard;
