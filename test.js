const mongoos = require("mongoose");

const connect = () => {
  // this is a promise
  return mongoos.connect("mongodb://localhost:27017/whatever", {
    useNewUrlParser: true,
  });
};

const studentSchema = new mongoos.Schema({
  firstName: String,
});

// we are creating the model
const Student = mongoos.model("student", studentSchema);

connect()
  .then(async (connection) => {
    const student = await Student.create({ firstName: "ali" });
    console.log(student);
  })
  .catch((err) => console.log(err));
