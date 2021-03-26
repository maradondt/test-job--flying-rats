// import 'destyle.css';
import React from 'react';
import styled from 'styled-components';
import Select from './components/Select';

const Container = styled.div`
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <Container className="container-fluid bg-light">
      <div className="row">
        <div className="col-12">
          <h1 className="p-3 h4 text-center">
            list of RATS That should stay away from my DAMN BINS
          </h1>
        </div>
      </div>
      <Select />
    </Container>
  );
};

export default App;
