import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Modal, Box, OutlinedInput} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useRef} from "react";
import axios from 'axios';

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

const RecipeCard = ({ card, refresh, setRefresh }) => {
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
    const editJudul = useRef(null);
    const editDeskripsi = useRef(null);
    const editFoto = useRef(null);

    const deleteHandler = async (event, card)=> {
        event.preventDefault();
        axios.delete( `http://localhost:1234/recipes/` + card.id);
       setRefresh(!refresh);
      } 
    
      const putHandler = async (event, card, editJudul, editDeskripsi, editFoto)=> {
        event.preventDefault();
        
        const editData = {
            judul: editJudul.current.value,
            deskripsi: editDeskripsi.current.value,
            foto: editFoto.current.value,
        };
    
        axios.put( `http://localhost:1234/recipes/` + card.id, editData );
        setRefresh(!refresh);
    }

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
                        <Button size="small" onClick={deleteHandler} >Delete</Button>
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
                    <OutlinedInput
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
                    <OutlinedInput
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
                    <OutlinedInput
                    id="outlined-foto"
                    name="foto"
                    label="foto"
                    inputRef={editFoto}
                    />
                </Box>
                <Button variant="contained" onClick={putHandler}>
                    Edit Menu
                </Button> 
                </Box>
            </Modal>
        </>
    );
};
export default RecipeCard;
