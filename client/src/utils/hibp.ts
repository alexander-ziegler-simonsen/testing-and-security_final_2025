export async function isPasswordPwned(password: string): Promise<boolean> {
    // first we take the user inputted password and hash it (SHA-1)
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();

    //console.log("the hashed password", hashHex);

    // HaveIBeenPawned only need the first 5 characters from the hash values    
    const prefix = hashHex.slice(0, 5);
    //console.log("prefix", prefix);
    const suffix = hashHex.slice(5);
    //console.log("suffix", suffix);

    // call the api
    const res = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`
    );


    const body = await res.text();
    const lines = body.split("\n");

    for (const line of lines) {
        //console.log("line:", line);
        const [hashSuffix] = line.split(":");

        if (hashSuffix.trim() === suffix) {
            //console.log("found a match:", hashSuffix.trim());
            return true;
        }
    }
    
    return false;
}
