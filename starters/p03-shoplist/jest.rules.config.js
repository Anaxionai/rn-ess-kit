// Jest config for the Firestore rules tests only. They run in Node, inside
// the Firestore emulator (see firebase/README.md in the course kit):
//   firebase emulators:exec --only firestore --project demo-shoplist "npx jest -c jest.rules.config.js"
module.exports = {
  preset: "jest-expo/node",
  testMatch: ["<rootDir>/rules-tests/**/*.test.ts"],
};
