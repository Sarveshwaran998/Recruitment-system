import React, { useState, useEffect} from "react";
import { Box,Grid, ThemeProvider , Typography, CircularProgress} from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
//import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import {firestore,app} from './firebase/config'
import ViewJobModal from "./components/Job/ViewJobModal";
import { useStateValue } from "../StateProvider";
export default () => {
  const[{user}, dispatch] = useStateValue();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false)
  const [viewJob, setViewJob] = useState({})
  const fetchJobs = async () =>{
    setLoading(true);
    const req= await firestore.collection('jobs').where("postedby","==",user&&user.email).orderBy('postedOn', 'desc').get();
    const tempJobs = req.docs.map((job)=> ({...job.data(), id: job.id, postedOn:job.data().postedOn.toDate()}));
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
    .where("postedby","==",user&&user.email)
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
  useEffect(() => {
    if (!user) return
    fetchJobs()
  },[user]) 
  return <ThemeProvider theme={theme}>
    <Header openNewJobModal={()=>setNewJobModal(true)}/>
    <NewJobModal closeModal={()=>setNewJobModal(false)} newJobModal={newJobModal} postJob={postJob}/>
    <ViewJobModal job={viewJob} closeModal={()=>setViewJob({ })} />
    <Grid container justify="center">
    <Grid item xs={10}>
    <p>Your Posted Jobs</p>
    {
      loading ? (<Box display="flex" justifyContent="center"><CircularProgress/></Box>)
      :(jobs.map((job)=><JobCard open={()=>setViewJob(job)} key={job.id} {...job}/>)
      )}
      
    </Grid>
    </Grid>
  </ThemeProvider>
};
