import './App.css';
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField} from "@mui/material";
import background from "./images/background-img.jpg";
import React, {Component, useState} from 'react'
import {auth} from "./database/firebase-config";
import {signInWithEmailAndPassword, signInWithPopup, signInWithPhoneNumber, FacebookAuthProvider, RecaptchaVerifier } from "firebase/auth";


function App(){

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginPhone, setLoginPhone] = useState("");
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handleSubmit = () => {
        var emailValid = false;
        if(loginEmail.length === 0){
            setEmailError("Email is required");
        }
        else if(loginEmail.length < 6){
            setEmailError("Email should be minimum 6 characters");
        }
        else if(loginEmail.indexOf(' ') >= 0){
            setEmailError('Email cannot contain spaces');
        }
        else{
            setEmailError("")
            emailValid = true
        }

        var passwordValid = false;
        if(loginPassword.length === 0){
            setPasswordError("Password is required");
        }
        else if(loginPassword.length < 6){
            setPasswordError("Password should be minimum 6 characters");
        }
        else if(loginPassword.indexOf(' ') >= 0){
            setPasswordError('Password cannot contain spaces');
        }
        else{
            setPasswordError("")
            passwordValid = true
        }

        if(emailValid && passwordValid){
            loginWithEmailPassword(loginEmail, loginPassword)
        }
    }

   const loginWithEmailPassword = async (loginEmail, loginPassword) => {
      try{
         const user = signInWithEmailAndPassword(
             auth,
             loginEmail,
             loginPassword,
         )
         console.log(user);
      } catch (error) {
         console.log(error.message());
      }
   }

    const signInWithFacebook = () => {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
          .then((re) => {
             console.log(re);
          })
          .catch((error) => {
             console.log(error.message());
          })
    }

    const pageTitle = "N E T F L I X";
    const paperTitle = "Oturum Aç";

    return (
      <div style={{ backgroundImage: `url(${background})`, height: '100%', margin: 0}} >
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
                  {}
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
                    style={{ marginTop: '5%', marginLeft: '13%', minHeight:'12%', minWidth:'75%', backgroundColor: "#ff0000 "}}
                    variant="contained"
                    onClick={handleSubmit}>
                    Oturum Aç
                  </Button>
                  <FormGroup style = {{marginLeft: '13%', maxWidth: '75%', color:'lightgray', fontSize: '8', flexDirection: 'row'}}>
                     <FormControlLabel
                        control={<Checkbox style = {{color: 'white'}} defaultChecked />}
                        label={<span style={{ fontSize: '0.75rem' }}>{"Beni Hatırla"}</span>}
                     />
                     <a style={{marginTop: '4%', marginLeft: '25%', fontSize: '0.78rem',  color:'lightgray' }}>
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
                  <br/>
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

/*
     <>

        <fb:login-button
          scope="public_profile,email"
          onlogin="checkLoginState();">
        </fb:login-button>
     </>

 */

/*
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '{your-app-id}',
          cookie     : true,
          xfbml      : true,
          version    : '{api-version}'
        });

        FB.AppEvents.logPageView();

      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
 */



/* Facebook SDK
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });

    FB.AppEvents.logPageView();

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>

CHECK LOGIN

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});

Response:
{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}
*/