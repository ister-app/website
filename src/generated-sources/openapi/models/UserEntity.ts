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
 * @interface UserEntity
 */
export interface UserEntity {
    /**
     * 
     * @type {string}
     * @memberof UserEntity
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof UserEntity
     */
    dateCreated: Date;
    /**
     * 
     * @type {Date}
     * @memberof UserEntity
     */
    dateUpdated: Date;
    /**
     * 
     * @type {string}
     * @memberof UserEntity
     */
    externalId: string;
    /**
     * 
     * @type {string}
     * @memberof UserEntity
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof UserEntity
     */
    email?: string;
}

/**
 * Check if a given object implements the UserEntity interface.
 */
export function instanceOfUserEntity(value: object): boolean {
    if (!('dateCreated' in value)) return false;
    if (!('dateUpdated' in value)) return false;
    if (!('externalId' in value)) return false;
    return true;
}

export function UserEntityFromJSON(json: any): UserEntity {
    return UserEntityFromJSONTyped(json, false);
}

export function UserEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserEntity {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'dateCreated': (new Date(json['dateCreated'])),
        'dateUpdated': (new Date(json['dateUpdated'])),
        'externalId': json['externalId'],
        'name': json['name'] == null ? undefined : json['name'],
        'email': json['email'] == null ? undefined : json['email'],
    };
}

export function UserEntityToJSON(value?: UserEntity | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'dateCreated': ((value['dateCreated']).toISOString()),
        'dateUpdated': ((value['dateUpdated']).toISOString()),
        'externalId': value['externalId'],
        'name': value['name'],
        'email': value['email'],
    };
}

