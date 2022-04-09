"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.imageFileFilter = exports.editFileName = void 0;
const path_1 = require("path");
exports.editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0].replace(/\s/g, '');
    const fileExtName = path_1.extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf|docx)$/)) {
        return callback(new Error('Only pdf or docx files are allowed!'), false);
    }
    callback(null, true);
};
//# sourceMappingURL=file-uploading.utils.js.map