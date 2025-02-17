import jwt from 'jsonwebtoken';
export const generateToken=(userId ,res) =>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.cookie('jwt',token,{maxAge:7*24*60*60*1000,  //seven days in mili second
        httpOnly:true, // prevent xss attacks cross-site script injection
        sameSite:"strict",//prevent csrf attacks cross-site request forgery
        secure:process.env.NODE_ENV !== 'development', //cookie works only in https
    });
    return token;
};
