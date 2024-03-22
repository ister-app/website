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
  EpisodeEntity,
  SeasonEntity,
} from '../models/index';
import {
    EpisodeEntityFromJSON,
    EpisodeEntityToJSON,
    SeasonEntityFromJSON,
    SeasonEntityToJSON,
} from '../models/index';

export interface GetRequest {
    id: string;
}

export interface GetEpisodesRequest {
    id: string;
}

/**
 * 
 */
export class SeasonControllerApi extends runtime.BaseAPI {

    /**
     */
    async getRaw(requestParameters: GetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SeasonEntity>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling get().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/season/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SeasonEntityFromJSON(jsonValue));
    }

    /**
     */
    async get(requestParameters: GetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SeasonEntity> {
        const response = await this.getRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getEpisodesRaw(requestParameters: GetEpisodesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<EpisodeEntity>>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getEpisodes().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/season/{id}/episodes`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(EpisodeEntityFromJSON));
    }

    /**
     */
    async getEpisodes(requestParameters: GetEpisodesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<EpisodeEntity>> {
        const response = await this.getEpisodesRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
