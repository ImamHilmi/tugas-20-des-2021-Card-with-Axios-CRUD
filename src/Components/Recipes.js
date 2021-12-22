import * as React from 'react';
import {useEffect, useState} from 'react';
import RecipeCard from './RecipeCard'
import useStyles from './Style'
import {Button, Container, CssBaseline, Grid, Typography, Modal, Box, TextField} from "@mui/material";
import axios from "axios";


export default function Recipes() {
  const classes = useStyles();
  const [cards, setCards] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState("");
  // const editJudul = useRef(null);
  // const editDeskripsi = useRef(null);
  // const editFoto = useRef(null);
  
  const judulHandle = (event) => {
    setJudul(event.target.value);
    console.log(event.target.name);
  };

  const deskripsiHandle = (event) => {
    setDeskripsi(event.target.value);
    console.log(event.target.name);
  };

  const fotoHandle = (event) => {
    setFoto(event.target.value);
    console.log(event.target.name);
  };

  const postHandler = async () => {
    const data = {judul, deskripsi, foto};
    axios.post(
      "http://localhost:1234/recipes", data
    );
    setRefresh(!refresh);
    setJudul("");
    setDeskripsi("");
    setFoto("");
  }

//   const deleteHandler = async (event, id)=> {
//     event.preventDefault();
//     axios.delete( `http://localhost:1234/recipes/${id}`);
//    setRefresh(!refresh);
//   } 

//   const putHandler = async (event, id, editJudul, editDeskripsi, editFoto)=> {
//     event.preventDefault();
    
//     const editData = {
//         judul: editJudul.current.value,
//         deskripsi: editDeskripsi.current.value,
//         foto: editFoto.current.value,
//     };

//     axios.put( `http://localhost:1234/recipes/${id}`, editData );
//     setRefresh(!refresh);
// }

  //deps = [] -- dijalankan hanya sekali
  useEffect(()=>{
    console.log('useEffect')
    axios.get('http://localhost:1234/recipes').then(res => {
      setCards(res.data)
    })
  },[refresh])

  const doRefresh = () => {
    console.log('doRefresh')
    setRefresh(!refresh)
  }

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
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Button onClick={doRefresh}>Refresh</Button>
            <Button onClick={handleOpen}>Tambah Menu</Button>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Recipes
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Aneka macam ide resep masakan dan makanan yang simpel
              tersaji disini untuk memberi panduan dan mempermudah dalam menentukan hidangan lezat untuk
              keluarga anda
            </Typography>
            <div className={classes.heroButtons}>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <RecipeCard key={card.id} card={card} setRefresh={setRefresh} refresh={refresh} />
            ))}
          </Grid>
        </Container>
      </main>

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
              value={judul}
              onChange={judulHandle}
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
              value={deskripsi}
              onChange={deskripsiHandle}
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
              value={foto}
              onChange={fotoHandle}
            />
          </Box>
          <Button variant="contained" onClick={postHandler}>
            Post
          </Button> 
        </Box>
      </Modal>
    </React.Fragment>
  );
}
