import React from 'react';
import {Box, Grid, FilledInput, Select, IconButton, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, CircularProgress } from '@material-ui/core';
import { Close as CloseIcon} from '@material-ui/icons';
import { format } from 'date-fns';

const useStyles = makeStyles((theme)=>({
    info:{
        '&>*':{
            margin:'4px'
        },
    },
    skillChip:{
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: ".3s",
        fontWeight: 600,
        backgroundColor: theme.palette.secondary.main,
        color: "#fff", 
    },
}));

export default (props) => {
    const classes = useStyles();
    return(
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
    <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            {props.job.title} @ {props.job.companyName}
            <IconButton onClick={props.closeModal}>
                <CloseIcon />
            </IconButton>
        </Box>
    </DialogTitle>
    <DialogContent>
        <Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Posted By:</Typography>
                <Typography variant="body2">{props.job.postedby}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Posted on:</Typography>
                <Typography variant="body2">{props.job.postedOn && format(props.job.postedOn, "dd/MMM/yyyy HH:MM")}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Job type:</Typography>
                <Typography variant="body2">{props.job.type}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Location:</Typography>
                <Typography variant="body2">{props.job.location}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Job Description:</Typography>
                <Typography variant="body2">{props.job.description}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Company Name:</Typography>
                <Typography variant="body2">{props.job.companyName}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
                <Typography variant="caption">Company Website:</Typography>
                <Typography variant="body2">{props.job.companyUrl}</Typography>
            </Box>
            <Box ml={0.5}>
                <Typography variant="caption">Skills:</Typography>
                <Grid container alignItems="center">
                {props.job.skills && props.job.skills.map((skill)=> (
                    <Grid key={skill} className={classes.skillChip} item>{skill}</Grid>))}
            </Grid>
            </Box>
        </Box>
    </DialogContent>
    <DialogActions>
              <Button variant="outlined">Apply</Button>
    </DialogActions>
    </Dialog>
    )}