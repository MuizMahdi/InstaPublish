const inquirer = require('inquirer');


module.exports = {

   askForUpdates: () => {
      
      const question = [{
         name: 'hasUpdates',
         type: 'confirm',
         message: 'Do you want to add updates list?'
      }];

      return inquirer.prompt(question);
      
   },

   getUpdatesList: () => {

      const question = [{
         name: 'updatesListStr',
         type: 'input',
         message: 'Enter hyphen separated updates/changes list:',
         validate: function(value) {
            if (value.length) return true;
            else return 'Please the updates.';
         }
      }];

      return inquirer.prompt(question);

   },


   askForVersion: () => {
      
      const question = [{
         name: 'hasVersion',
         type: 'confirm',
         message: 'Do you want to increment app version?'
      }];

      return inquirer.prompt(question);
      
   },

   getVersionBumpType: () => {

      const question = [{
         name: 'versionType',
         type: 'list',
         message: 'Choose version bump strategy:',
         choices: ["major", "minor", "patch"],
      }];

      return inquirer.prompt(question);

   },


   getCommitMessage: () => {

      const question = [{
         name: 'commitMessage',
         type: 'input',
         message: 'Enter commit message (without quotation marks):',
         validate: function(value) {
            if (value.length) return true;
            else return 'Please the commit message.';
         }
      }];

      return inquirer.prompt(question);

   },

};
