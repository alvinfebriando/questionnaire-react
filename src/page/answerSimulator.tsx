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
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const AnswerSchema = Yup.object()
  .shape({
    questionCount: Yup.number()
      .min(1, 'Too Short!')
      .max(20, 'Too Long!')
      .required(),
    respondentCount: Yup.number()
      .min(1, 'Too Short!')
      .max(100, 'Too Long')
      .required(),
  })
  .required();

type FormValues = {
  questionCount: number;
  respondentCount: number;
  scores: {
    name: string;
    score: string;
  }[];
};

const AnswerSimulator = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      questionCount: 1,
      respondentCount: 1,
      scores: [{ name: '', score: '1' }],
    },
    resolver: yupResolver(AnswerSchema),
  });
  const { fields } = useFieldArray({
    name: 'scores',
    control: control,
  });

  return (
    <>
      <Flex minH={'90vh'} align={'center'} justify={'center'} margin='0 auto'>
        <Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form
                onSubmit={handleSubmit(data => {
                  console.log(data);
                })}
              >
                <FormControl isInvalid={Boolean(errors.respondentCount)}>
                  <FormLabel>Berapa jumlah responden?</FormLabel>
                  <NumberInput>
                    <NumberInputField {...register('respondentCount')} />
                  </NumberInput>
                  <FormErrorMessage>
                    {errors.respondentCount?.message}
                  </FormErrorMessage>
                </FormControl>
                <Box margin={'1rem 0px'}>
                  <Stack>
                    <Heading as='h4' size='sm'>
                      Tentukan skor dominan
                    </Heading>
                    {fields.map((field, index) => {
                      return (
                        <FormControl key={field.id}>
                          <FormLabel>Pertanyaan ke {index + 1}</FormLabel>
                          <Controller
                            name={`scores.${index}`}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <RadioGroup
                                onChange={onChange}
                                value={value.score}
                              >
                                <Stack direction='row'>
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
        </Stack>
      </Flex>
    </>
  );
};

export default AnswerSimulator;
