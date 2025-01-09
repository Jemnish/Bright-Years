import {Request, Response, NextFunction} from 'express';
import userModel, { IUser } from '../models/userModel';
import { CatchAsyncError } from '../middleware/catchAsyncError';
require('dotenv').config();
import {ErrorHandler} from '../utils/errorHandler';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import ejs from 'ejs';
import path from 'path';
import sendMail from '../utils/sendMail';
import { accessTokenOption, refreshTokenOption, sendToken } from '../utils/jwt';
import { redis } from '../utils/redis';
import { getUserById } from '../services/user.service';
import cloudinary from 'cloudinary';

// register user 
interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}   


export const registerUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, email, password, avatar} = req.body;
        const isEmailExist = await userModel.findOne({email});
        
        if(isEmailExist){
            return next(new ErrorHandler("Email is already registered", 400));
        }

        const user: IRegisterUser = {name, email, password};

        const activationToken  = createActivationToken(user);

        const activationCode = activationToken.activationCode;

        const data = {user: {name: user.name}, activationCode};
        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data)


        try{
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                template: "activation-mail.ejs",
                data,
            })

            res.status(200).json({
                success: true,
                message: "Please check you email to verify",
                activationToken: activationToken.token,
            })
        }catch(err:any){
            return next(new ErrorHandler(err.message, 400));
        }

    }catch(err:any){
        return next (new ErrorHandler(err.message, 400));
    }

});

interface IActivationToken{
    token : string;
    activationCode : string;
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();


    const token = jwt.sign({
        user,activationCode
    },
        process.env.ACTIVATION_SECRET as Secret,{
            expiresIn:"5m",
    });

    return {token, activationCode};
}

// user activation 
interface IActivationRequest {
    activation_token: string;
    activation_code: string;   
}

export const activateUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
    try{
        const{activation_token, activation_code} = req.body as IActivationRequest;

        const newUser: {user: IUser; activationCode: string} = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as Secret
        )  as {user: IUser; activationCode: string};

         if(newUser.activationCode !== activation_code){
             return next(new ErrorHandler("Invalid activation code", 400));
         }

         const {name, email, password} = newUser.user;

         const existUser = await userModel.findOne({email});    

         if(existUser){
             return next(new ErrorHandler("Email already in use.", 400));
         }

         const user = await userModel.create({

                name, email, password  
            });

            res.status(201).json({
                success: true,
            })

    } catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }
});


// login user
interface ILoginRequest {
    email : string;
    password: string;
}

export const loginUser  = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {email, password} = req.body as ILoginRequest;

        if(!email || !password){
            return next(new ErrorHandler("Please enter email and password", 400));
        }

        const user = await userModel.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password", 400));
        };
        sendToken(user,200,res);

    
    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }
    }
);


// logout user
export const logoutUser = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try{
        res.cookie("access_token", "", {maxAge: 1});
        res.cookie("refresh_token", "", {maxAge: 1});
        const userId = req.user?._id as string;

        redis.del(userId);
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }

}
);

// update access token
export const updateAccessToken = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try{
        const refresh_token = req.cookies.refresh_token as string;
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;

        const message = 'Could not refresh token';

        if(!decoded){
            return next(new ErrorHandler(message, 400));
        }

        const session = await redis.get(decoded.id as string);    

        if(!session){
            return next(new ErrorHandler(message, 400));
        }

        const user = JSON.parse(session);

        const accessToken = jwt.sign({id: user._id}, 
            process.env.ACCESS_TOKEN as string, 
            {expiresIn: "5m"});

        const refreshToken = jwt.sign({id: user._id},
            process.env.REFRESH_TOKEN as string,
            {expiresIn: "3d"});
        
        req.user = user;
        

        res.cookie("access_token", accessToken, accessTokenOption);
        res.cookie("refresh_token", refreshToken, refreshTokenOption);

        res.status(200).json({
            success: true,
            accessToken
        });


        
    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }
});


// get user info
export const getUserInfo = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?._id;
        getUserById(userId as string, res);

    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }

});

interface ISocialAuthBody{
    email: string;
    name: string;   
    avatar: string;
}

// social auth
export const socialAuth = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, email, avatar} = req.body as ISocialAuthBody;
        const user = await userModel
        .findOne({email});
        if(!user){
            const newUser = await userModel.create({
                name, email, avatar
            });
            sendToken(newUser, 200, res);
        }
        else{
            sendToken(user, 200, res);
        }
    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }

});


// update user info
interface IUpdateUserInfo{
    name?: string;
    email?: string;
}

export const updateUserInfo = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try{
        const{name,email} = req.body as IUpdateUserInfo;
        const userId = req.user?._id as string; 
        const user = await userModel.findById(userId);

        if(email && user){
            const isEmailExist = await userModel.findOne({
                email
            });
            if(isEmailExist){
                return next(new ErrorHandler("Email already in use", 400));
            }
            user.email = email;
        }

        if(name && user){
            user.name = name;
        }

        await user?.save();

        await redis.set(userId, JSON.stringify(user));

        res.status(201).json({
            success: true,
            user
        });
    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }

});


// updare user passwords
interface IUpdatePassword{  
    oldPassword: string;
    newPassword: string;
}

export const updatePassword = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {oldPassword, newPassword} = req.body as IUpdatePassword;
        const user = await userModel.findById(req.user?._id).select("+password");

        if(!oldPassword || !newPassword){
            return next(new ErrorHandler("Please enter old and new password", 400));
        }


        if(user?.password === undefined){
            return next(new ErrorHandler("Invalid user", 400));
        }

        const isPasswordMatch = await user?.comparePassword(oldPassword);

        if(!isPasswordMatch){
            return next(new ErrorHandler("Old password is incorrect", 400));
        }

        user.password = newPassword;

        await user.save();

        await redis.set(req.user?._id as string, JSON.stringify(user));

        res.status(201).json({
            success: true,
            user,
        });


    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }

});

interface IUpdateProfilePicture{
    avatar: string;
}

// Update prfoile picture or avatar
export const updateProfilePicture = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {avatar}= req.body;
        
        const userId = req.user?._id;

        const user = await userModel.findById(userId)

        if(avatar && user){
            // if we have old avatar then delete it
            if(user?.avatar?.public_id){
                // first delete the previous image
                await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
                const myCloud =  await cloudinary.v2.uploader.upload(avatar,
                    {
                        folder : "avatars", 
                        width: 150
                    },);
                    user.avatar = {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    }
            }else{
               const myCloud =  await cloudinary.v2.uploader.upload(avatar,
                {
                    folder : "avatars", 
                    width: 150
                },);
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

        }

        await user?.save();

        await redis.set(userId as string, JSON.stringify(user));

        res.status(201).json({
            success: true,
            user,
        });


    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }
    });



