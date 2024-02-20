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
import type { MediaFileEntity } from './MediaFileEntity';
import {
    MediaFileEntityFromJSON,
    MediaFileEntityFromJSONTyped,
    MediaFileEntityToJSON,
} from './MediaFileEntity';
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
 * @interface EpisodeEntity
 */
export interface EpisodeEntity {
    /**
     * 
     * @type {string}
     * @memberof EpisodeEntity
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof EpisodeEntity
     */
    dateCreated?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EpisodeEntity
     */
    dateUpdated?: Date;
    /**
     * 
     * @type {ShowEntity}
     * @memberof EpisodeEntity
     */
    showEntity?: ShowEntity;
    /**
     * 
     * @type {SeasonEntity}
     * @memberof EpisodeEntity
     */
    seasonEntity?: SeasonEntity;
    /**
     * 
     * @type {Array<MediaFileEntity>}
     * @memberof EpisodeEntity
     */
    mediaFileEntities?: Array<MediaFileEntity>;
    /**
     * 
     * @type {Array<ImageEntity>}
     * @memberof EpisodeEntity
     */
    imagesEntities?: Array<ImageEntity>;
    /**
     * 
     * @type {number}
     * @memberof EpisodeEntity
     */
    number?: number;
}

/**
 * Check if a given object implements the EpisodeEntity interface.
 */
export function instanceOfEpisodeEntity(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EpisodeEntityFromJSON(json: any): EpisodeEntity {
    return EpisodeEntityFromJSONTyped(json, false);
}

export function EpisodeEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): EpisodeEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'dateCreated': !exists(json, 'dateCreated') ? undefined : (new Date(json['dateCreated'])),
        'dateUpdated': !exists(json, 'dateUpdated') ? undefined : (new Date(json['dateUpdated'])),
        'showEntity': !exists(json, 'showEntity') ? undefined : ShowEntityFromJSON(json['showEntity']),
        'seasonEntity': !exists(json, 'seasonEntity') ? undefined : SeasonEntityFromJSON(json['seasonEntity']),
        'mediaFileEntities': !exists(json, 'mediaFileEntities') ? undefined : ((json['mediaFileEntities'] as Array<any>).map(MediaFileEntityFromJSON)),
        'imagesEntities': !exists(json, 'imagesEntities') ? undefined : ((json['imagesEntities'] as Array<any>).map(ImageEntityFromJSON)),
        'number': !exists(json, 'number') ? undefined : json['number'],
    };
}

export function EpisodeEntityToJSON(value?: EpisodeEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'dateCreated': value.dateCreated === undefined ? undefined : (value.dateCreated.toISOString()),
        'dateUpdated': value.dateUpdated === undefined ? undefined : (value.dateUpdated.toISOString()),
        'showEntity': ShowEntityToJSON(value.showEntity),
        'seasonEntity': SeasonEntityToJSON(value.seasonEntity),
        'mediaFileEntities': value.mediaFileEntities === undefined ? undefined : ((value.mediaFileEntities as Array<any>).map(MediaFileEntityToJSON)),
        'imagesEntities': value.imagesEntities === undefined ? undefined : ((value.imagesEntities as Array<any>).map(ImageEntityToJSON)),
        'number': value.number,
    };
}

