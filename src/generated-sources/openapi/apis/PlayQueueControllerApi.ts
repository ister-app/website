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
import type {
  PlayQueueEntity,
} from '../models/index';
import {
    PlayQueueEntityFromJSON,
    PlayQueueEntityToJSON,
} from '../models/index';

export interface CreateNewForShowRequest {
    showId: string;
}

/**
 * 
 */
export class PlayQueueControllerApi extends runtime.BaseAPI {

    /**
     */
    async createNewForShowRaw(requestParameters: CreateNewForShowRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlayQueueEntity>> {
        if (requestParameters['showId'] == null) {
            throw new runtime.RequiredError(
                'showId',
                'Required parameter "showId" was null or undefined when calling createNewForShow().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/playqueue/create/show/{showId}`.replace(`{${"showId"}}`, encodeURIComponent(String(requestParameters['showId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayQueueEntityFromJSON(jsonValue));
    }

    /**
     */
    async createNewForShow(requestParameters: CreateNewForShowRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlayQueueEntity> {
        const response = await this.createNewForShowRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
