import './App.css';
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField} from "@mui/material";
import background from "./images/background-img.jpg";
import React, {useState} from 'react'
import {auth, getUserMailByPhoneNumber} from "./database/firebase-config";
import {signInWithEmailAndPassword, signInWithPopup, signInWithPhoneNumber, FacebookAuthProvider } from "firebase/auth";


function App(){
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = async () => {
        let emailNotValid = loginEmail.length === 0 || loginEmail.length < 6 || loginEmail.indexOf(' ') >= 0;
        // not a valid input
        if(emailNotValid) {
            return setErrorMessage("Bu e‑posta adresi ile bağlantılı bir hesap bulamadık. " +
                "Lütfen yeniden deneyin ya da yeni bir hesap oluşturun.");
        }
        // is phone number if no @ in string
        if(loginEmail.indexOf('@') < 0) {
            getUserMailByPhoneNumber(loginEmail)
            .then((re) => {
                console.log(re);
                setLoginEmail(re);
            })
            .catch((error) => {
                console.log(error.message());
                setErrorMessage("Bu telefon numarası ile bağlantılı bir hesap bulamadık. " +
                                        "Lütfen yeniden deneyin ya da yeni bir hesap oluşturun.");
            });
        }

        let passwordNotValid = loginPassword.length === 0 || loginPassword.length < 6 || loginPassword.indexOf(' ') >= 0;
        if(passwordNotValid){
            return setErrorMessage("Parola yanlış. Lütfen yeniden deneyin ya da parolanızı sıfırlayın.");
        }
        setErrorMessage("");
        loginWithEmailPassword(loginEmail, loginPassword);
    }

    const loginWithEmailPassword = async (loginEmail, loginPassword) => {
        try {
            const user = signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword,
            )
            console.log(user);
            setErrorMessage("Successful login.");
        } catch (error) {
            console.log(error.message());
            setErrorMessage("Kullanıcı bulunamadı. Error: " + error.message());
        }
    }

    const signInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((re) => {
                console.log(re);
                setErrorMessage("Successful login.");
            })
            .catch((error) => {
                console.log(error.message());
                setErrorMessage("Kullanıcı bulunamadı. Error: " + error.message());
            });
    }

    const pageTitle = "N E T F L I X";
    const paperTitle = "Oturum Aç";

    return (
    <div style={{ backgroundImage: `url(${background})`, height: '100%', margin: 0}}>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <div style={{ paddingLeft: '10%', paddingTop: '3%'}}>
                    <p style = {{ color: 'red', fontSize:'42px', fontFamily:'-moz-initial', fontWeight:'bold'}}>
                        {pageTitle}
                    </p>
                </div>
            </Grid>
            <Grid style={{ paddingTop: '15%', marginBottom: '10%'}}  container xs={3}>
                <Paper style={{paddingBottom: '10%', backgroundColor: 'rgba(0, 0, 0, 0.8)', minWidth: '400px'}}
                        variant="outlined" elevation={3}>
                    <h2 style={{color: "white", paddingTop: '2%', marginLeft: '13%'}} >{paperTitle}</h2>
                    {(errorMessage !== "") &&
                    <Paper style={{marginBottom: '3%', backgroundColor: '#E87C03', marginLeft: '13%', maxWidth: '75%'}}
                              variant="outlined" elevation={5}>
                        <p style={{marginLeft: '5%', color:'white', fontSize: '1rem', maxWidth: '90%'}}>
                            {errorMessage}
                        </p>
                    </Paper>}
                    <TextField style={{ marginLeft: '13%', minWidth:'75%', backgroundColor:'white', borderRadius: 5 }}
                        id="filled-basic"
                        label="E-posta veya telefon numarası"
                        variant="filled"
                        onChange={(event) => setLoginEmail(event.target.value)}/>
                    <TextField style={{ marginTop: '3%', marginLeft: '13%', minWidth:'75%',
                        backgroundColor:'white', borderRadius: 5}}
                        id="filled-basic"
                        label="Parola"
                        variant="filled"
                        onChange={(event) => setLoginPassword(event.target.value)}/>
                    <Button
                        style={{marginTop:'10%', marginLeft:'13%', minHeight:'10%', minWidth:'75%', backgroundColor:"#ff0000"}}
                        variant="contained"
                        onClick={handleSubmit}>
                        Oturum Aç
                    </Button>
                    <FormGroup style={{marginLeft:'13%', maxWidth:'75%', color:'lightgray', flexDirection:'row'}}>
                        <FormControlLabel
                        control={<Checkbox style = {{color: 'white'}} defaultChecked />}
                        label={<span style={{ fontSize: '0.75rem' }}>{"Beni Hatırla"}</span>}
                        />
                        <a style={{marginTop: '4%', marginLeft: '25%', fontSize: '0.78rem',  color:'lightgray'}}>
                            Yardım ister misiniz?</a>
                    </FormGroup>
                    <Button style={{marginLeft: '12%'}}
                        onClick={signInWithFacebook}
                        variant="text">Facebook İle Oturum Aç</Button>
                    <p style={{marginLeft: '13%',  color:'gray', fontSize: '0.9rem'}}>Netflix'e katılmak ister misiniz?
                        <a style={{color:'white'}}> Şimdi kaydolun. </a> </p>
                    <p style={{marginLeft: '13%', maxWidth:'75%', color:'gray', fontSize: '0.9rem'}}>
                        Bu sayfa robot olmadığınızı kanıtlamak için Google reCAPTCHA tarafından korunuyor.
                    </p>
                </Paper>
            </Grid>
            <Grid  style = {{ paddingTop: '3%',  paddingBottom: '3%', backgroundColor: 'rgba(0, 0, 0, 0.8)', color:'white'}} container xs={12} >
                <Grid  item xs={2}/>
                <Grid container xs={9}>
                    <Grid item xs={12}>
                        Sorularınız mı var? 0850-390-7444 numaralı telefonu arayın
                    </Grid>
                    <Grid item xs={3}>
                        <br/> SSS <br/>
                        Çerez Tercihleri <br/>
                        Türkçe (tuş olarak değiştir)
                    </Grid>
                    <Grid item xs={3}>
                        <br/> Yardım Merkezi <br/>
                        Kurumsal Bilgiler
                    </Grid>
                    <Grid item xs={3}>
                        <br/> Kullanım Koşulları
                    </Grid>
                    <Grid item xs={3}>
                        <br/> Gizlilik
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
    );
}

export default App;
