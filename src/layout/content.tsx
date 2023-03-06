import { Box, Flex } from '@chakra-ui/react';

interface ContentProps {
  children: JSX.Element;
}

const Content = (props: ContentProps) => {
  return (
    <>
      <Box>
        <Flex
          maxW={'760px'}
          margin={'0 auto'}
          justifyContent={'center'}
          py={{ base: 2 }}
          px={{ base: 4 }}
        >
          {props.children}
        </Flex>
      </Box>
      ;
    </>
  );
};

export default Content;
