import React from 'react';
import './Home.css';
import Center from '@lib/Center';
import {Link} from 'react-router-dom';

export default (props) => {
  return (
    <div className="row">
      <div className="col-md-4 well" style={{backgroundColor: '#eeeeee'}}>
        <Center>
          <img className="ext-logo-homepage" height="123" width="200" src="/static/images/external-logos/node-logo.png"></img>
        </Center>
        <Center>
          <img className="ext-logo-homepage" height="74" width="220" src="/static/images/external-logos/react-logo.png"></img>
        </Center>
        <Center>
          <img className="ext-logo-homepage" height="75" width="200" src="/static/images/external-logos/aws-logo.png"></img>
        </Center>
        <Center>
          <img className="ext-logo-homepage" height="118" width="100" src="/static/images/external-logos/linux-logo.png"></img>
        </Center>
        <Center>
          <img className="ext-logo-homepage" height="60" width="220" style={{marginTop: 40 + 'px'}} src="/static/images/external-logos/mongodb-logo.png"></img>
        </Center>
      </div>
      <div className="col-md-8">
        <div className="panel panel-default">
            <div className="panel-heading panel-title">
              About me
            </div>
            <div className="panel-body panel-text">
              <p>I am currently looking for contract work around London.</p>
              <p>With experience in banking software and big-data, real-time analytics software and a number of personal projects, I have solid experience of working with different types of software in different programming languages on both a macro and micro scale across the full stack and software lifecycle. I have worked with plenty of well designed and badly designed software so have a thorough appreciation of the importance of good software design and the trade-offs between complexity, time constraints and future maintenance/enhancements. Also being from a heavy maths background, algorithms and cunning solutions to difficult problems are one of my specialties.</p>
              <p>Technologies I am proficient with: Node.js, JavaScript (ES-2016), C++, MongoDB, Linux, AWS, HTML + CSS + Bootstrap, Nginx, Express.js, Passport, Npm, Git, Mocha and various APIs including Google, Facebook and Stripe.</p>
              <p>Other technologies i have worked with: Java, Dart, PostgreSQL/SQL, AngularJS 2.0, React.js (currently learning)</p>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading panel-title">
              Contact
            </div>
            <div className="panel-body panel-text">
              ashley.phillips@nodeocrat.com
              <br/><a href="https://www.linkedin.com/in/ashley-phillips-5b5a8599/">linkedin</a>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading panel-title">
              Blogs
            </div>
            <div className="panel-body panel-text">
              <Link to="/blog/ApBlog">Mini-project: Auslander-Parter algorithm</Link>
              <br/>
              <Link to="/blog/GameBlog">Mini-project: Game-server without a game loop</Link>
            </div>
        </div>
      </div>
    </div>
  );
};
