import React from 'react';
import {skillPill} from './Skills.css';
import text from '@styles/text.css';

const keySkills = [
  "Node.js",
  "React.js",
  "ES6",
  "Redux",
  "CSS Modules",
  "HTML5",
  "Webpack",
  "MongoDB",
  "Linux",
  "AWS",
  "Express.js"
];

const otherSkills = [
  "C++",
  "AngularDart",
  "Dart",
  "Passport",
  "Npm",
  "Git",
  "Mocha",
  "Nginx",
  "Website Hosting",
  "Java",
  "PostgreSQL",
  "Qt"
];

export default class Skills extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      more: false
    }
  }

  render() {

    const skills = this.state.more ? keySkills.concat(otherSkills) : keySkills;

    return (
      <div className={text.center}>
        {
          skills.map((skill) => (
            <div key={skill} className={`${skillPill} ${text.bold}`}>
              {skill}
            </div>
          ))
        }
        <div className={text.link}>
          {
            this.state.more ?
              (<div onClick={() => this.setState({more: false})}>less</div>) :
              (<div onClick={() => this.setState({more: true})}>more...</div>)
          }
        </div>
      </div>
    );
  }
}
