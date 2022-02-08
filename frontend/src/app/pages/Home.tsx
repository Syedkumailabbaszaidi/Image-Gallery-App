import { ReactElement, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import ImagesTab from 'app/modules/image/ImagesTab';
import SharedWithMeTab from 'app/modules/image/SharedWithMeTab';
import { useAppSelector } from 'store/hooks';

const Home = (): ReactElement => {
  const { imagesCount, sharedWithMeCount } = useAppSelector(({ image }) => image);

  const [value, setValue] = useState('one');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        centered
      >
        <Tab value="one" label={`Your Images (${imagesCount})`} />
        <Tab value="two" label={`Shared With You (${sharedWithMeCount})`} />
      </Tabs>
      {value === 'one' && (
        <Box sx={{ mt: 2 }}>
          <ImagesTab />
        </Box>
      )}
      {value === 'two' && (
        <Box sx={{ mt: 2 }}>
          <SharedWithMeTab />
        </Box>
      )}
    </Box>
  );
};

export default Home;
