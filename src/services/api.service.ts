import {
    Configuration,
    EpisodeControllerApi,
    HTTPHeaders,
    ImageControllerApi,
    PlayQueueControllerApi,
    ScannerControllerApi,
    SeasonControllerApi,
    ShowControllerApi,
    TranscoderControllerApi
} from "@/generated-sources/openapi";
import AuthService from "./auth.service";
import {User} from "oidc-client-ts";

export default class ApiService {
    authService: AuthService | undefined;

    httpHeaders: HTTPHeaders;

    configuration: Configuration;

    constructor() {
        this.httpHeaders = {"Authorization": "Bearer not set"}
        this.configuration = new Configuration({
            basePath: import.meta.env.VITE_BACKEND_URL,
            headers: this.httpHeaders
        });
        this.authService = new AuthService((user: User) => this.onAuthUserLoaded(user));
    }

    onAuthUserLoaded(user: User) {
        console.log(user);
        console.log(this.httpHeaders);
        this.httpHeaders['Authorization'] = "Bearer " + user.access_token;
    }


    async getConfiguration(): Promise<Configuration> {
        if (this.httpHeaders['Authorization'] == "Bearer not set") {
            console.log("not set!~")
            this.httpHeaders['Authorization'] = "Bearer " + await this.authService?.getToken();
        }
        return this.configuration;
    }


    async getShowControllerApi() {
        return new ShowControllerApi(await this.getConfiguration());
    }

    async getSeasonControllerApi() {
        return new SeasonControllerApi(await this.getConfiguration());
    }

    async getEpisodeControllerApi() {
        return new EpisodeControllerApi(await this.getConfiguration());
    }

    async getImageControllerApi() {
        return new ImageControllerApi(await this.getConfiguration());
    }

    async getScannerControllerApi() {
        return new ScannerControllerApi(await this.getConfiguration());
    }

    async getTranscoderControllerApi() {
        return new TranscoderControllerApi(await this.getConfiguration());
    }

    async getPlayQueueControllerApi() {
        return new PlayQueueControllerApi(await this.getConfiguration());
    }
}
