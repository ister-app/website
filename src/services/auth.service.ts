import {User, UserManager, UserManagerSettings} from "oidc-client-ts";


export default class AuthService {
    userManager: UserManager;

    constructor(onAuthUserLoaded: any) {
        const settings: UserManagerSettings = {
            authority: import.meta.env.VITE_OIDC_URL,
            client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
            redirect_uri: window.location.origin + `/signin-callback`,
            post_logout_redirect_uri: window.location.origin + `/`,
            response_type: 'code',
        };
        this.userManager = new UserManager(settings);
        this.userManager.events.addUserLoaded((user: User) => onAuthUserLoaded(user));
    }

    getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    async getToken(): Promise<String | undefined> {
        const user = await this.getUser();
        return user?.access_token;
    }

    login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    renewToken(): Promise<User | null> {
        return this.userManager.signinSilent();
    }

    logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }
}
