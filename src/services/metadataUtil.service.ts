import {EpisodeEntity, SeasonEntity, ShowEntity} from "@/generated-sources/openapi";


export interface Metadata {
    language?: string | null | undefined;
    title?: string | null | undefined;
}

/**
 * This util helps with getting the correct value for the given language.
 * If the given language doesn't exist return english then the not set language.
 */
export default class MetadataUtilService {
    public static getMetadataFieldForLanguage(field: string, metadataEntities: Metadata[] | null | undefined, preferredLanguage: String | undefined): string | undefined | Date | ShowEntity | SeasonEntity | EpisodeEntity {
        if (metadataEntities === undefined || metadataEntities === null) {
            return "";
        } else {
            const preferred = metadataEntities.filter((stream) => stream.language === preferredLanguage);
            if (preferred && preferred.length != 0 && preferred[0][field as keyof Metadata]) {
                return preferred[0][field as keyof Metadata]!;
            } else if (preferredLanguage != "eng" && preferredLanguage != undefined) {
                return MetadataUtilService.getMetadataFieldForLanguage(field, metadataEntities, "eng");
            } else if (preferredLanguage == "eng") {
                return MetadataUtilService.getMetadataFieldForLanguage(field, metadataEntities, undefined);
            } else {
                return "";
            }
        }
    }
}
