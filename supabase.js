```javascript
/* =========================================================
   JOKER NETWORK
   SUPABASE AUTHENTICATION
   =========================================================

   File:
   supabase.js

   Used by:
   - register.html
   - login.html
   - account.html
   - Future Joker Network pages

   IMPORTANT:
   This file uses the PUBLIC/PUBLISHABLE Supabase key.

   NEVER put:
   - sb_secret_...
   - service_role keys
   in this file.

========================================================= */


/* =========================================================
   SUPABASE PROJECT CONFIGURATION
========================================================= */

/*
   1. Open Supabase Dashboard
   2. Project Settings
   3. API
   4. Copy your Project URL
   5. Copy your Publishable key
*/


const SUPABASE_URL =
    "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";


const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_-JDxiWxIKY-0tOdBM5WJ8Q_L1cQtTQe";


/* =========================================================
   CREATE SUPABASE CLIENT
========================================================= */

if (
    typeof window.supabase === "undefined"
) {

    console.error(
        "Joker Network: Supabase JavaScript library was not loaded."
    );

} else {

    window.jokerSupabase =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );

}


/* =========================================================
   JOKER NETWORK CONFIGURATION
========================================================= */

const JOKER_CONFIG = {

    siteName:
        "Joker Network",

    brand:
        "Joker",

    version:
        "Joker Release",

    homePage:
        "index.html",

    loginPage:
        "login.html",

    registerPage:
        "register.html",

    accountPage:
        "account.html",

    gamesPage:
        "games.html",

    shopPage:
        "shop.html",

    donatePage:
        "donate.html"

};


/* =========================================================
   SUPABASE CLIENT CHECK
========================================================= */

function jokerSupabaseReady() {

    return (
        typeof window.jokerSupabase !== "undefined"
    );

}


/* =========================================================
   GET CURRENT USER
========================================================= */

async function getJokerUser() {

    if (!jokerSupabaseReady()) {

        console.error(
            "Joker Network: Supabase is not ready."
        );

        return null;

    }


    try {

        const {
            data,
            error
        } =
            await window.jokerSupabase.auth.getUser();


        if (error) {

            console.error(
                "Joker Network: Unable to get user.",
                error
            );

            return null;

        }


        return data.user || null;

    }

    catch (error) {

        console.error(
            "Joker Network: User check failed.",
            error
        );

        return null;

    }

}


/* =========================================================
   GET CURRENT SESSION
========================================================= */

async function getJokerSession() {

    if (!jokerSupabaseReady()) {

        return null;

    }


    try {

        const {
            data,
            error
        } =
            await window.jokerSupabase.auth.getSession();


        if (error) {

            console.error(
                "Joker Network: Session error.",
                error
            );

            return null;

        }


        return data.session || null;

    }

    catch (error) {

        console.error(
            "Joker Network: Session check failed.",
            error
        );

        return null;

    }

}


/* =========================================================
   GET DISPLAY NAME
========================================================= */

function getJokerDisplayName(user) {

    if (!user) {

        return "Joker User";

    }


    const displayName =
        user.user_metadata?.display_name;


    if (
        displayName &&
        displayName.trim() !== ""
    ) {

        return displayName.trim();

    }


    if (user.email) {

        return user.email.split("@")[0];

    }


    return "Joker User";

}


/* =========================================================
   LOGIN
========================================================= */

async function jokerLogin(
    email,
    password
) {

    if (!jokerSupabaseReady()) {

        return {

            data: null,

            error: new Error(
                "Supabase is not configured."
            )

        };

    }


    return await window.jokerSupabase.auth
        .signInWithPassword({

            email:
                email.trim(),

            password:
                password

        });

}


/* =========================================================
   REGISTER
========================================================= */

async function jokerRegister(
    email,
    password,
    displayName
) {

    if (!jokerSupabaseReady()) {

        return {

            data: null,

            error: new Error(
                "Supabase is not configured."
            )

        };

    }


    const redirectURL =
        window.location.origin +
        window.location.pathname
            .replace(
                "register.html",
                "login.html"
            );


    return await window.jokerSupabase.auth
        .signUp({

            email:
                email.trim(),

            password:
                password,

            options: {

                data: {

                    display_name:
                        displayName.trim()

                },

                emailRedirectTo:
                    redirectURL

            }

        });

}


/* =========================================================
   LOGOUT
========================================================= */

async function jokerLogout() {

    if (!jokerSupabaseReady()) {

        return {

            error: new Error(
                "Supabase is not configured."
            )

        };

    }


    return await window.jokerSupabase.auth
        .signOut();

}


/* =========================================================
   REQUIRE LOGIN
=========================================================

   Use this on pages that should only be accessible
   to authenticated Joker Network users.

   Example:

   requireJokerLogin();

========================================================= */

async function requireJokerLogin() {

    const session =
        await getJokerSession();


    if (!session) {

        window.location.href =
            JOKER_CONFIG.loginPage;

        return null;

    }


    return session;

}


/* =========================================================
   REDIRECT IF ALREADY LOGGED IN
========================================================= */

async function redirectIfJokerLoggedIn() {

    const session =
        await getJokerSession();


    if (session) {

        window.location.href =
            JOKER_CONFIG.accountPage;

        return true;

    }


    return false;

}


/* =========================================================
   AUTH STATE LISTENER
========================================================= */

function watchJokerAuth(
    callback
) {

    if (!jokerSupabaseReady()) {

        return null;

    }


    const {

        data: {
            subscription

        }

    } =
        window.jokerSupabase.auth
            .onAuthStateChange(
                (
                    event,
                    session
                ) => {

                    if (
                        typeof callback ===
                        "function"
                    ) {

                        callback(
                            event,
                            session
                        );

                    }

                }
            );


    return subscription;

}


/* =========================================================
   JOKER AUTH EVENTS
=========================================================

   Possible events include:

   INITIAL_SESSION
   SIGNED_IN
   SIGNED_OUT
   PASSWORD_RECOVERY
   TOKEN_REFRESHED
   USER_UPDATED

========================================================= */


/* =========================================================
   PROTECT ACCOUNT PAGE
========================================================= */

async function protectJokerAccount() {

    const session =
        await getJokerSession();


    if (!session) {

        window.location.replace(
            JOKER_CONFIG.loginPage
        );

        return false;

    }


    return true;

}


/* =========================================================
   SAFE EMAIL DISPLAY
========================================================= */

function jokerEmail(user) {

    if (
        !user ||
        !user.email
    ) {

        return "";

    }


    return user.email;

}


/* =========================================================
   JOKER ACCOUNT INFORMATION
========================================================= */

async function getJokerAccountInfo() {

    const user =
        await getJokerUser();


    if (!user) {

        return null;

    }


    return {

        id:
            user.id,

        email:
            user.email || "",

        displayName:
            getJokerDisplayName(user),

        createdAt:
            user.created_at || "",

        lastLogin:
            user.last_sign_in_at || "",

        emailConfirmed:
            Boolean(
                user.email_confirmed_at
            )

    };

}


/* =========================================================
   EMAIL VERIFICATION STATUS
========================================================= */

async function isJokerEmailVerified() {

    const user =
        await getJokerUser();


    if (!user) {

        return false;

    }


    return Boolean(
        user.email_confirmed_at
    );

}


/* =========================================================
   SEND PASSWORD RESET
========================================================= */

async function jokerResetPassword(
    email
) {

    if (!jokerSupabaseReady()) {

        return {

            data: null,

            error: new Error(
                "Supabase is not configured."
            )

        };

    }


    const resetURL =
        window.location.origin +
        window.location.pathname
            .replace(
                "login.html",
                "login.html"
            );


    return await window.jokerSupabase.auth
        .resetPasswordForEmail(
            email.trim(),
            {

                redirectTo:
                    resetURL

            }
        );

}


/* =========================================================
   JOKER LOGOUT + REDIRECT
========================================================= */

async function jokerLogoutAndRedirect() {

    const {
        error
    } =
        await jokerLogout();


    if (error) {

        console.error(
            "Joker Network: Logout failed.",
            error
        );

        return false;

    }


    window.location.href =
        JOKER_CONFIG.homePage;


    return true;

}


/* =========================================================
   INITIAL AUTH CHECK
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (
            !jokerSupabaseReady()
        ) {

            console.warn(
                "Joker Network: Supabase is not configured yet."
            );

            return;

        }


        console.log(
            "🃏 Joker Network Supabase initialized."
        );

    }
);


/* =========================================================
   END
========================================================= */

```
