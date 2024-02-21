export const DEFAULT_MULTIPART = { 'Content-Type': 'multipart/form-data' };
export const DEFAULT_JSON = { "Content-Type": "application/json;charset=UTF-8" };
export const isObject = (val) => val !== null && typeof val === 'object';
export const isString = (val) => typeof val === 'string';
