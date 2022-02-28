import {Grid} from "@mui/material";

const title = "N E T F L I X";

export default function Header() {
    return (
        <Grid item xs={4}>
            <div style={{ paddingLeft: '10%', paddingTop: '3%'}}>
                <p style = {{ color: 'red', fontSize:'42px', fontFamily:'-moz-initial', fontWeight:'bold'}}>
                    {title}
                </p>
            </div>
        </Grid>
    );
}