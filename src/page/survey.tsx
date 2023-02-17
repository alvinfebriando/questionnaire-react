import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

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
    label: 'Tanggal berapa survey dilaksanakkan',
    type: 'date',
  },
];

const SurveySchema = Yup.object().shape({
  place: Yup.string().required(),
  date: Yup.date().required(),
  subject: Yup.string().required(),
  respondent: Yup.string().required(),
  lecturer: Yup.string().required(),
  questionCount: Yup.number().required(),
  aspectCount: Yup.number().required(),
  answer: Yup.string().required(),
});

export type FormValues = {
  place: string;
  date: Date;
  subject: string;
  respondent: string;
  lecturer: string;
  questionCount: number;
  aspectCount: number;
  answers: string;
};

const Survey = () => {
  const { register, handleSubmit, control } = useForm<FormValues>();
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
              <form onSubmit={handleSubmit(data => console.log(data))}>
                <>
                  {surveyQuestion.map((v, i) => {
                    let type;
                    if (v.type == 'text') {
                      type = <Input {...register(v.name)} />;
                    } else if (v.type == 'date') {
                    }
                    return (
                      <FormControl key={i}>
                        <FormLabel>{v.label}</FormLabel>
                        {type}
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
        </Stack>
      </Flex>
    </div>
  );
};

export default Survey;
