import { ValueType } from '@nativescript/mlkit-barcode-scanning';

export type BarCodeType = {
  type?: ValueType;
  value?: string;
  display?: string;
};
