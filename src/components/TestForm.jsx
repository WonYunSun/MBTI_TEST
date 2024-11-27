import { useState } from "react";
import { questions } from "../data/questions";
import styled from "styled-components";

// 스타일링
const FormContainer = styled.form`
  padding: 2rem;

  border-radius: 10px;
  box-sizing: border-box;
  width: 100%;
`;

const QuestionContainer = styled.div`
  margin-bottom: 3rem;
`;

const QuestionText = styled.p`
  font-weight: 800;
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
`;

const OptionLabel = styled.label`
  display: block;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  ${({ selected }) =>
    selected &&
    `
      background-color: #5658bd;
    `}

  &:hover {
    background-color: #5658bd;
  }
`;

const OptionInput = styled.input`
  margin-right: 0.5rem;
  color: #ff4c4c;
`;

const SubmitButton = styled.button`
  width: 100%;

  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(
    Array(questions.length).fill({ type: "", answer: "" })
  );

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = { type: questions[index].type, answer: value };
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Answers:", answers);
    onSubmit(answers);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {questions.map((q, index) => (
        <QuestionContainer key={q.id}>
          <QuestionText>{q.question}</QuestionText>
          <div>
            {q.options.map((option, i) => (
              <OptionLabel
                key={i}
                selected={answers[index]?.answer === q.type.split("/")[i]}
              >
                <OptionInput
                  type="radio"
                  name={`question-${index}`}
                  value={q.type.split("/")[i]}
                  checked={answers[index]?.answer === q.type.split("/")[i]}
                  onChange={() => handleChange(index, q.type.split("/")[i])}
                />
                {option}
              </OptionLabel>
            ))}
          </div>
        </QuestionContainer>
      ))}
      <SubmitButton type="submit">제출하기</SubmitButton>
    </FormContainer>
  );
};

export default TestForm;
