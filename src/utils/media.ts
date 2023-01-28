import { ImageSource, knownFolders, path, Folder } from '@nativescript/core';
import { isAndroid, isIOS } from '@nativescript/core';

export const mediaHomePrefix = ['movingfwd'];

export const getAssetSource = async (asset: any) => {
  if (isAndroid) {
    console.log('getAssetSource android', asset);
    return asset.android;
  }

  if (isIOS) {
    return asset.ios;
  }

  throw new Error('getAssetSource: Unsupported platform');
  // return await ImageSource.fromAsset(asset)
  //   .then((imageSource: ImageSource) => {
  //     if (isAndroid) {
  //       console.log('getAssetSource android', imageSource);
  //       return imageSource.android;
  //     }

  //     if (isIOS) {
  //       return imageSource.ios;
  //     }
  //   })
  //   .catch((e: any) => {
  //     console.log('saveImageAsset error', e);
  //     return e;
  //   });
};

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
