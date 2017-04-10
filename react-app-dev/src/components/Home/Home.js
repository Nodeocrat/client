import React from 'react';
import Brief from './Brief/Brief';
import Summary from './Summary/Summary';
import Panel from 'react-bootstrap/lib/Panel';

/*const Logos = () => (
  <Panel header="Logos">Logos</div>
);*/

const Updates = () => (
  <Panel header="Updates">Updates</Panel>
);

const ProjectSummary = () => (
  <Panel header="Projects">links</Panel>
);

export default (props) => {
  return (
    <div>
      <div className="col-sm-4">
        <Brief/>
      </div>
      <div className="col-sm-8">
        <Summary/>
      </div>
      <div className="col-sm-4">
        <Updates/>
      </div>
      <div className="col-sm-8">
        <ProjectSummary/>
      </div>
    </div>
  );
}
