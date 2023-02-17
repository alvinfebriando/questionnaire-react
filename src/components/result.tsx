import { Card, CardBody, Flex, Text } from '@chakra-ui/react';

type Props = {
  scores: string;
};

const Result = (props: Props) => (
  <Card>
    <CardBody>
      <Flex>
        <Text>Result: {props.scores}</Text>
      </Flex>
    </CardBody>
  </Card>
);

export default Result;
