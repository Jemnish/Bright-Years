import {Request, Response, NextFunction} from 'express';
import userModel, { IUser } from '../models/userModel';
import { CatchAsyncError } from '../middleware/catchAsyncError';
require('dotenv').config();
import {ErrorHandler} from '../utils/errorHandler';
import jwt, { Secret } from 'jsonwebtoken';
import ejs from 'ejs';
import path from 'path';
import sendMail from '../utils/sendMail';
import { sendToken } from '../utils/jwt';
import { redis } from '../utils/redis';

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

        redis.del(req.user?.id);
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }

}
);




