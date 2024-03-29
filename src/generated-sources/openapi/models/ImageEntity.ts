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
import type { DiskEntity } from './DiskEntity';
import {
    DiskEntityFromJSON,
    DiskEntityFromJSONTyped,
    DiskEntityToJSON,
} from './DiskEntity';
import type { EpisodeEntity } from './EpisodeEntity';
import {
    EpisodeEntityFromJSON,
    EpisodeEntityFromJSONTyped,
    EpisodeEntityToJSON,
} from './EpisodeEntity';
import type { SeasonEntity } from './SeasonEntity';
import {
    SeasonEntityFromJSON,
    SeasonEntityFromJSONTyped,
    SeasonEntityToJSON,
} from './SeasonEntity';
import type { ShowEntity } from './ShowEntity';
import {
    ShowEntityFromJSON,
    ShowEntityFromJSONTyped,
    ShowEntityToJSON,
} from './ShowEntity';

/**
 * 
 * @export
 * @interface ImageEntity
 */
export interface ImageEntity {
    /**
     * 
     * @type {string}
     * @memberof ImageEntity
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof ImageEntity
     */
    dateCreated: Date;
    /**
     * 
     * @type {Date}
     * @memberof ImageEntity
     */
    dateUpdated: Date;
    /**
     * 
     * @type {DiskEntity}
     * @memberof ImageEntity
     */
    diskEntity: DiskEntity;
    /**
     * 
     * @type {string}
     * @memberof ImageEntity
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof ImageEntity
     */
    type: ImageEntityTypeEnum;
    /**
     * 
     * @type {ShowEntity}
     * @memberof ImageEntity
     */
    showEntity?: ShowEntity;
    /**
     * 
     * @type {SeasonEntity}
     * @memberof ImageEntity
     */
    seasonEntity?: SeasonEntity;
    /**
     * 
     * @type {EpisodeEntity}
     * @memberof ImageEntity
     */
    episodeEntity?: EpisodeEntity;
}


/**
 * @export
 */
export const ImageEntityTypeEnum = {
    Cover: 'COVER',
    Background: 'BACKGROUND',
    Unknown: 'UNKNOWN'
} as const;
export type ImageEntityTypeEnum = typeof ImageEntityTypeEnum[keyof typeof ImageEntityTypeEnum];


/**
 * Check if a given object implements the ImageEntity interface.
 */
export function instanceOfImageEntity(value: object): boolean {
    if (!('dateCreated' in value)) return false;
    if (!('dateUpdated' in value)) return false;
    if (!('diskEntity' in value)) return false;
    if (!('path' in value)) return false;
    if (!('type' in value)) return false;
    return true;
}

export function ImageEntityFromJSON(json: any): ImageEntity {
    return ImageEntityFromJSONTyped(json, false);
}

export function ImageEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): ImageEntity {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'dateCreated': (new Date(json['dateCreated'])),
        'dateUpdated': (new Date(json['dateUpdated'])),
        'diskEntity': DiskEntityFromJSON(json['diskEntity']),
        'path': json['path'],
        'type': json['type'],
        'showEntity': json['showEntity'] == null ? undefined : ShowEntityFromJSON(json['showEntity']),
        'seasonEntity': json['seasonEntity'] == null ? undefined : SeasonEntityFromJSON(json['seasonEntity']),
        'episodeEntity': json['episodeEntity'] == null ? undefined : EpisodeEntityFromJSON(json['episodeEntity']),
    };
}

export function ImageEntityToJSON(value?: ImageEntity | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'dateCreated': ((value['dateCreated']).toISOString()),
        'dateUpdated': ((value['dateUpdated']).toISOString()),
        'diskEntity': DiskEntityToJSON(value['diskEntity']),
        'path': value['path'],
        'type': value['type'],
        'showEntity': ShowEntityToJSON(value['showEntity']),
        'seasonEntity': SeasonEntityToJSON(value['seasonEntity']),
        'episodeEntity': EpisodeEntityToJSON(value['episodeEntity']),
    };
}

