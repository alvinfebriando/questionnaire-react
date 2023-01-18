import { Checkbox, Stack } from '@chakra-ui/react';

const Question = () => {
  return (
    <>
      <Stack spacing={5} direction='row'>
        <Checkbox isDisabled>Checkbox</Checkbox>
        <Checkbox isDisabled defaultChecked>
          Checkbox
        </Checkbox>
      </Stack>
    </>
  );
};
export default Question;
