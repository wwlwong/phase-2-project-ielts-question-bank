import React, { useState, useEffect } from "react";


function QuestionForm({questions1, setQuestions1, questions2, setQuestions2, questions3, setQuestions3}) {

    const [formData, setFormData] = useState({
        part: "",
        topic: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
        views: 0,
      });

    const initialFormData = {
      part: "",
      topic: "",
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      question6: "",
      views: 0,
    }

    const modalDisplayTime = 3000;

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      let timeout;
      if (showModal) {
        timeout = setTimeout(() => {
          setShowModal(false);
        }, modalDisplayTime);
      }
      return () => clearTimeout(timeout);
    }, [showModal]);
  

    function handleChange(event) {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value,
    });
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        fetch(`https://flatiron-phase-2-project.onrender.com/${formData.part}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
          {
            "topic": formData.topic,
            "questions": [formData.question1, formData.question2, formData.question3, formData.question4, formData.question5, formData.question6],
            "views": parseInt(formData.views),
          } )
        })
        .then((r) => r.json())
        .then((newQuestion) => {
          if (formData.part === "speaking_part1"){
            setQuestions1([...questions1, newQuestion]);
          }
          else if (formData.part === "speaking_part2"){
            setQuestions2([...questions2, newQuestion]);
          } 
          else {
            setQuestions3([...questions3, newQuestion]);
          }
          });
        setShowModal(true);
        setFormData(initialFormData);  
      }


    return (
    <section>
      <h1>Create new question</h1>
      <form className="question-entry" onSubmit={handleSubmit}>
        <label className='form-label'>
            Speaking Part Number
            <select className="dropdown" name="part" value={formData.part} onChange={handleChange}>
                <option value="" selected disabled="true">Select part number</option>
                <option value="speaking_part1">Speaking Part 1</option>
                <option value="speaking_part2">Speaking Part 2</option>
                <option value="speaking_part3">Speaking Part 3</option>
            </select>
        </label>
        <label className='form-label'>
            Topic:
            <input
            className="text-box"
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          />
        </label>
        <label  className='form-label'>
          Question 1:
          <input
            className="text-box"
            type="text"
            name="question1"
            value={formData.question1}
            onChange={handleChange}
          />
        </label>
        <label  className='form-label'>
            Question 2:
          <input
            className="text-box"
            type="text"
            name="question2"
            value={formData.question2}
            onChange={handleChange}
          />
        </label>
        <label className='form-label'>
            Question 3:
          <input
            className="text-box"
            type="text"
            name="question3"
            value={formData.question3}
            onChange={handleChange}
          />
        </label>
        <label className='form-label'>
            Question 4:
          <input
            className="text-box"
            type="text"
            name="question4"
            value={formData.question4}
            onChange={handleChange}
          />
        </label>
        <label className='form-label'>
          Question 5:
          <input
            className="text-box"
            type="text"
            name="question5"
            value={formData.question5}
            onChange={handleChange}
          />
        </label>
        <label className='form-label'>
          Question 6:
          <input
            className="text-box"
            type="text"
            name="question6"
            value={formData.question6}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="submit-btn">
            Submit
        </button>
     </form>
     {showModal && <div><h3>Questions Submitted</h3></div>}
    </section>
    
      
    );
  }
  
  export default QuestionForm;