import { ImageSource, knownFolders, path, Folder } from '@nativescript/core';

export const mediaHomePrefix = ['movingfwd'];

export const saveImageAsset = async (
  asset: any,
  prefixPath: string[],
  fileName: string,
  format: 'jpg' | 'jpeg' | 'png' = 'jpg'
) => {
  return await ImageSource.fromAsset(asset)
    .then((imageSource: ImageSource) => {
      const basePath: string = path.join(knownFolders.documents().path, ...mediaHomePrefix, ...prefixPath);
      const filePath: string = path.join(knownFolders.documents().path, ...mediaHomePrefix, ...prefixPath, fileName);

      const folder: Folder = <Folder>Folder.fromPath(basePath);
      // if (!Folder.exists(basePath)) {
      //   // folder.
      // }
      const saved: boolean = imageSource.saveToFile(filePath, format);

      if (saved) {
        // console.log("Gallery: " + this._dataItem.picture_url);
        console.log('Saved: ' + filePath);
      }
      return { fileName, basePath, filePath };
    })
    .catch((e: any) => {
      console.log('saveImageAsset error', e);
      return e;
    });
};
