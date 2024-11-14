import { useState } from 'react';
import { isEnvBrowser } from './utils/misc';
import { useNuiEvent } from './hooks/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Title, Text, Flex, Button } from '@mantine/core';

function App() {
  const [opened, { open, close }] = useDisclosure(isEnvBrowser());
  const [visible, setVisible] = useState(isEnvBrowser());
  const [count, setCount] = useState(0);

  useNuiEvent('setVisible', (data: { visible?: boolean }) => {
    setVisible(data.visible || false);
    if (data.visible) open();
  });

  function handleHideModal() {
    close();
    setVisible(false);
    void fetchNui('exit');
  }

  return (
    <>
      {visible && (
        <div className="nui-wrapper">
          <Modal opened={opened} onClose={handleHideModal} centered={true} >
            <Title order={3}>Boilerplate Modal</Title>
            <Text>Count: {count}</Text>

            <Flex direction="row" justify="space-evenly">
              <Button onClick={() => setCount((prev) => ++prev)}>Increment</Button>
              <Button onClick={() => setCount((prev) => --prev)}>Decrement</Button>
            </Flex>
          </Modal>
        </div>
      )}
    </>
  );
}

export default App;
