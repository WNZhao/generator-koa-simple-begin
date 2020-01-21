"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the bedazzling ${chalk.red(
          "generator-koa-simple-begin"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "someAnswer",
        message: "Would you like to enable this option?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath("**"), this.destinationPath("./"));
    this.fs.copy(
      this.templatePath(".babelrc"),
      this.destinationPath("./.babelrc")
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
