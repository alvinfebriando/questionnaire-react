import { FormData, FormInput } from '../page/answerSimulator';

type JSONResponse = {
  scores: number[][];
};

type JSONRequest = {
  respondentCount: number;
  dominantScores: number[];
};

export const fetchAnswer = async (
  formData: FormData
): Promise<JSONResponse> => {
  const url = 'https://localhost:7145/api/simulator';
  const scores = formData.scores.map(v => parseInt(v.score));
  const body: JSONRequest = {
    respondentCount: formData.respondentCount,
    dominantScores: scores,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });
  const data: JSONResponse = await response.json();
  return data;
};

export const fetchQuestions = async () => {
  const url = 'https://localhost:7145/api/question';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  });
  const data = await response.json();
  return data;
};
