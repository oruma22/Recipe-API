import type { Request, Response, NextFunction, RequestHandler } from "express";

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
