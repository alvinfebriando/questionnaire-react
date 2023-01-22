import { useCallback } from 'react';
import { Model, StylesManager } from 'survey-core';
import 'survey-core/modern.min.css';
import { Survey } from 'survey-react-ui';
import surveyJson from '../data/survey.json';

StylesManager.applyTheme('modern');

const Question = () => {
  const survey = new Model(surveyJson);
  const alertResult = useCallback((sender: Model) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);
  survey.onComplete.add(alertResult);
  return <Survey model={survey} />;
};
export default Question;
