import React, {useState} from 'react';
import {Box, Grid, FilledInput, Select, IconButton, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, CircularProgress } from '@material-ui/core';
import {Close as CloseIcon} from '@material-ui/icons';
import { useStateValue } from "../../../StateProvider";

const useStyles = makeStyles((theme) =>({
    skillChip:{
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`, 

        "&:hover":{
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
        },
    },
    included:{ 
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
    }
}))


const initState = {
    title:"",
    postedby:"",
    type:"Full Time",
    companyName:"",
    companyUrl:"",
    location:"Remote",
    salary: "",
    descriptions:"",
    skills: [],
}

export default (props) => {
    const[{user}, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);
    const [jobDetails, setJobDetails] = useState(initState);
    initState.postedby = user?user.email:null;
    const handleChange = e =>{
    e.persist();
    setJobDetails(oldState=>({...oldState, [e.target.name]:e.target.value,
    }));
    };

    const addRemoveSkill = skill => jobDetails.skills.includes(skill)
        ? setJobDetails(oldState=>({...oldState, skills: oldState.skills.filter((s)=>s !==skill)}))
        : setJobDetails(oldState=>({...oldState, skills: oldState.skills.concat(skill)}));
    
    const handleSubmit= async ()=>{
        setLoading(true);
        await props.postJob(jobDetails);
        closeModal();
    }

    const closeModal = () =>{
        setJobDetails(initState)
        setLoading(false);
        props.closeModal();
    };
    const classes = useStyles();
    const skills=[
        "Javascript",
        "MongoDB",
        "SQL",
        "AWS",
        "PYTHON",
        "C",
        "C++",
        "JAVA",
        "R",
    ];
    console.log(jobDetails);
    return(
        <Dialog open={props.newJobModal} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Post job
                    <IconButton onClick={closeModal}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="title" value={jobDetails.title} autoComplete="off" placeholder="Job title *" disableUnderline fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="type" value={jobDetails.type} fullWidth disableUnderline variant="filled">
                            <MenuItem value="Full Time">Full Time</MenuItem>
                            <MenuItem value="Part Time">Part Time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyName" value={jobDetails.companyName} autoComplete="off" placeholder="Comapny Name *" disableUnderline fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyUrl" value={jobDetails.companyUrl} autoComplete="off" placeholder="Comapny URL *" disableUnderline fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="location" value={jobDetails.location} fullWidth disableUnderline variant="filled">
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="In-office">In-office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="salary" value={jobDetails.salary} autoComplete="off" placeholder="Salary *" disableUnderline fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange} name="description" value={jobDetails.description} autoComplete="off" placeholder="Job description *" disableUnderline fullWidth multiline rows={4}/>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box display="flex">
                        {skills.map((skill) =>( 
                            <Box onClick={()=>addRemoveSkill(skill)} className={`${classes.skillChip} ${jobDetails.skills.includes(skill)&&classes.included}`} key={skill}>{skill}</Box>
                        ))}
                        </Box>
                    </Box>
            <DialogActions>
                            <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                                <Typography>*Required Fields</Typography>
                                <Button onClick={handleSubmit} variant="contained" disableElevation color="primary" disabled={loading}>
                                {loading? (<CircularProgress color="secondary" size={22}/>):("Post job")
                        }</Button>
                            </Box>
            </DialogActions>
            </DialogContent>
        </Dialog>     
    )
}