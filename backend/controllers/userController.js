const User = require("../models/User")

const updateaccountinformation = async (req, res) => {
    const { fname, lname, email, phone } = req.body;
    //console.log("user Deatail:", req.body);
    try {
      // Use the user ID from the req.user object set by the authenticateToken middleware
      const user = await User.findById(req.user.id);
      //console.log(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      // Optionally check if the new email is already in use
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(409).send("Email is already in use");
        }
      }
  
      // Update user details
      user.fName = fname || user.fName;
      user.lName = lname || user.lName;
      user.email = email || user.email;
      user.phone = phone || user.phone;
  
      // Save the updated user
      await user.save();
      //console.log(user);
      res.status(200).send("Account Information Updated");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  };



 const showAccountInformation = async (req,res) => {
    
    try {
        const user =await User.findById(req.user.id);
        if(!user){
            //console.log("user not found")
        }
        else{
            res.status(200).send({user})
        }
    } catch (error) {
        //console.log(error.message)
    }
   
}
module.exports = { showAccountInformation , updateaccountinformation}