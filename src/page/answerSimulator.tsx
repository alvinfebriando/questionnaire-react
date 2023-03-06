import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { fetchAnswer } from '../api/simulator';
import Result from '../components/result';
import ScoreInput from '../components/scoreInput';

const MAX_QUESTION = 20;

const AnswerSchema = Yup.object()
  .shape({
    questionCount: Yup.number()
      .min(1, 'Too Short!')
      .max(MAX_QUESTION, 'Too Long!')
      .required(),
    respondentCount: Yup.number()
      .min(1, 'Too Short!')
      .max(100, 'Too Long')
      .required(),
    scores: Yup.array().of(
      Yup.object().shape({
        score: Yup.string().required('Field is required'),
      })
    ),
  })
  .required();

export type FormData = {
  questionCount: number;
  respondentCount: number;
  scores: { score: string }[];
};

export type FormInput = {
  respondentCount: number;
  scores: string[];
};

const AnswerSimulator = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      questionCount: 13,
      respondentCount: 50,
      scores: [{ score: '' }],
    },
    resolver: yupResolver(AnswerSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'scores',
    control,
  });

  const questionCount = watch('questionCount');

  const [scores, setScores] = useState<string>('[ ]');

  useEffect(() => {
    // update field array when ticket number changed
    const newVal = questionCount;
    const oldVal = fields.length;
    if (newVal > oldVal) {
      // append tickets to field array
      for (let i = oldVal; i < newVal; i++) {
        append({ score: '' });
      }
    } else {
      // remove tickets from field array
      for (let i = oldVal; i > newVal; i--) {
        remove(i - 1);
      }
    }
  }, [questionCount]);

  const generateAnswer = async (data: FormData) => {
    const answer = await fetchAnswer(data);
    setScores(JSON.stringify(answer.scores));
  };

  return (
    <>
      <Flex minH={'90vh'} align={'center'} justify={'center'} margin='0 auto'>
        <Stack minW={'50rem'}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(generateAnswer)}>
                <FormControl isInvalid={Boolean(errors.respondentCount)}>
                  <FormLabel>Berapa jumlah responden?</FormLabel>
                  <NumberInput>
                    <NumberInputField {...register('respondentCount')} />
                  </NumberInput>
                  <FormErrorMessage>
                    {errors.respondentCount?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.questionCount)}>
                  <FormLabel>Berapa jumlah pertanyaan yang tersedia?</FormLabel>
                  <Select {...register('questionCount')} isDisabled={true}>
                    {[...Array(MAX_QUESTION)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.questionCount?.message}
                  </FormErrorMessage>
                </FormControl>
                <Box margin={'1rem 0px'}>
                  <Stack>
                    <Heading as='h4' size='sm'>
                      Tentukan skor dominan yang diinginkan
                    </Heading>
                    {fields.map((field, index) => {
                      return (
                        <ScoreInput
                          key={field.id}
                          index={index}
                          errors={errors}
                          control={control}
                        />
                      );
                    })}
                  </Stack>
                </Box>
                <Stack spacing={10} pt={2}>
                  <Button
                    size='lg'
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
          <Result scores={scores}></Result>
        </Stack>
      </Flex>
    </>
  );
};

export default AnswerSimulator;
