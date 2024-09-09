import File from '../../models/File/fileModel.js';
import { httpResponse } from "../../utils/index.js";
import fs from 'fs';
import path from 'path';

// Create and Upload File
const uploadFile = async (req, res) => {
    try {
        const file = new File({
            original_name: req.file.originalname,
            current_name: req.file.filename,
            type: req.file.mimetype,
            path: req.file.path,
            size: req.file.size
        });

        await file.save();
        return httpResponse.CREATED(res, file)
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};
// Get All Files
const getAllFiles = async (req, res) => {
    try {
        const files = await File.find();
        return httpResponse.SUCCESS(res, files)
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

// Get File By ID
const getFileById = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return httpResponse.NOT_FOUND(res, {message: 'File not found'})
        }
        return httpResponse.SUCCESS(res, file)
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

// Update File Metadata
const updateFile = async (req, res) => {
  try {
      const updatefile = await File.findByIdAndUpdate(req.params.id, req.body, {
          new: true, 
          runValidators: true
      });

      if (!updatefile) {
        return httpResponse.NOT_FOUND(res, {message: 'File not found'})
      }
return httpResponse.SUCCESS(res, updatefile)
  } catch (error) {
    return httpResponse.INTERNAL_SERVER_ERROR(res, error)
  }
};

// Delete File
const deleteFile = async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) {
            return httpResponse.NOT_FOUND(res, {message: 'File not found'})
        }
        fs.unlinkSync(file.path);
return httpResponse.SUCCESS(res, {message: 'File deleted successfully'})
    } catch (error) {
        return httpResponse.INTERNAL_SERVER_ERROR(res, error)
    }
};

export default {
  uploadFile,
  getAllFiles,
  getFileById,
  updateFile,
  deleteFile
}