import {Grid} from "@mui/material";

const text = [
    "Questions? Call 0850-390-7444",
    "FAQ",
    "Cookie Preferences",
    "English",
    "Help Center",
    "Corporate Information",
    "Terms of Use",
    "Privacy"
];

export default function BottomDrawer() {
    return (
        <Grid  style = {{ paddingTop: '5%',  paddingBottom: '3%', backgroundColor: 'rgba(0, 0, 0, 0.8)', color:'white'}} container xs={12} >
            <Grid  item xs={2}/>
            <Grid container xs={9}>
                <Grid item xs={12}>
                    {text[0]}
                </Grid>
                <Grid item xs={3}>
                    <br/> {text[1]} <br/>
                    {text[2]} <br/>
                    {text[3]}
                </Grid>
                <Grid item xs={3}>
                    <br/> {text[4]} <br/>
                    {text[5]}
                </Grid>
                <Grid item xs={3}>
                    <br/> {text[6]}
                </Grid>
                <Grid item xs={3}>
                    <br/> {text[7]}
                </Grid>
            </Grid>
        </Grid>
    );
}

