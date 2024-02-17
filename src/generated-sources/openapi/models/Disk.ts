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
import type { CategorieEntity } from './CategorieEntity';
import {
    CategorieEntityFromJSON,
    CategorieEntityFromJSONTyped,
    CategorieEntityToJSON,
} from './CategorieEntity';
import type { Node } from './Node';
import {
    NodeFromJSON,
    NodeFromJSONTyped,
    NodeToJSON,
} from './Node';

/**
 * 
 * @export
 * @interface Disk
 */
export interface Disk {
    /**
     * 
     * @type {string}
     * @memberof Disk
     */
    id?: string;
    /**
     * 
     * @type {Node}
     * @memberof Disk
     */
    node?: Node;
    /**
     * 
     * @type {CategorieEntity}
     * @memberof Disk
     */
    categorieEntity?: CategorieEntity;
    /**
     * 
     * @type {string}
     * @memberof Disk
     */
    path?: string;
}

/**
 * Check if a given object implements the Disk interface.
 */
export function instanceOfDisk(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DiskFromJSON(json: any): Disk {
    return DiskFromJSONTyped(json, false);
}

export function DiskFromJSONTyped(json: any, ignoreDiscriminator: boolean): Disk {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'node': !exists(json, 'node') ? undefined : NodeFromJSON(json['node']),
        'categorieEntity': !exists(json, 'categorieEntity') ? undefined : CategorieEntityFromJSON(json['categorieEntity']),
        'path': !exists(json, 'path') ? undefined : json['path'],
    };
}

export function DiskToJSON(value?: Disk | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'node': NodeToJSON(value.node),
        'categorieEntity': CategorieEntityToJSON(value.categorieEntity),
        'path': value.path,
    };
}

