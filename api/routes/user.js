const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//Update user
router.put("/:id", async (req,res) => {
    if(req.body.userId === req.params.id){
        // if password exists for updation
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            // const posts = await Post.find({username: req.body.username} ,{
            //     $set: {

            //     }
            // })
            

            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set : {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                }, 
            },{new:true});

            const user = req.body.oldUser;
            console.log(user);
            const posts = await Post.updateMany({ username: user },{ $set: {username: req.body.username}});
            console.log(posts);
            console.log(updatedUser.username)
            res.status(200).json(updatedUser)
        }
         catch (err){
            //console.log(err);
            res.status(500).json(err);
        }
    } else{
        res.status(401).json("You can update only your account!!");
    }
});


//Delete user

router.delete("/:id", async (req,res) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            console.log(user);
            try{
                //await Post.deleteMany({ username: user.username })
                await User.findByIdAndDelete(req.params.id);
               // console.log("hi");
                res.status(200).json("User has been deleted");
            }
             catch(err){
                //console.log(err);
                res.status(500).json(err);
            }
        } catch(err){
            res.status(404).json("User not found");
        }
    } else{
        res.status(401).json("You can delete only your account!!");
    }
});


//get one user
router.get("/:id", async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        //console.log("hey");
        const { password, ...others } = user._doc;
        res.status(200).json(others); 
    } catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;