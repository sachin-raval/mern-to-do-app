const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

taskSchema.index( { title: 1 , userId: 1} , { unique: true });


const TASK = mongoose.models.task || mongoose.model('task' , taskSchema);
module.exports = TASK;