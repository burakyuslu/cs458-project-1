import './App.css';
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField} from "@mui/material";
import background from "./images/background-img.jpg";
import React, {useState} from 'react'
import {auth, getUserMailByPhoneNumber} from "./database/firebase-config";
import {getAuth, signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import BottomDrawer from "./component/BottomDrawer.js"
import Header from "./component/Header.js"

function App(){

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);


    const handleSubmit = async () => {
        let emailNotValid = loginEmail.length === 0 || loginEmail.length < 6 || loginEmail.indexOf(' ') >= 0;
        // not a valid input
        if(emailNotValid) {
            return setErrorMessage("Missing email or phone value. Please re-enter.");
        }
        // is phone number if no @ in string
        // assumes all phone numbers are Turkish phone numbers
        if(loginEmail.indexOf('@') < 0) {
            // if it contains country code, remove it
            let phoneNumber = loginEmail;
            if(loginEmail.startsWith('+90') === false){
                if(loginEmail.startsWith('0')){
                    phoneNumber = '+9' + loginEmail;
                }
                else {
                    phoneNumber = '+90' + loginEmail;
                }
            }
            if( phoneNumber.length !== 13){
                return setErrorMessage( "Telefon numaranız doğru uzunlukta değil. Lütfen telefon numaranızı kontrol edin.")
            }

            getUserMailByPhoneNumber(phoneNumber)
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
        signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword,
        ).then( (user) => {
            console.log(user);
            setErrorMessage("Successful login.");
            setLoggedIn(true);
            setUser(user);
        }).catch( (error) => {
            console.log(error.message);
            setErrorMessage("Kullanıcı bulunamadı. Error: " + error.message);
        });
    }

    const loginWithFacebook = async () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const isNewUser = credential.additionalUserInfo?.isNewUser;
            if (isNewUser) {
                auth.currentUser.delete();
                // The following error will be handled in your catch statement
                setErrorMessage("Girilen Facebook kullanıcı kayıtlarda bulunamadı."
                                         + "Netflix email ve şifrenizle girmeyi tekrar deneyin.");
            }
            // Otherwise, handle login normally
            setUser(user);
            setErrorMessage("Successful login.");
            setLoggedIn(true);
        }).catch( (err) => {
            if(err.code === 'auth/account-exists-with-different-credential') {
                setErrorMessage("Kullanıcının giriş yöntemi Facebook olarak seçilmemiş."
                    + "Lütfen email ve şifrenizle girmeyi tekrar deneyin.");
            }
            setErrorMessage("Girilen Facebook kullanıcı kayıtlarda bulunamadı."
             + "Netflix email ve şifrenizle girmeyi tekrar deneyin.");
        });
    }

    const screenTexts = [
        "Sign In",
        "User Logged in: ",
        "Sign out",
        "Email or phone number",
        "Password",
        "Remember me",
        "Need help?",
        "Login with Facebook",
        "New to Netflix?",
        "Sign up now.",
        "This page is protected by Google reCAPTCHA to ensure you're not a bot."
    ];

     const logout = async () => {
        await signOut(auth);
        setLoggedIn(false);
        setErrorMessage("");
        setLoginEmail("");
        setLoginPassword("");
        setUser(undefined);
    };

    return (
    <div style={{ backgroundImage: `url(${background})`, height: '100%', margin: 0}}>
        <Grid container spacing={2}>
            <Header/>
            <Grid style={{ paddingTop: '15%', marginBottom: '13%'}}  container xs={3}>
            {(loggedIn && !!user) ? (
                <Paper style={{paddingBottom: '10%', backgroundColor: 'rgba(0, 0, 0, 0.8)', minWidth: '400px'}}
                                                       variant="outlined" elevation={3}>
                    <h1 style={{marginLeft: '13%',  color:'gray', fontSize: '0.9rem'}}>{screenTexts[1]}
                                            <a style={{color:'white'}}> {user?.user?.email} </a> </h1>
                    <Paper style={{marginBottom: '3%', backgroundColor: '#E87C03', marginLeft: '13%', maxWidth: '75%'}}
                          variant="outlined"
                          id = "error_message">
                       <p style={{marginLeft: '5%', color:'white', fontSize: '1rem', maxWidth: '90%'}}>
                           {errorMessage}
                       </p>
                    </Paper>}
                    <Button
                       style={{marginTop:'10%', marginLeft:'13%', minHeight:'10%', minWidth:'75%', backgroundColor:"#ff0000"}}
                       variant="contained"
                       id="logout_button"
                       onClick={logout}>
                       {screenTexts[2]}
                    </Button>
                </Paper>
            ) : (
                <Paper style={{paddingBottom: '10%', backgroundColor: 'rgba(0, 0, 0, 0.8)', minWidth: '400px'}}
                       variant="outlined" elevation={3}>
                    <h2 style={{color: "white", paddingTop: '2%', marginLeft: '13%'}} >{screenTexts[0]}</h2>
                    {(errorMessage !== "") && (
                    <Paper style={{marginBottom: '3%', backgroundColor: '#E87C03', marginLeft: '13%', maxWidth: '75%'}}
                              variant="outlined"
                              id = "error_message">
                        <p style={{marginLeft: '5%', color:'white', fontSize: '1rem', maxWidth: '90%'}}>
                            {errorMessage}
                        </p>
                    </Paper>)}
                    <TextField style={{ marginLeft: '13%', minWidth:'75%', backgroundColor:'white', borderRadius: 5}}
                        id="email_phone_text_field"
                        label={screenTexts[3]}
                        variant="filled"
                        onChange={(event) => setLoginEmail(event.target.value)}
                        onPaste={(e) => {
                            e.preventDefault();
                            return false;
                        }}
                        onCopy={(e) => {
                            e.preventDefault();
                            return false;
                        }}/>
                    <TextField style={{ marginTop: '3%', marginLeft: '13%', minWidth:'75%',
                        backgroundColor:'white', borderRadius: 5}}
                        id="password_text_field"
                        label={screenTexts[4]}
                        variant="filled"
                        type="password"
                        onChange={(event) => setLoginPassword(event.target.value)}
                        onPaste={(e) => {
                            e.preventDefault();
                            return false;
                        }}
                        onCopy={(e) => {
                            e.preventDefault();
                            return false;
                        }}/>
                    <Button
                        style={{marginTop:'10%', marginLeft:'13%', minHeight:'10%', minWidth:'75%', backgroundColor:"#ff0000"}}
                        variant="contained"
                        id="login_button"
                        onClick={handleSubmit}>
                        {screenTexts[0]}
                    </Button>
                    <FormGroup style={{marginLeft:'13%', maxWidth:'75%', color:'lightgray', flexDirection:'row'}}>
                        <FormControlLabel
                        control={<Checkbox style = {{color: 'white'}} defaultChecked />}
                        label={<span style={{ fontSize: '0.75rem' }}>{screenTexts[5]}</span>}
                        />
                        <a style={{marginTop: '4%', marginLeft: '35%', fontSize: '0.78rem',  color:'lightgray'}}>
                            {screenTexts[6]}</a>
                    </FormGroup>
                    <Button style={{marginLeft: '12%'}}
                        onClick={loginWithFacebook}
                            id="login_with_facebook"
                        variant="text">{screenTexts[7]}</Button>
                    <p style={{marginLeft: '13%',  color:'gray', fontSize: '0.9rem'}}>{screenTexts[8]}
                        <a style={{color:'white'}}> {screenTexts[9]} </a> </p>
                    <p style={{marginLeft: '13%', maxWidth:'75%', color:'gray', fontSize: '0.9rem'}}>
                        {screenTexts[10]}
                    </p>
                </Paper>
            )}
            </Grid>
            <BottomDrawer/>
        </Grid>
    </div>
    );
}

export default App;
