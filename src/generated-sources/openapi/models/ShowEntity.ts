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
    categorieEntity: CategorieEntity;
    /**
     * 
     * @type {string}
     * @memberof ShowEntity
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof ShowEntity
     */
    releaseYear: number;
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
    if (!('categorieEntity' in value)) return false;
    if (!('name' in value)) return false;
    if (!('releaseYear' in value)) return false;
    return true;
}

export function ShowEntityFromJSON(json: any): ShowEntity {
    return ShowEntityFromJSONTyped(json, false);
}

export function ShowEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShowEntity {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'categorieEntity': CategorieEntityFromJSON(json['categorieEntity']),
        'name': json['name'],
        'releaseYear': json['releaseYear'],
        'imageEntities': json['imageEntities'] == null ? undefined : ((json['imageEntities'] as Array<any>).map(ImageEntityFromJSON)),
        'metadataEntities': json['metadataEntities'] == null ? undefined : ((json['metadataEntities'] as Array<any>).map(MetadataEntityFromJSON)),
    };
}

export function ShowEntityToJSON(value?: ShowEntity | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'categorieEntity': CategorieEntityToJSON(value['categorieEntity']),
        'name': value['name'],
        'releaseYear': value['releaseYear'],
        'imageEntities': value['imageEntities'] == null ? undefined : ((value['imageEntities'] as Array<any>).map(ImageEntityToJSON)),
        'metadataEntities': value['metadataEntities'] == null ? undefined : ((value['metadataEntities'] as Array<any>).map(MetadataEntityToJSON)),
    };
}

