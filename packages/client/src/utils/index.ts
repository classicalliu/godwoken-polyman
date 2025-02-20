import JSBI from 'jsbi';
import { mode } from '../config/constant.json';

const convertTimestamp = (ts: string | number) => {
    if(typeof ts === 'string'){
        return new Date(parseInt(ts)).toLocaleTimeString();
    }else{
        return new Date(ts).toLocaleTimeString();
    }
}

const hex2dec =  (num: string) => {
    return BigInt(num).toString(10);
}

const dec2hex = (num: string) => {
    return BigInt(num).toString(16);
}

const shannon2CKB = (num: number | string | BigInt) => {
    // return BigInt(num).toString(10).substring(0, BigInt(num).toString(10).length-7) 
    //        + '.' + 
    //        BigInt(num).toString(10).substring(BigInt(num).toString(10).length-7);
    return JSBI.divide(JSBI.BigInt(num), JSBI.BigInt(100000000)).toString(10);
}

const CKB2shannon = (num: number | string | BigInt) => {
    return BigInt(num).toString(10) + '00000000';
}

// notice: the order of key-value pair in Object
// does matter in this funciton.
// (meaning that they will not be the same and return false)
const isObjectInArray = (item: object, arr: object[]) => {
   for(let i=0;i<arr.length;i++){
        if( JSON.stringify(arr[i]) === JSON.stringify(item) ){
            return true;
        } 
   }
   return false;
}

const arrayBufferToBuffer = (ab: ArrayBuffer) => {
    var buf = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
    }
    return buf;
}

const get_env_mode = () => {
    //todo: maybe auto test using os === 'ubuntu' or something.
    return mode === 'development' ? 'development' : 'production';
}

const asyncSleep = (ms = 0) => {
    return new Promise((r) => setTimeout(r, ms));
}

const readDataFromFile = (codefile: Blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const data = event.target.result;
            resolve({status:'ok', data: data});
        };
        reader.onerror = (err) => {
            resolve({status:'failed', error: err});
        };
        reader.onabort = () => {
          resolve({status:'failed', error: 'user abort.'});
        }
        reader.readAsBinaryString(codefile);
    });
}

const eth2wei = function (num_str: string) {
    const numbers = parseFloat(num_str) * 1000000;
    return String(numbers) + "000000000000";
}

const wei2eth = function (numbers: string) {
    return parseInt(BigInt(numbers).toString()) / 1000000000000000000;
}

const eth2gwei = function (num_str: string) {
    const numbers = parseFloat(num_str) * 1000000;
    return numbers.toString() + "000";
}

const gwei2eth = function (numbers: string) {
    return parseInt(BigInt(numbers).toString()) / 1000000000;
}

export default {
    convertTimestamp: convertTimestamp,
    hex2dec: hex2dec,
    dec2hex: dec2hex,
    shannon2CKB: shannon2CKB,
    CKB2shannon: CKB2shannon,
    isObjectInArray: isObjectInArray,
    arrayBufferToBuffer: arrayBufferToBuffer,
    get_env_mode: get_env_mode,
    asyncSleep: asyncSleep,
    readDataFromFile: readDataFromFile
}
