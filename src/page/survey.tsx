import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { submitSurvey } from '../api/survey';
import Result from '../components/result';

type QuestionInput = {
  name: keyof FormValues;
  label: string;
  type: 'text' | 'date' | 'number';
};

const surveyQuestion: QuestionInput[] = [
  {
    name: 'place',
    label: 'Lingkungan pelaksanaan survey',
    type: 'text',
  },
  {
    name: 'date',
    label: 'Tanggal survey dilaksanakkan',
    type: 'date',
  },
  {
    name: 'subject',
    label: 'Judul survey',
    type: 'text',
  },
  {
    name: 'respondent',
    label: 'Jumlah responden',
    type: 'text',
  },
  {
    name: 'lecturer',
    label: 'Nama dosen',
    type: 'text',
  },
  {
    name: 'answers',
    label: 'Jawaban',
    type: 'text',
  },
];

const SurveySchema = Yup.object().shape({
  place: Yup.string().required('Required!!'),
  date: Yup.date().required('Required!!'),
  subject: Yup.string().required('Required!!'),
  respondent: Yup.string().required('Required!!'),
  lecturer: Yup.string().required('Required!!'),
  answers: Yup.string()
    .required('Required!!')
    .test((v, ctx) => {
      try {
        let data = JSON.parse(v as string);
        if (isValidArray(data, ctx, 13)) {
          if (isValidArray(data[0], ctx)) {
            return true;
          }
        }
        return ctx.createError({ message: 'Invalid input!!' });
      } catch (error) {
        return ctx.createError({ message: 'Is not a valid JSON!!' });
      }
    }),
});

const isValidArray = (
  v: any,
  ctx: Yup.TestContext<Yup.AnyObject>,
  count?: number
) => {
  if (v instanceof Array) {
    if (count != null) {
      return v.length === count;
    }
    return v.length === parseInt(ctx.parent.respondent);
  }
  return false;
};

export type FormValues = {
  place: string;
  date: Date;
  subject: string;
  respondent: string;
  lecturer: string;
  answers: string;
};

const Survey = () => {
  const [result, setResult] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(SurveySchema),
  });
  return (
    <div>
      <Flex
        minH={'90vh'}
        margin='0 auto'
        justifyContent='center'
        alignItems='center'
      >
        <Stack minW={'40rem'}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form
                onSubmit={handleSubmit(async data => {
                  const result = await submitSurvey(data);
                  setResult(result);
                })}
              >
                <>
                  {surveyQuestion.map((v, i) => {
                    let type;
                    if (v.type === 'text') {
                      type = <Input {...register(v.name)} />;
                    } else if (v.type === 'date') {
                      type = (
                        <Input
                          placeholder='Select Date and Time'
                          size='md'
                          type='date'
                          {...register(v.name)}
                        />
                      );
                    }
                    return (
                      <FormControl key={i} isInvalid={Boolean(errors[v.name])}>
                        <FormLabel>{v.label}</FormLabel>
                        {type}
                        <FormErrorMessage>
                          {errors[v.name]?.message}
                        </FormErrorMessage>
                      </FormControl>
                    );
                  })}
                </>
                <Stack spacing={10} pt={2}>
                  <Button
                    size='md'
                    type='submit'
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Generate
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Result scores={result} />
        </Stack>
      </Flex>
    </div>
  );
};

export default Survey;
