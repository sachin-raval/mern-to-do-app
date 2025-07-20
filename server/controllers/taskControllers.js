const TASK = require("../model/taskModel");

const Read = async (req, res)=>{
    try {
        let userId = req.user.id;
        if(!userId) return res.json({ success: false , msg: "You are Not Authorize"});

        let taskDetails = await TASK.find({user: userId});
        let tasks = taskDetails;

        res.json({ success: true , tasks });

    } catch (error) {
        res.json({ success: false , error: error.message , msg: "Server Error" });
    }
}


const AddTask = async (req, res)=>{

    try {
        let { text } = req.body;
        let userId = req.user.id ;

        if(!text) return res.json({ success: false , msg: "Please Add Your Task"});

        // let task = await TASK.find({ user: userId});
        // if(task.title == text) return res.json({ success: false , msg: "Task Already Exist "});

        let newTask = await TASK.create({
            user: userId, 
            title: text
        });
    
        res.json({ success: true , msg: "Task Added"});
        
    } catch (error) {
        res.json({ success: false , error: error.message , msg: " Task Already Exist or Server Error" });   
    }
}

const DoneTaskToggle = async (req, res)=>{

    try {
        let { id } = req.params

        let task = await TASK.findOne({ _id: id });
        if(!task) return res.json({ success: false , msg: "Task Not Exist"});
    
        task.completed = !task.completed;
        await task.save();

        res.json({ success: true , msg: "Task Toggle successfully"});

    } catch (error) {
        res.json({ success: false , error: error.message , msg: "Server Error" });  
    }

}

const Update  = async (req, res)=>{
    try {
        let{ text } = req.body;
        let userId = req.user.id ;
        let { id } = req.params;

        let taskInfo = await TASK.findById(id);
        if(taskInfo.title == text) return res.json({ success: false , msg: "Enter Uniqe Value for Update"});

        let task = await TASK.findByIdAndUpdate( id , {$set:{ title: text }});
        res.json({ success: true , msg: "Task Updated"});


    } catch (error) {
        res.json({ success: false , error: error.message , msg: "Server Error" });
    }
}


const Delete = async (req, res)=>{

    try {
        let { id } = req.params;
        let deleteTask = await TASK.findByIdAndDelete(id);

        res.json({ success: true , msg: "Task Deleted Successfully"});
        
    } catch (error) {
        res.json({ success: false , error: error.message , msg: "Server Error" });  
    }
}

module.exports = { Read , AddTask , DoneTaskToggle , Update , Delete }
