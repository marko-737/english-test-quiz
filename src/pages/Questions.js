import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { quizData } from "../components/quizData";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = ({ setLastQuestionFlag }) => {
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  const name = localStorage.getItem("name") || "";
  const email = localStorage.getItem("email") || "";

  const [score, setScore] = useState(
    parseInt(localStorage.getItem("score"), 10) || 0
  );

  const [questionIndex, setQuestionIndex] = useState(
    parseInt(localStorage.getItem("currentQuestionIndex"), 10) || 0
  );
  const [options, setOptions] = useState([]);
  const [lastQuestion, setLastQuestion] = useState(false);

  useEffect(() => {
    if (quizData?.length) {
      const question = quizData[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [questionIndex]);

  useEffect(() => {
    if (!lastQuestion) {
      localStorage.setItem("currentQuestionIndex", questionIndex.toString());
      localStorage.setItem("score", score.toString());
    }
  }, [questionIndex, score, lastQuestion]);

  const sendEmail = () => {
    const incorrectAnswersMessage = incorrectAnswers
      .map(
        (answer) =>
          `Question: ${answer.question}\nStudent Answer: ${answer.selectedAnswer}\nCorrect Answer: ${answer.correctAnswer}`
      )
      .join("\n\n");

    let level;
    if (score <= 20) {
      level = "Below Elementary";
    } else if (score <= 35) {
      level = "Elementary";
    } else if (score <= 60) {
      level = "Pre-Intermediate";
    } else if (score <= 85) {
      level = "Intermediate";
    } else {
      level = "Upper Intermediate";
    }

    const message = `Score: ${score}/${quizData?.length}\nLevel: ${level}\nName: ${name}\nEmail: ${email}\n\nIncorrect Answers:\n${incorrectAnswersMessage}`;
    emailjs
      .send(
        "service_0773kwm",
        "template_4qqb7rd",
        { from_name: name, from_email: email, message },
        "eXb81EXAsWVNMLK9y"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        localStorage.clear();
      });
  };

  const handleClickAnswer = (e) => {
    const question = quizData?.[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      setScore(score + 1);
    } else {
      const incorrectAnswer = {
        question: question.question,
        selectedAnswer: e.target.textContent,
        correctAnswer: question.correct_answer,
      };
      setIncorrectAnswers((prevAnswers) => [...prevAnswers, incorrectAnswer]);
    }

    if (questionIndex + 1 < quizData?.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setLastQuestion(true);
      setLastQuestionFlag(true);
    }
  };

  if (lastQuestion) {
    sendEmail();
  }

  return lastQuestion ? (
    <Typography variant="h4">Thanks, Someone will contact you soon.</Typography>
  ) : (
    <Box>
      <Typography
        variant="h4"
        mt={3}
        sx={{
          fontSize: {
            xs: 26,
          },
        }}
      >
        Question {questionIndex + 1}/{quizData?.length}
      </Typography>
      <Typography variant="h5" mt={3}>
        {decode(quizData?.[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <Box mt={2} key={id}>
          <Button
            onClick={handleClickAnswer}
            variant="contained"
            style={{ textTransform: "none", fontSize: "20px" }}
          >
            {decode(data)}
          </Button>
        </Box>
      ))}
      <Box mt={5}>
        Score: {score} / {quizData?.length}
      </Box>
    </Box>
  );
};

export default Questions;
