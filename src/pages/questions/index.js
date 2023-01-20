import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../../components/Card";

const QuestionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const stackOverflowAPI =
  "https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&tagged=reactjs&site=stackoverflow";

function Questions() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(stackOverflowAPI);
      const result = await data.json();

      if (result) {
        setQuestions(result.items);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <QuestionsContainer>
      <h2>Questions</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          {questions.map((question) => (
            <Card
              key={question.question_id}
              title={question.title}
              views={question.view_count}
              answers={question.answer_count}
            />
          ))}
        </div>
      )}
    </QuestionsContainer>
  );
}

export default Questions;