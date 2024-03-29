/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';

export interface DownloadRequest {
    id: string;
    fileName: string;
}

export interface ReadyRequest {
    id: string;
}

export interface StartRequest {
    mediaFileId: string;
    startTimeInSeconds: number;
    audioId?: string;
    subtitleId?: string;
}

export interface StopRequest {
    id: string;
}

/**
 * 
 */
export class TranscoderControllerApi extends runtime.BaseAPI {

    /**
     */
    async downloadRaw(requestParameters: DownloadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling download().'
            );
        }

        if (requestParameters['fileName'] == null) {
            throw new runtime.RequiredError(
                'fileName',
                'Required parameter "fileName" was null or undefined when calling download().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcode/download/{id}/{fileName}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))).replace(`{${"fileName"}}`, encodeURIComponent(String(requestParameters['fileName']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.BlobApiResponse(response);
    }

    /**
     */
    async download(requestParameters: DownloadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Blob> {
        const response = await this.downloadRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async readyRaw(requestParameters: ReadyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<boolean>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling ready().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcode/ready/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<boolean>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async ready(requestParameters: ReadyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<boolean> {
        const response = await this.readyRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async startRaw(requestParameters: StartRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters['mediaFileId'] == null) {
            throw new runtime.RequiredError(
                'mediaFileId',
                'Required parameter "mediaFileId" was null or undefined when calling start().'
            );
        }

        if (requestParameters['startTimeInSeconds'] == null) {
            throw new runtime.RequiredError(
                'startTimeInSeconds',
                'Required parameter "startTimeInSeconds" was null or undefined when calling start().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['mediaFileId'] != null) {
            queryParameters['mediaFileId'] = requestParameters['mediaFileId'];
        }

        if (requestParameters['startTimeInSeconds'] != null) {
            queryParameters['startTimeInSeconds'] = requestParameters['startTimeInSeconds'];
        }

        if (requestParameters['audioId'] != null) {
            queryParameters['audioId'] = requestParameters['audioId'];
        }

        if (requestParameters['subtitleId'] != null) {
            queryParameters['subtitleId'] = requestParameters['subtitleId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcode/start`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async start(requestParameters: StartRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.startRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async stopRaw(requestParameters: StopRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling stop().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transcode/stop/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async stop(requestParameters: StopRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.stopRaw(requestParameters, initOverrides);
    }

}
