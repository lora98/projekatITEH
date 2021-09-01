import { Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
export function renameFile(name: string, fliename: string) {

    return function handleUpload(request: Request, res: Response, next?: any) {

        if (!request.files) {
            next();
            return;
        }
        if (!request.files[fliename]) {
            next();
            return;
        }
        const file = request.files[fliename][0];
        const tempPath = file.path;
        const targetPath = path.resolve('uploads/' + file.originalname);
        const data = request.body;
        data[name] = file.originalname;
        fs.rename(tempPath, targetPath, err => {

        })
        next();
    }
}