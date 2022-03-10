import type { NextPage } from 'next';
import { Layout } from '../components/layout';

import { Map } from '../components/map';

const Home: NextPage = (props) => {
  return (
    <Layout>
      <Map />
    </Layout>
  );
};

export default Home;
