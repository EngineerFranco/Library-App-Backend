import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT tokens
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({message: "Authorization bearer token required!"});
    }
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) res.status(401).json({message: "Authorization bearer token required!"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: "Invalid Token"});
        const {role} = user;
        const access = req.url.toString()
        if(role === 'user'){
            if(access != '/get'|| access != '/search'){
                return res.status(401).json({message: "Invalid Access Role"})
            }
        } 
        else if(role === 'librarian'){
            if(access != '/get' ||  access != '/update' || access != '/add' || access != '/search' ||  access != '/update'){
                return res.status(401).json({message: "Invalid Access Role"})
            }
        } 
        else{
            next();
        }
    });
};



