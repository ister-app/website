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
import type { ImageEntity } from './ImageEntity';
import {
    ImageEntityFromJSON,
    ImageEntityFromJSONTyped,
    ImageEntityToJSON,
} from './ImageEntity';
import type { MetadataEntity } from './MetadataEntity';
import {
    MetadataEntityFromJSON,
    MetadataEntityFromJSONTyped,
    MetadataEntityToJSON,
} from './MetadataEntity';

/**
 * 
 * @export
 * @interface ShowEntity
 */
export interface ShowEntity {
    /**
     * 
     * @type {string}
     * @memberof ShowEntity
     */
    id?: string;
    /**
     * 
     * @type {CategorieEntity}
     * @memberof ShowEntity
     */
    categorieEntity?: CategorieEntity;
    /**
     * 
     * @type {string}
     * @memberof ShowEntity
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof ShowEntity
     */
    releaseYear?: number;
    /**
     * 
     * @type {Array<ImageEntity>}
     * @memberof ShowEntity
     */
    imageEntities?: Array<ImageEntity>;
    /**
     * 
     * @type {Array<MetadataEntity>}
     * @memberof ShowEntity
     */
    metadataEntities?: Array<MetadataEntity>;
}

/**
 * Check if a given object implements the ShowEntity interface.
 */
export function instanceOfShowEntity(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ShowEntityFromJSON(json: any): ShowEntity {
    return ShowEntityFromJSONTyped(json, false);
}

export function ShowEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShowEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'categorieEntity': !exists(json, 'categorieEntity') ? undefined : CategorieEntityFromJSON(json['categorieEntity']),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'releaseYear': !exists(json, 'releaseYear') ? undefined : json['releaseYear'],
        'imageEntities': !exists(json, 'imageEntities') ? undefined : ((json['imageEntities'] as Array<any>).map(ImageEntityFromJSON)),
        'metadataEntities': !exists(json, 'metadataEntities') ? undefined : ((json['metadataEntities'] as Array<any>).map(MetadataEntityFromJSON)),
    };
}

export function ShowEntityToJSON(value?: ShowEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'categorieEntity': CategorieEntityToJSON(value.categorieEntity),
        'name': value.name,
        'releaseYear': value.releaseYear,
        'imageEntities': value.imageEntities === undefined ? undefined : ((value.imageEntities as Array<any>).map(ImageEntityToJSON)),
        'metadataEntities': value.metadataEntities === undefined ? undefined : ((value.metadataEntities as Array<any>).map(MetadataEntityToJSON)),
    };
}

