import { type Request, type Response, type NextFunction } from "express";

export const asyncHandler = <
  Req extends Request = Request,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
>(
  fn: (req: Req, res: Response<ResBody>, next: NextFunction) => Promise<any>,
) => {
  return (req: Req, res: Response<ResBody>, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
