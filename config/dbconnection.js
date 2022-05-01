const mongoose = require('mongoose');
const username = encodeURIComponent('sonjoy');
const password = encodeURIComponent('sonjoy@123456');

main().catch((err) => console.log(err));

async function main() {
  const connect = await mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.wvrbs.mongodb.net/ecommerce?retryWrites=true&w=majority`
  );
  if (connect) {
    console.log('connected');
  }
}