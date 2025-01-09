require('dotenv').config();
import {Response} from "express";
import {IUser} from "../models/userModel";
import {redis} from './redis';

interface ITokenOption{
    expires : Date;
    maxAge: number;
    httpOnly: boolean;
    sameSize : 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;

}


// parse env variables to integrate with fallback values
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300',10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200',10);


    // set token options
export  const accessTokenOption: ITokenOption = {
        expires: new Date(Date.now() + accessTokenExpire * 60 * 60 *1000),
        maxAge: accessTokenExpire * 60 * 60 * 1000,
        httpOnly: true,
        sameSize: 'lax',
    };


export const refreshTokenOption: ITokenOption = {
        expires: new Date(Date.now() + refreshTokenExpire* 24 * 60 *60  * 1000),
        maxAge: refreshTokenExpire *24  *60 *60 * 1000,
        httpOnly: true,
        sameSize: 'lax',
    };
 
export const  sendToken = (user:IUser, statusCode: number, res:Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    // upload session to redis
    redis.set(user._id as string, JSON.stringify(user) as any)




    // settig secure true for the time when the app will be deployed 
    if(process.env.NODE_ENV === 'production'){
        accessTokenOption.secure = true;
    }

    res.cookie('access_token', accessToken, accessTokenOption);
    res.cookie('refresh_token', refreshToken, refreshTokenOption);


    res.status(statusCode).json({
        status: 'success',
        user,
        accessToken,
 
    });
}