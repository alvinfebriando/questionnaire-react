import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import { Controller, FieldArrayWithId, FieldErrors } from 'react-hook-form';
import { QuestionData } from '../page/answerSimulator';

type Props = {
  question: QuestionData;
  index: number;
  errors: any;
  control: any;
};

const ScoreInput = (props: Props) => {
  let label = props.question.question;
  label = label.charAt(0).toUpperCase() + label.slice(1);
  return (
    <FormControl isInvalid={Boolean(props.errors.scores?.[props.index])}>
      <FormLabel>
        {props.index + 1}. {label}
      </FormLabel>
      <FormErrorMessage>
        {props.errors.scores?.[props.index]?.score?.message}
      </FormErrorMessage>
      <Controller
        name={`scores.${props.index}`}
        control={props.control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            onChange={e => {
              onChange({ score: e });
            }}
            value={value.score}
          >
            <Stack
              direction='row'
              margin={'0 auto'}
              width={'25rem'}
              justifyContent='space-between'
            >
              <Radio value='1'>1</Radio>
              <Radio value='2'>2</Radio>
              <Radio value='3'>3</Radio>
              <Radio value='4'>4</Radio>
              <Radio value='5'>5</Radio>
            </Stack>
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export default ScoreInput;
