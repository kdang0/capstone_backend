import LocalStrategy from "passport-local";
import bcrypt from 'bcrypt';


const intializePassport = (passport, getUser, getUserById) => {
    const authenticateUser = async (username, password, cb) => {
        const user = await getUser(username);
        console.log(user);
        if(user==null){
            return cb(null, false, {message: 'No user found'})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return cb(null, user);
            } else{ 
                return cb(null, false, {message: 'Password incorrect'})
            }
        } catch(e){
            return cb(e);
        }
    }

    passport.use(new LocalStrategy({}, authenticateUser));
    //Store user information with the ID being the key
    passport.serializeUser((user, cb) => cb(null, user._id))
    //Retrieve user information based on given information
    passport.deserializeUser((id,cb) => {
        getUserById(id)
            .then(user => cb(null,user))
            .catch(err => cb(err))   
    })
}

export default intializePassport;