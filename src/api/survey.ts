import { FormValues } from '../page/survey';

export const submitSurvey = async (values: FormValues) => {
  const url = 'https://localhost:7145/api/survey';
  const averaged = JSON.parse(values.answers).map(
    (arr: any) => arr.reduce((a: any, b: any) => a + b, 0) / arr.length
  );
  const body = {
    place: values.place,
    date: values.date.toISOString().split('T')[0],
    subject: values.subject,
    respondent: values.respondent,
    lecturer: values.lecturer,
    questionCount: 13,
    aspectCount: 6,
    answers: averaged,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });
  const data = await response.text();
  return data;
};
