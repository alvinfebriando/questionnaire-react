import { Card, CardBody, Flex, Text } from '@chakra-ui/react';

type Props = {
  scores: string;
};

const Result = (props: Props) => (
  <Card>
    <CardBody>
      <Flex>
        <Text style={{ whiteSpace: 'pre-wrap' }}>
          {props.scores ? props.scores : 'Result:'}
        </Text>
      </Flex>
    </CardBody>
  </Card>
);

export default Result;
