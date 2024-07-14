import { Response } from "express";

type TResponseData<T> = {
    statusCode: number,
    success: boolean,
    message?: string,
    data: T
}

export const sendResponse = <T> (res: Response, data: TResponseData<T>) => {
    res.status(data.statusCode as number).json({
        success: data.success,
        message: data.message,
        data: data.data
    });
}
