const figlet=require("figlet");

figlet("Rishabh Yadav  ", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});