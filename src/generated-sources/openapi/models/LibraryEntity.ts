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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface LibraryEntity
 */
export interface LibraryEntity {
    /**
     * 
     * @type {string}
     * @memberof LibraryEntity
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof LibraryEntity
     */
    dateCreated?: Date;
    /**
     * 
     * @type {Date}
     * @memberof LibraryEntity
     */
    dateUpdated?: Date;
    /**
     * 
     * @type {string}
     * @memberof LibraryEntity
     */
    libraryType?: LibraryEntityLibraryTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof LibraryEntity
     */
    name?: string;
}


/**
 * @export
 */
export const LibraryEntityLibraryTypeEnum = {
    Show: 'SHOW'
} as const;
export type LibraryEntityLibraryTypeEnum = typeof LibraryEntityLibraryTypeEnum[keyof typeof LibraryEntityLibraryTypeEnum];


/**
 * Check if a given object implements the LibraryEntity interface.
 */
export function instanceOfLibraryEntity(value: object): boolean {
    return true;
}

export function LibraryEntityFromJSON(json: any): LibraryEntity {
    return LibraryEntityFromJSONTyped(json, false);
}

export function LibraryEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): LibraryEntity {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'dateCreated': json['dateCreated'] == null ? undefined : (new Date(json['dateCreated'])),
        'dateUpdated': json['dateUpdated'] == null ? undefined : (new Date(json['dateUpdated'])),
        'libraryType': json['libraryType'] == null ? undefined : json['libraryType'],
        'name': json['name'] == null ? undefined : json['name'],
    };
}

export function LibraryEntityToJSON(value?: LibraryEntity | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'dateCreated': value['dateCreated'] == null ? undefined : ((value['dateCreated']).toISOString()),
        'dateUpdated': value['dateUpdated'] == null ? undefined : ((value['dateUpdated']).toISOString()),
        'libraryType': value['libraryType'],
        'name': value['name'],
    };
}

