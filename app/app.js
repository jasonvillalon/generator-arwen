"use strict";

var _yeomanGenerator = require("yeoman-generator");

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var arwenGenerator = _yeomanGenerator2["default"].generators.Base.extend({
  init: function init() {
    // invoke npm install on finish
    this.on("end", function () {
      if (!this.options["skip-install"]) {
        this.npmInstall();
      }
    });
    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(_chalk2["default"].magenta("You\"re using the restify generator."));
  },
  askForApplicationDetails: function askForApplicationDetails() {
    var done = this.async();

    var prompts = [{
      name: "appName",
      message: "What would you like to call your application?",
      "default": "testProj"
    }, {
      name: "appDescription",
      message: "What would be the description of the application?",
      "default": "NODEJS React Sample Project"
    }, {
      name: "appRepository",
      message: "What is the repository of this project?",
      "default": ""
    }, {
      name: "appAuthor",
      message: "What is the name of the author?",
      "default": ""
    }, {
      name: "dbName",
      message: "What is the database name?",
      "default": ""
    }, {
      name: "dbUser",
      message: "What is the database username?",
      "default": "postgres"
    }, {
      name: "dbPass",
      message: "What is the database password?",
      "default": ""
    }, {
      name: "dbHost",
      message: "What is the database host?",
      "default": "localhost"
    }, {
      name: "dbPort",
      message: "What is the database port?",
      "default": "5432"
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.appRepository = props.appRepository;
      this.appAuthor = props.appAuthor;

      this.slugifiedAppName = this._.slugify(this.appName);
      this.humanizedAppName = this._.humanize(this.appName);

      this.dbName = props.dbName;
      this.dbUser = props.dbUser;
      this.dbPass = props.dbPass;
      this.dbHost = props.dbHost;
      this.dbPort = props.dbPort;

      done();
    }.bind(this));
  },
  initGit: function initGit() {
    _shelljs2["default"].exec("git init && git remote add origin " + this.appRepository);
  },
  copyApplicationFolder: function copyApplicationFolder() {
    this.mkdir("config");
    this.mkdir("script");
    this.mkdir("src");
    this.mkdir("src/Main");

    this.template("script/db-migrate", "script/db-migrate");
    this.template("script/db-reset", "script/db-reset");
    this.template("script/run", "script/run");
    this.template("script/install", "script/install");
    this.template("script/test", "script/test");

    this.template("config/default.js", "config/default.js");
    this.template("config/production.js", "config/production.js");
    this.template("config/test.js", "config/test.js");

    this.template("src/Main/index.js", "src/Main/index.js");
    this.template("src/Main/install.js", "src/Main/install.js");
    this.template("src/Main/settings.js", "src/Main/settings.js");
  },
  renderApplicationDependenciesFiles: function renderApplicationDependenciesFiles() {
    this.template("atomic.json", "atomic.json");
    this.template("_babelrc", ".babelrc");
    this.template("_editorconfig", ".editorconfig");
    this.template("_gitignore", ".gitignore");
    this.template("_eslintrc", ".eslintrc");
    this.template("_eslintignore", ".eslintignore");
    this.copy("gulpfile.babel.js");
    this.copy("package.json");
    this.copy("nodemon.json");
    this.copy("README.md");
  }
});

module.exports = arwenGenerator;