import { Command, flags } from "@oclif/command";
import Base from "../base";
import { isOnline, ansiColors } from "../utils";
const path = require("path");
const fs = require("fs");
const os = require("os");
const ncp = require("ncp").ncp;
const semver = require("semver");
const { exec } = require("child_process");
const runningOnWindows = os.platform() === "win32";

export default class Init extends Base {
  static flags = {
    ...Base.flags
  };
  static args = [
    ...Base.args,
    {
      name: "name",
      required: true,
      description: "The name of the application (and the folder)."
    }
  ];

  static description = "Create a new Proton Native app.";

  async run() {
    const { args, flags } = this.parse(Init);

    const rootPath = path.resolve(args.name);
    const projectName = path.basename(rootPath);

    if (
      os.platform() == "darwin" &&
      semver.satisfies(process.version, ">=12.13.1 <13.0.0 || >=13.0.1")
    ) {
      this.warn(
        "Running on Mac with Node version >=12.13.1 or >=13.0.1 will not work due to a bug in Node.js. Please change to a version beneath 12.13.1, like 12.12.0."
      );
      this.log();
      this.log();
      this.log();
      this.log();
      this.log();
    }

    this.log(`Creating a new Proton Native app on ${rootPath}`);
    this.log();

    //creates package.json file on the new project dir
    // get latest stable dep releases,
    const json = {
      name: projectName,
      version: "0.0.1",
      private: true,
      scripts: {
        start: "babel-node index.js",
        dev: "webpack --mode=development ",
        webpackRun: "babel-node dist/index.out.js",
        build: "babel index.js app.js -d bin/"
      },
      dependencies: {
        "proton-native": "latest"
      },
      devDependencies: {
        "@babel/cli": "latest",
        "@babel/core": "latest",
        "@babel/node": "latest",
        "babel-loader": "latest",
        "@babel/plugin-proposal-class-properties": "latest",
        "@babel/preset-env": "latest",
        "@babel/preset-react": "latest",
        "@babel/preset-stage-0": "latest",
        webpack: "latest",
        "webpack-cli": "latest",
        "webpack-node-externals": "latest"
      }
    };

    // if any of these operations fails, there is no sense on continuing execution, that's why *Sync
    if (fs.existsSync(rootPath)) {
      fs.writeFileSync(
        path.join(rootPath, "package.json"),
        JSON.stringify(json, null, 2) + os.EOL
      );
    } else {
      fs.mkdirSync(rootPath);
      fs.writeFileSync(
        path.join(rootPath, "package.json"),
        JSON.stringify(json, null, 2) + os.EOL
      );
    }

    process.chdir(rootPath);
    // copy template files
    const templatePath = path.join(__dirname, "..", "..", "template");
    ncp(templatePath, process.cwd(), (error: string) => {
      if (error) {
        this.error(error);
      }
    });

    this.log("Installing packages... This may take a few minutes. \n");

    const online = await isOnline();
    if (!online) {
      this.error("Looks like you are offline.");
    } else {
      await this.installDeps(
        Object.keys(json.dependencies),
        "--save",
        flags.verbose
      );
      await this.installDeps(
        Object.keys(json.devDependencies),
        "--save-dev",
        flags.verbose
      );
      process.chdir("..");
      this.log();
      this.printSuccessMessage(rootPath, projectName);
    }
  }

  installDeps(deps: string[], saveType: string, verbose: boolean) {
    // Install dependecies
    const command = `npm${runningOnWindows ? ".cmd" : ""}`; // Supporting only npm initially, yarn will come in the future(maybe)
    const args = ["install", saveType].concat(deps);
    if (verbose) {
      args.push("--verbose");
    }

    return new Promise((resolve, reject) => {
      const childProc = exec(`${command} ${args.join(" ")}`);
      childProc.stdout.on("data", (chunk: any) => {
        process.stdout.write(chunk);
      });
      childProc.stderr.on("data", (chunk: any) => {
        process.stderr.write(chunk);
      });
      childProc.on("close", (code: number) => {
        if (code !== 0) {
          reject(`${command} ${args.join(" ")} has failed.`);
        } else {
          resolve();
        }
      });
    });
  }

  printSuccessMessage(rootPath: string, projectName: string) {
    this.log();
    this.log("Great! You are all set.");
    this.log(`Created ${projectName} inside ${rootPath}`);
    this.log();
    this.log();
    this.log("Inside that directory, you can run the following commands: ");
    this.log();
    this.log(ansiColors.green, "npm run start");
    this.log(ansiColors.reset, "Will run your application.");
    this.log();
    this.log(ansiColors.green, "npm run build");
    this.log(ansiColors.reset, "Bundles and transpiles your source files.");
    this.log();
    this.log("Go to your project folder and run your application typing:");
    this.log(ansiColors.green, "cd", ansiColors.reset, `${projectName}`);
    this.log(ansiColors.green, "npm run start");
    this.log(ansiColors.reset);
    this.log();
  }
}
