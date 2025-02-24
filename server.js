const Express = require("express");
const app = Express();
const PORT = 4000;
app.use(Express.json());

Users = [];


app.get("/users", (req, res)=>{
    res.status(200).json({
        Message: "All Users",
        Users: Users
    });
});

app.post("/createUsers", (req, res)=>{
    const newUser = req.body;
    if(!newUser.userAge || !newUser.userAge || !newUser.userEmail){
        res.status(400).json({
            Message: "User parameter cannot be empty"
        });
    };
    Users.push(newUser)
    res.status(201).json({
        Message: "User Created",
        New_User: newUser
    })
})

app.get("/user/:id", (req, res)=>{
    const userbyid = Users.find(u => u.userAge == req.params.id);
    if (!userbyid){
        res.status(404).json({
            Message: "No User Found"
        })
    }
    res.status(200).json({
        Message: "User Found",
        User: userbyid
    });
})

app.put("/updateUser/:id", (req, res)=>{
    const userIndex = Users.findIndex(u => u.userAge==req.params.id)
    if (userIndex===-1){
        res.status(404).json({
            Message: "No User Found"
        })
    }
    Users[userIndex] = {...Users[userIndex],...req.body};
    res.status(201).json({
        Message: "Completed Updating",
        Updated_User: Users[userIndex]
    })
})

app.delete("/delete/:id", (req, res)=>{
    newUsers = Users.filter(u => u.userAge != req.params.id)
    if(Users.length === newUsers.length){
        res.status(404).json({
            Message: "User Not Found"
        })
    }
    Users = newUsers;
    res.status(200).json({
        Message: "Successfully Deleted"
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});