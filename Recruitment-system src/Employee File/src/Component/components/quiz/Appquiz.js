import React, { useState, useEffect } from 'react';
import './index.css'; 
import { useStateValue } from "../../../StateProvider";
import emailjs from 'emailjs-com';
import { Link, useHistory } from 'react-router-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useParams
  } from "react-router-dom";
import {storage,db} from "../../../firebase";
import firebase from "firebase";

export default function Appquiz(props) {
	const history = useHistory();
	function sendEmail(e){
		e.preventDefault();

		emailjs.sendForm('service_082kn9o', 'template_z6yvlc6', e.target, 'user_yBGuxK9IfZCDaOEecuoSZ')
		  .then((result) => {
			  console.log(result.text);
			  history.push('/Home')
		  }, (error) => {
			  console.log(error.text);
		  });
		  e.target.reset();
	}

	let { id,id1,id2,id3,id4,id5 } = useParams();
	const[{user}, dispatch] = useStateValue();
	const [resume, setResume] = useState([]);
	useEffect(()=>{
        if (!user) return
        db.collection('resumes').orderBy('timestamp','desc').where('username',"==",user&&user.displayName||user.email).onSnapshot(snapshot=>{
            setResume(snapshot.docs.map(doc=>({id: doc.id,resume: doc.data()}))); 
        })
    }, [user])
	const questions = [
		{
			questionText: 'When does the ArrayIndexOutOfBoundsException occur?',
			answerOptions: [
				{ answerText: 'Compile-time', isCorrect: false },
				{ answerText: 'Run-time', isCorrect: true },
				{ answerText: 'Not an error', isCorrect: false },
				{ answerText: 'Not an exception at all', isCorrect: false },
			],
		},
		{
			questionText: 'Which of the following concepts make extensive use of arrays?',
			answerOptions: [
				{ answerText: 'Binary trees', isCorrect: false },
				{ answerText: 'Scheduling of processes', isCorrect: false },
				{ answerText: 'Caching', isCorrect: false },
				{ answerText: 'Spatial locality', isCorrect: true },
			],
		},
		{
			questionText: ' Assuming int is of 4bytes, what is the size of int arr[15];?',
			answerOptions: [
				{ answerText: '15', isCorrect: false },
				{ answerText: '19', isCorrect: false },
				{ answerText: '11', isCorrect: false },
				{ answerText: '60', isCorrect: true },
			],
		},
		{
			questionText: 'Elements in an array are accessed',
			answerOptions: [
				{ answerText: 'randomly', isCorrect: true },
				{ answerText: 'sequentially', isCorrect: false },
				{ answerText: 'exponentially', isCorrect: false },
				{ answerText: 'logarithmically', isCorrect: false },
			],
		},
		{
			questionText: 'which method of an Array object adds and/or removes elements from an array.',
			answerOptions: [
				{ answerText: 'Reverse', isCorrect: false },
				{ answerText: 'Shift', isCorrect: false },
				{ answerText: 'Slice', isCorrect: false },
				{ answerText: 'Splice', isCorrect: true },
			],
		},
		{
			questionText: 'Who is making the Web standards?',
			answerOptions: [
				{ answerText: 'Mozilla', isCorrect: true },
				{ answerText: 'Microsoft', isCorrect: false },
				{ answerText: 'The World Wide Web Consortium', isCorrect: false },
				{ answerText: 'NVDIA', isCorrect: false },
			],
		},
		{
			questionText: 'which keyword is used to declare variables in javascript.',
			answerOptions: [
				{ answerText: 'var', isCorrect: true },
				{ answerText: 'Dim', isCorrect: false },
				{ answerText: 'String', isCorrect: false },
				{ answerText: 'None of the above', isCorrect: false },
			],
		},
		{
			questionText: 'The problem caused by independent multivalued dependencies is eliminated in which of the normal form?',
			answerOptions: [
				{ answerText: '3NF', isCorrect: false },
				{ answerText: 'BCNF', isCorrect: false },
				{ answerText: '4NF', isCorrect: true },
				{ answerText: '5NF', isCorrect: false },
			],
		},
		{
			questionText: 'Which event will be used when a connection to the server is opened.',
			answerOptions: [
				{ answerText: 'onopen', isCorrect: true },
				{ answerText: 'onmessage', isCorrect: false },
				{ answerText: 'onerror', isCorrect: false },
				{ answerText: 'None of the above', isCorrect: false },
			],
		},
		{
			questionText: 'Which of the following is an Open Source DBMS?',
			answerOptions: [
				{ answerText: 'MySQL', isCorrect: true },
				{ answerText: 'Microsoft SQL Server', isCorrect: false },
				{ answerText: 'Microsoft Access', isCorrect: false },
				{ answerText: 'Oracle', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div className='contain'>
		<div className="textauth">
			Session: <span className="usercolor">{user?user.email:null}</span><br/>
			Company Name : <span className="usercolor">{id}</span><br/>
			Company Website : <span className="usercolor">{id1}</span><br/>
		</div>
		<div className='appquiz'>
			{showScore ? (
				<div className='score-section'>
					<div className="tfield">
					<p>Your score has been recorded</p>
					{console.log(resume.imageUrl)}
					</div>
					<form enctype="multipart/form-data" method="post" onSubmit={sendEmail}>
						<input type="text" name="subject" value="New Job Application" style={{visibility:"hidden",display:"none"}}/>
						<input type="text" name="name" value={id} style={{visibility:"hidden",display:"none"}}/>
						<input type="text" name="type" value={id2} style={{visibility:"hidden",display:"none"}}/>
						<input type="text" name="location" value={id3} style={{visibility:"hidden",display:"none"}}/>
						<input type="text" name="description" value={id4} style={{visibility:"hidden",display:"none"}}/>
						<input type="text" name="title" value={id5} style={{visibility:"hidden",display:"none"}}/>
						<input type="text" name="email" value={user?user.email:null} style={{visibility:"hidden",display:"none"}}/>
						<input type="text" name="message" value={score} style={{visibility:"hidden",display:"none"}}/>	
						{
							resume.map(({id, resume})=>(
								
								<input type="text" name="resume" value={resume.imageUrl}  style={{visibility:"hidden",display:"none"}}></input>
								
							))
						}
						<div className="b1">			
							<input type="submit" value="Apply" />
						</div>
					</form>
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button class ='btn1' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
		</div>
		
	);
}
