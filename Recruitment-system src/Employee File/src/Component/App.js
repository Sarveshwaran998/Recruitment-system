import React, { useState, useEffect} from "react";
import { Box,Grid, ThemeProvider , Typography, CircularProgress} from "@material-ui/core";
import theme from "./theme/theme";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import {firestore,app} from './firebase/config'
import ViewJobModal from "./components/Job/ViewJobModal";

export default () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false)
  const [viewJob, setViewJob] = useState({})

  const fetchJobs = async()=>{
    setLoading(true);
    const req= await firestore.collection('jobs').orderBy('postedOn', 'desc').get();
    const tempJobs = req.docs.map((job)=> ({...job.data(), id: job.id, postedOn:job.data().postedOn.toDate() }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const fetchJobsCustom = async jobSearch =>{
    setLoading(true);
    const req= await firestore
    .collection('jobs')
    .orderBy('postedOn', 'desc')
    .where("location",'==',jobSearch.location)
    .where("type",'==',jobSearch.type)
    .get();
    const tempJobs = req.docs.map((job)=> ({...job.data(), id: job.id, postedOn:job.data().postedOn.toDate() }));
    setJobs(tempJobs);
    setLoading(false);
  }

  const postJob = async jobDetails=>{
    await firestore.collection('jobs').add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    });
    fetchJobs();
  };
  useEffect(()=>{
    fetchJobs();
  }, [])
  return <ThemeProvider theme={theme}>
    <NewJobModal closeModal={()=>setNewJobModal(false)} newJobModal={newJobModal} postJob={postJob}/>
    <ViewJobModal job={viewJob} closeModal={()=>setViewJob({ })} />
    <Grid container justify="center">
    <Grid item xs={10}>
    <SearchBar fetchJobsCustom={fetchJobsCustom}/>  
    {
      loading ? (<Box display="flex" justifyContent="center"><CircularProgress/></Box>)
      :(jobs.map((job)=><JobCard open={()=>setViewJob(job)} key={job.id} {...job}/>)
      )}
      
    </Grid>
    </Grid>
  </ThemeProvider>
};
