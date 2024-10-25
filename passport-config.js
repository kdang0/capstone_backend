import { Strategy } from "passport-local";
import bcrypt from 'bcrypt';


const intializePassport = (passport, getUser, getUserById) => {
    const authenticateUser = async (username, password, done) => {
        const user = await getUser(username);
        console.log(user);
        if(user==null){
            return done(null, false, {message: 'No user found'})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            } else{ 
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch(e){
            return done(e);
        }
    }

    passport.use(new Strategy({}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((id,done) => done(null, getUserById))
}

export default intializePassport;