#!/usr/bin/env node
const inquirer = require('./lib/inquirer');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs-extra');
const child_process = require('child_process');

const updatesJsonDir = '.\\src\\assets\\json\\';
const updatesJsonFile = 'latest-updates.json'
const updatesJsonPath = updatesJsonDir + updatesJsonFile;


// Init
clear();
console.log(chalk.yellow(figlet.textSync('PublishJs', { horizontalLayout: 'full' })));


// Run
const run = async () => {
   try {

      let updatesList = { updates: [] };


      /* -------------------------------------------------------------------------- */
      /*                                Updates List                                */
      /* -------------------------------------------------------------------------- */
      //#region 

      // Ask if the publish has updates list
      const hasUpdatesAnswer = await inquirer.askForUpdates();

      if (hasUpdatesAnswer.hasUpdates) {

         // Ask for updates list entry
         const updatesListAnswer = await inquirer.getUpdatesList();
         updatesList.updates = updatesListAnswer.updatesListStr.split('-');
         if (updatesList.updates == 1) console.log(chalk.red('You forgot the damn hyphen >>> - <<<'));

         // Save updates list to json file
         fs.ensureDirSync(updatesJsonDir);
         fs.writeFile(updatesJsonPath, JSON.stringify(updatesList), (err, result) => {
            if (err) console.log(chalk.red(err));
         });

      }

      //#endregion


      /* -------------------------------------------------------------------------- */
      /*                                   Version                                  */
      /* -------------------------------------------------------------------------- */
      //#region 

      // Ask if app version should be incremented
      const hasVersionAnswer = await inquirer.askForVersion();

      if (hasVersionAnswer.hasVersion) {

         // Ask for version bump strategy
         const versionTypeAnswer = await inquirer.getVersionBumpType();

         switch (versionTypeAnswer.versionType) {
            case 'major':
               child_process.execSync('npm --no-git-tag-version version major', { stdio:[0, 1, 2] });
            break;
            case 'minor':
               child_process.execSync('npm --no-git-tag-version version minor', { stdio:[0, 1, 2] });
            break;
            case 'patch':
               child_process.execSync('npm --no-git-tag-version version patch', { stdio:[0, 1, 2] });
            break;
            default: break;
         }

      }

      //#endregion


      /* -------------------------------------------------------------------------- */
      /*                                     Git                                    */
      /* -------------------------------------------------------------------------- */
      //#region 

      // Ask for commit message
      const commitMessageAnswer = await inquirer.getCommitMessage();

      // Run git add command
      child_process.execSync('git add .', { stdio:[0, 1, 2] });

      // Run commit command
      child_process.execSync(`git commit -m "${commitMessageAnswer.commitMessage}"`, { stdio:[0, 1, 2] });

      // Run push command
      child_process.execSync('git push', { stdio:[0, 1, 2] });

      //#endregion


      console.log(chalk.green('All Done!'));

   } catch (err) { console.log(chalk.red(err)); }
};

run();
