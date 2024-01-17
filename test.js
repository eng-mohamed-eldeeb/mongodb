const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatever", {
    useNewUrlParser: true,
  });
};

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    favoriteFood: [{ type: String }],
    info: {
      school: {
        type: String,
      },
      choeSize: {
        type: Number,
      },
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "school",
    },
  },
  { timestamps: true }
);

const schoolSchema = new mongoose.Schema({
  name: String,
  openSince: Number,
  students: Number,
  isGreate: Boolean,
});

const Student = mongoose.model("student", studentSchema);
const School = mongoose.model("school", schoolSchema); // Fix the typo here, it should be "school" not "shool"

connect()
  .then(async () => {
    const school = await School.create({
      name: "HTI",
      openSince: 1850,
      students: 1000,
      isGreate: false,
    });
    const school2 = await School.create({
      name: "cic",
      openSince: 1850,
      students: 1100,
      isGreate: true,
    });
    const school3 = await School.create({
      name: "AUC",
      openSince: 1000,
      students: 1800,
      isGreate: true,
    });

    const match = await School.find({
      students: { $gt: 1500 },
    });

    // const student = await Student.create({
    //   firstName: "deeb",
    //   school: school._id,
    // });
    // const match = await Student.findById(student.id).populate("school").exec();
    console.log(match);
  })
  .catch((err) => console.log(err));
