const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rohankhatode5_db_user:skillsphere2026@cluster0.jwubbfq.mongodb.net/SkillSphere?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("Connected");
  process.exit(0);
})
.catch(err => {
  console.error(err);
});