import './App.css';
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField} from "@mui/material";
import background from "./images/background-img.jpg";
import React, {Component, useState} from 'react'
import {auth} from "./database/firebase-config";
import {signInWithEmailAndPassword, signInWithPopup, signInWithPhoneNumber, FacebookAuthProvider, RecaptchaVerifier } from "firebase/auth";


function App(){

   const[loginEmail, setLoginEmail] = useState("");
   const[loginPassword, setLoginPassword] = useState("");
   const[loginPhone, setLoginPhone] = useState("");
   const[loginPhonePassword, setLoginPhonePassword] = useState();


   const login = async () => {
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

    // const configureCaptcha = () => {
    //    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    //       'size': 'invisible',
    //       'callback': (response) => {
    //          // reCAPTCHA solved, allow signInWithPhoneNumber.
    //          onSignInSubmit();
    //          console.log("Recaptcha verified.")
    //       },
    //    });
    // }

    // const onSignInSubmit = (e) => {
    //   e.preventDefault();
    //   configureCaptcha();
    //   const phoneNumber = "+90" + this.state.mob;
    //   console.log(phoneNumber);
    //   const appVerifier = window.recaptchaVerifier;
    //
    //   auth.signInWithPhoneNumber(phoneNumber, appVerifier)
    //       .then((confirmationResult) => {
    //          // SMS sent. Prompt user to type the code from the message, then sign the
    //          // user in with confirmationResult.confirm(code).
    //          window.confirmationResult = confirmationResult;
    //          console.log("OTP has been sent");
    //       }).catch((error) => {
    //          console.log("SMS not sent");
    //       });
    //   }

      return (
      <div style={{ backgroundImage: `url(${background})` }} >
         <Grid container spacing={2}>

            <Grid item xs={5}>
               <div style={{ paddingLeft: '10%', paddingTop: '3%'}}>
                  <p style = {{ color: 'red', fontSize:'42px', fontFamily:'-moz-initial', fontWeight:'bold'}}> N E T F L I X </p>

                  {/*} TODO uncomment or remove
                  <p style = {{ color:'white'}}>
                     Developed By:
                     <ul>
                        <li>Can Kırşallıoba</li>
                        <li>Burak Yiğit Uslu</li>
                        <li>Elif Kurtay </li>
                        <li>Pelin Çeliksöz</li>
                     </ul>
                  </p> */}

               </div>

            </Grid>
            <Grid style={{ paddingTop: '8%', marginBottom: '10%'}}  container xs={2}>
               <Paper style = {{ backgroundColor: 'rgba(0, 0, 0, 0.8)'}} container variant="outlined" elevation={3}>
                  <h2 style={{ color: "white", paddingTop: '2%', paddingLeft: '5%'}} > Oturum Aç </h2>
                  {/*<TextField style={{ marginTop: '2%', marginLeft: '5%', minWidth:'90%', backgroundColor:'lightgray' }} id="filled-basic" label="E-posta veya telefon numarası" variant="filled" onChange={(event) => setLoginPhone(event.target.value)}/>*/}
                  {/*<TextField style={{ marginTop: '2%', marginLeft: '5%', minWidth:'90%', backgroundColor:'lightgray'}} id="filled-basic" label="Parola" variant="filled" onChange={(event) => setLoginPhonePassword(event.target.value)}/>*/}
                  {/*<Button  onClick={login} style={{ marginTop: '2%', marginLeft: '5%', minWidth:'90%', backgroundColor: "#ff0000 ",}} variant="contained">Oturum Aç</Button>*/}
                  <TextField style={{ marginTop: '2%', marginLeft: '5%', minWidth:'90%', backgroundColor:'lightgray' }} id="filled-basic" label="E-posta veya telefon numarası" variant="filled" onChange={(event) => setLoginEmail(event.target.value)}/>
                  <TextField style={{ marginTop: '2%', marginLeft: '5%', minWidth:'90%', backgroundColor:'lightgray'}} id="filled-basic" label="Parola" variant="filled" onChange={(event) => setLoginPassword(event.target.value)}/>
                  <Button  onClick={login} style={{ marginTop: '2%', marginLeft: '5%', minWidth:'90%', backgroundColor: "#ff0000 ",}} variant="contained">Oturum Aç</Button>
                  <FormGroup style = {{marginLeft: '5%', maxWidth: '50%', color:'white'}}>
                     <FormControlLabel  control={<Checkbox style = {{ color: "#ff0000 "}} defaultChecked />} label="Beni Hatırla" />
                  </FormGroup>
                  <p style = {{marginLeft: '5%', color:'white' }}> <a style = {{marginLeft: '0%'}} href={''}> Yardım ister misiniz? </a> </p>
                  <Button onClick={signInWithFacebook} style = {{marginLeft: '5%',}} variant="text"> Facebook İle Oturum Aç </Button>
                  <p style = {{marginLeft: '5%', color:'white'}}> Netflix'e katılmak ister misiniz?  <a href={''}> Şimdi kaydolun. </a> </p>
                  <p style = {{marginLeft: '5%', color:'white'}}> Bu sayfa robot olmadığınızı kanıtlamak için Google reCAPTCHA tarafından korunuyor. </p>
               </Paper>



            </Grid>
            <Grid item xs={5}>


            </Grid>


            <Grid  style = {{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color:'white'}} container xs={12} >

               <Grid  item xs={3}/>
               <Grid container xs={6}>
                  <Grid item xs={12}>
                     Sorularınız mı var? 0850-390-7444 numaralı telefonu arayın
                  </Grid>

                  <Grid item xs={3}>
                     SSS <br/>
                     Çerez Tercihleri <br/>
                     Türkçe (tuş olarak değiştir)
                  </Grid>
                  <Grid item xs={3}>
                     Yardım Merkezi <br/>
                     Kurumsal Bilgiler
                  </Grid>
                  <Grid item xs={3}>
                     Kullanım Koşulları
                  </Grid>
                  <Grid item xs={3}>
                     Gizlilik
                  </Grid>
               </Grid>
               <Grid item xs={3}/>
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