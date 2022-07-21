/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-04-15 17:19:13
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-15 17:19:13
 */
export const DEFAULT_MULTIPART = { 'Content-Type': 'multipart/form-data' };
export const DEFAULT_JSON = { "Content-Type": "application/json;charset=UTF-8" };
export const isObject = (val: any) => val !== null && typeof val === 'object';
export const isString = (val: any) => typeof val === 'string';