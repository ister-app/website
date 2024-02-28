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
import type { ImageEntity } from './ImageEntity';
import {
    ImageEntityFromJSON,
    ImageEntityFromJSONTyped,
    ImageEntityToJSON,
} from './ImageEntity';
import type { PageableObject } from './PageableObject';
import {
    PageableObjectFromJSON,
    PageableObjectFromJSONTyped,
    PageableObjectToJSON,
} from './PageableObject';
import type { SortObject } from './SortObject';
import {
    SortObjectFromJSON,
    SortObjectFromJSONTyped,
    SortObjectToJSON,
} from './SortObject';

/**
 * 
 * @export
 * @interface PageImageEntity
 */
export interface PageImageEntity {
    /**
     * 
     * @type {number}
     * @memberof PageImageEntity
     */
    totalPages?: number;
    /**
     * 
     * @type {number}
     * @memberof PageImageEntity
     */
    totalElements?: number;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageImageEntity
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {number}
     * @memberof PageImageEntity
     */
    numberOfElements?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageImageEntity
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageImageEntity
     */
    last?: boolean;
    /**
     * 
     * @type {SortObject}
     * @memberof PageImageEntity
     */
    sort?: SortObject;
    /**
     * 
     * @type {number}
     * @memberof PageImageEntity
     */
    number?: number;
    /**
     * 
     * @type {number}
     * @memberof PageImageEntity
     */
    size?: number;
    /**
     * 
     * @type {Array<ImageEntity>}
     * @memberof PageImageEntity
     */
    content?: Array<ImageEntity>;
    /**
     * 
     * @type {boolean}
     * @memberof PageImageEntity
     */
    empty?: boolean;
}

/**
 * Check if a given object implements the PageImageEntity interface.
 */
export function instanceOfPageImageEntity(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PageImageEntityFromJSON(json: any): PageImageEntity {
    return PageImageEntityFromJSONTyped(json, false);
}

export function PageImageEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageImageEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'totalPages': !exists(json, 'totalPages') ? undefined : json['totalPages'],
        'totalElements': !exists(json, 'totalElements') ? undefined : json['totalElements'],
        'pageable': !exists(json, 'pageable') ? undefined : PageableObjectFromJSON(json['pageable']),
        'numberOfElements': !exists(json, 'numberOfElements') ? undefined : json['numberOfElements'],
        'first': !exists(json, 'first') ? undefined : json['first'],
        'last': !exists(json, 'last') ? undefined : json['last'],
        'sort': !exists(json, 'sort') ? undefined : SortObjectFromJSON(json['sort']),
        'number': !exists(json, 'number') ? undefined : json['number'],
        'size': !exists(json, 'size') ? undefined : json['size'],
        'content': !exists(json, 'content') ? undefined : ((json['content'] as Array<any>).map(ImageEntityFromJSON)),
        'empty': !exists(json, 'empty') ? undefined : json['empty'],
    };
}

export function PageImageEntityToJSON(value?: PageImageEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'totalPages': value.totalPages,
        'totalElements': value.totalElements,
        'pageable': PageableObjectToJSON(value.pageable),
        'numberOfElements': value.numberOfElements,
        'first': value.first,
        'last': value.last,
        'sort': SortObjectToJSON(value.sort),
        'number': value.number,
        'size': value.size,
        'content': value.content === undefined ? undefined : ((value.content as Array<any>).map(ImageEntityToJSON)),
        'empty': value.empty,
    };
}

