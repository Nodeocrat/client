import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Brief from '../Brief/Brief';
import text from '@styles/text.css';

const Summary = () => (

  <div>
    <div className="panel panel-default">
      <div className={`panel-heading panel-title ${text.center}`}>
        About me
      </div>
      <div className="panel-body panel-text">
        <div className="col-sm-4">
          <Brief/>
        </div>
        <div className="col-sm-8">
          <p>With experience in banking software and big-data, real-time analytics software and a number of personal projects, I have solid experience of working with different types of software in different programming languages on both a macro and micro scale across the full stack and software lifecycle. I have worked with plenty of well designed and badly designed software so have a thorough appreciation of the importance of good software design and the trade-offs between complexity, time constraints and future maintenance/enhancements. Also being from a heavy maths background, algorithms and cunning solutions to difficult problems are one of my specialties.</p>

          <p>Technologies I am proficient with: Node.js, React, JavaScript (ES-2016), C++, MongoDB, Linux, AWS, HTML + CSS + Bootstrap, Nginx, Express.js, Passport, Npm, Git, Mocha and various APIs including Google, Facebook and Stripe.</p>

          <p>Other technologies i have worked with: Java, Dart, PostgreSQL/SQL, AngularJS 2.0</p>
        </div>
      </div>
    </div>
  </div>
);

export default Summary;
