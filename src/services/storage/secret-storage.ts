import {decryptSecret, encryptSecret, generateRandomPassphrase} from "/src/utils/crypto-functions.js";
import {state} from "/src/state/state-holder.js";
import {Persistence} from "/src/services/storage/persistence.js";

export type StoredSecret = {
    secret: string;
    expiryDate: Date;
}

export type DecryptedSecret = {
    secret: string;
    expiryDate: Date;
}

export class SecretStorage {
    public static async storeSecret(secret: string){
        const passphrase1 = generateRandomPassphrase(20);
        const passphrase2 = generateRandomPassphrase(20);
        const expiryDate = new Date(new Date().getTime() + state.value.userPreferences.sensitive.rememberDurationM * 60 * 1000);
        const encrypted = await encryptSecret<StoredSecret>({secret, expiryDate}, passphrase1, passphrase2);
        Persistence.addToCookie("SESSION_KEY", passphrase1);
        Persistence.addToCookie("DURATION_KEY", passphrase2, expiryDate);
        Persistence.addToStorage("ENCRYPTED_SECRET", encrypted);
    }

    public static async retrieveSecret(): Promise<DecryptedSecret | null> {
        const durationKey = Persistence.getFromCookie<string>("DURATION_KEY");
        const sessionKey = Persistence.getFromCookie<string>("SESSION_KEY");
        const encrypted = Persistence.getFromStorage<string>("ENCRYPTED_SECRET");
        if(encrypted && durationKey && sessionKey) {
            const decrypted = await decryptSecret<DecryptedSecret>(encrypted, sessionKey, durationKey);
            decrypted.expiryDate = new Date(decrypted.expiryDate)
            return decrypted;
        } else {
            return null;
        }
    }

    static purge() {
        Persistence.removeFromStorage("ENCRYPTED_SECRET");
        Persistence.deleteAllCookies();
    }
}