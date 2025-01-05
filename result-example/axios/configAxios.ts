/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import type { AxiosHeaderValue, AxiosRequestConfig, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export const axiosInstance = axios.create({
  baseURL: "BASE_URL",
});

export const fixAxiosHeader = (headers: Record<string, AxiosHeaderValue>) => {
  Object.entries(headers).map(([key, value]) => {
    axiosInstance.defaults.headers.common[key] = value;
  });
};

export const fixAxiosToken = (token: string) => {
  fixAxiosHeader({ Authorization: `Bearer ${token}` });
};

const stringifyFormItem = (formItem: unknown) => {
  if (typeof formItem === "object" && formItem !== null) {
    return JSON.stringify(formItem);
  } else {
    return `${formItem}`;
  }
};

const createFormData = (input: Record<string, unknown>): FormData => {
  if (input instanceof FormData) {
    return input;
  }
  return Object.keys(input || {}).reduce((formData, key) => {
    const property = input[key];
    const propertyContent: any[] = property instanceof Array ? property : [property];

    for (const formItem of propertyContent) {
      const isFileType = formItem instanceof Blob || formItem instanceof File;
      formData.append(key, isFileType ? formItem : stringifyFormItem(formItem));
    }

    return formData;
  }, new FormData());
};

export const axiosRequest = <T = any, _E = any>({
  secure,
  path,
  type,
  query,
  format,
  body,
  ...params
}: FullRequestParams): Promise<T> => {
  const requestParams = params;
  const responseFormat = format || undefined;

  if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
    body = createFormData(body as Record<string, unknown>);
  }

  if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
    body = JSON.stringify(body);
  }

  return axiosInstance
    .request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    })
    .then((response) => response.data);
};
