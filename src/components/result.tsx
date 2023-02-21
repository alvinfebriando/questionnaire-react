import {
  Button,
  Card,
  CardBody,
  Flex,
  Stack,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import { useEffect } from 'react';

type Props = {
  scores: string;
};

const Result = (props: Props) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  useEffect(() => {
    setValue(props.scores);
  });

  return (
    <Card>
      <CardBody>
        <Flex>
          <Stack>
            <Button onClick={onCopy} width={'5rem'}>
              {hasCopied ? 'Copied!' : 'Copy'}
            </Button>
            <Text style={{ whiteSpace: 'pre-wrap' }}>
              {props.scores ? props.scores : 'Result:'}
            </Text>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Result;
