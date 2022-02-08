import { ReactChild, ReactElement } from 'react';
import Appbar from 'app/molecules/Appbar';

interface Layout1Props {
  children: ReactChild;
}

const Layout1 = (props: Layout1Props): ReactElement => {
  return (
    <>
      <Appbar />
      {props.children}
    </>
  );
};

export default Layout1;
