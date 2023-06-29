import React,  { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function SpeakingPart2({questions, setQuestions}) {
  //const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("https://flatiron-phase-2-project.onrender.com/speaking_part2")
      .then((r) => r.json())
      .then((questions) => {
        
        setQuestions(questions)});
  }, []); 
  
  
  
  return ( 
    <div>
    <section>
      <h1>Speaking Part 2 Questions</h1>
      <ol> 
        {questions.map((question) => (
        <QuestionItem key={question.id} question={question} /> ))}
        
      </ol>
    </section>
    
  </div>
  );
}

export default SpeakingPart2;