function hello() {
  console.log('Webpack says, "Hey!!"');
}

function importLog() {
  console.log('imported helloWorld');
}

importLog();

// module.exports = hello;
export default hello;