import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "../../components/Card";

const QuestionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const CardLink = styled.a`
  text-decoration: none;
`;

const stackOverflowAPI = `https://api.stackexchange.com/2.2/questions?${
  page ? `page=${page}&` : ""
}order=desc&sort=hot&tagged=reactjs&site=stackoverflow`;

function Questions() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const router = useRouter();
  const { page } = router.query;

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
            <Link
              key={question.question_id}
              href={`/questions/${question.question_id}`}
              passHref
            >
              <CardLink>
                <Card
                  key={question.question_id}
                  title={question.title}
                  views={question.view_count}
                  answers={question.answer_count}
                />
              </CardLink>
            </Link>
          ))}
        </div>
      )}
    </QuestionsContainer>
  );
}

export default Questions;
