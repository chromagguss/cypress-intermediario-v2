const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true,
      requestMode: true
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalRunAllSpecs: true
  },
  //fixturesFolder: false, //Não criar pasta fixtures
  video: false //não gravar vídeo no modo headless

});
