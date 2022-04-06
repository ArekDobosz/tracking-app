import type { NextPage } from 'next';

import { Layout } from '../components/layout';
import { MapContainer } from '../components/map';

const Home: NextPage = (props) => {
  return (
    <Layout>
      <MapContainer />
    </Layout>
  );
};

export default Home;
