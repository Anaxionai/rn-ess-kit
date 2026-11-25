// Runs once before all tests. It fixes the time zone the tests run in, so a
// test about midnight or a time-zone change gives the same result on every
// laptop and in GitHub Actions. (Setting TZ in Git Bash or in setupFiles does
// not work; globalSetup does.)
module.exports = async () => {
  process.env.TZ = "America/New_York";
};
