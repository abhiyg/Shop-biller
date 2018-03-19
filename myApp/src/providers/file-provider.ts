import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Injectable()
export class FileProvider {

public fileTransferObj: FileTransferObject;

    constructor(private fileTransfer: FileTransfer, private file: File) {}


    downloadFile(downloadFile:any)
    {

        this.fileTransferObj = this.fileTransfer.create();

        this.fileTransferObj.download("", this.file.dataDirectory ).then((entry) => {
            console.log('download complete: ' + entry.toURL());
        }, (error) => {
            console.log("Error downloading file");
        });
    }
}
