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

import { exists, mapValues } from '../runtime';
import type { MediaFileEntity } from './MediaFileEntity';
import {
    MediaFileEntityFromJSON,
    MediaFileEntityFromJSONTyped,
    MediaFileEntityToJSON,
} from './MediaFileEntity';

/**
 * 
 * @export
 * @interface MediaFileStreamEntity
 */
export interface MediaFileStreamEntity {
    /**
     * 
     * @type {string}
     * @memberof MediaFileStreamEntity
     */
    id?: string;
    /**
     * 
     * @type {MediaFileEntity}
     * @memberof MediaFileStreamEntity
     */
    mediaFileEntity?: MediaFileEntity;
    /**
     * 
     * @type {number}
     * @memberof MediaFileStreamEntity
     */
    streamIndex?: number;
    /**
     * 
     * @type {string}
     * @memberof MediaFileStreamEntity
     */
    codecName?: string;
    /**
     * 
     * @type {string}
     * @memberof MediaFileStreamEntity
     */
    codecType?: string;
    /**
     * 
     * @type {number}
     * @memberof MediaFileStreamEntity
     */
    width?: number;
    /**
     * 
     * @type {number}
     * @memberof MediaFileStreamEntity
     */
    height?: number;
    /**
     * 
     * @type {string}
     * @memberof MediaFileStreamEntity
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof MediaFileStreamEntity
     */
    title?: string;
}

/**
 * Check if a given object implements the MediaFileStreamEntity interface.
 */
export function instanceOfMediaFileStreamEntity(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MediaFileStreamEntityFromJSON(json: any): MediaFileStreamEntity {
    return MediaFileStreamEntityFromJSONTyped(json, false);
}

export function MediaFileStreamEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): MediaFileStreamEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'mediaFileEntity': !exists(json, 'mediaFileEntity') ? undefined : MediaFileEntityFromJSON(json['mediaFileEntity']),
        'streamIndex': !exists(json, 'streamIndex') ? undefined : json['streamIndex'],
        'codecName': !exists(json, 'codecName') ? undefined : json['codecName'],
        'codecType': !exists(json, 'codecType') ? undefined : json['codecType'],
        'width': !exists(json, 'width') ? undefined : json['width'],
        'height': !exists(json, 'height') ? undefined : json['height'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'title': !exists(json, 'title') ? undefined : json['title'],
    };
}

export function MediaFileStreamEntityToJSON(value?: MediaFileStreamEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'mediaFileEntity': MediaFileEntityToJSON(value.mediaFileEntity),
        'streamIndex': value.streamIndex,
        'codecName': value.codecName,
        'codecType': value.codecType,
        'width': value.width,
        'height': value.height,
        'language': value.language,
        'title': value.title,
    };
}

