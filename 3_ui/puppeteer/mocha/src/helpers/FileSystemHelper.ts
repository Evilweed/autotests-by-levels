import {createWriteStream, emptyDir, ensureDir, pathExists, readdir, stat, writeJson as writeJSOnFile} from 'fs-extra';
import {join, resolve} from 'path';

export class FileSystemHelper {
    constructor(private readonly path: string) {
    }

    public getDirPath(dirname = this.path) {
        return resolve(join(process.cwd(), dirname));
    }

    public makeDir() {
        return ensureDir(this.getDirPath());
    }

    public cleanUpDir() {
        return emptyDir(this.getDirPath());
    }

    public isFileExist(filename: string) {
        const file = join(this.getDirPath(), filename);
        return pathExists(file);
    }

    public getFileData(filename: string) {
        const file = join(this.getDirPath(), filename);
        return stat(file);
    }

    public getDirContent() {
        return readdir(this.getDirPath());
    }

    public writeFileStream(data: string, name: string, encoding?: BufferEncoding): void {
        const file = join(process.cwd(), this.path, name);
        const stream = createWriteStream(file);
        stream.write(Buffer.from(data, encoding));
        stream.end();
    }

    public writeJSON(name: string, data: object) {
        const file = join(process.cwd(), this.path, name);
        return writeJSOnFile(file, data);
    }
}
