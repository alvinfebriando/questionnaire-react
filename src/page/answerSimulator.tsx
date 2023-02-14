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

const AnswerSimulator = () => {
  const handleSubmit = () => {};
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
              <form onSubmit={handleSubmit}>
                <FormControl id='questionCount' isRequired>
                  <FormLabel>Berapa jumlah pertanyaan yang ada?</FormLabel>
                  <Input type={'number'} />
                </FormControl>
                <FormControl id='respondentCount' isRequired>
                  <FormLabel>Berapa jumlah responden?</FormLabel>
                  <Input type={'number'} />
                </FormControl>
                <Box margin={'1rem 0px'}>
                  <h3>
                    Untuk setiap pertanyaan yang ada tentukan skor dominannya
                  </h3>
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
