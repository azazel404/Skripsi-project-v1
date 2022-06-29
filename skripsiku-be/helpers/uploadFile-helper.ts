import { v4 as uuidv4 } from 'uuid';

export class uploadFile {
  static customFileName(req, file, cb) {
    let newUuid = uuidv4();
    let customFile = file.originalname.split('.')[0];
    // let mathRandom = Math.floor(Math.random() * (9 * (Math.pow(10, 5)))) + (Math.pow(10, 5))
    customFile = customFile + '-' + newUuid;

    let fileExtension = '';

    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = '.jpg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = '.png';
    } else if (file.mimetype.indexOf('pdf') > -1) {
      fileExtension = '.pdf';
    }

    customFile = customFile + fileExtension;

    cb(null, customFile);
  }

  static imagesFilePath(req, file, cb) {
    cb(null, './uploads/images/');
  }

  static documentsFilePath(req, file, cb) {
    cb(null, './uploads/documents/');
  }
}
