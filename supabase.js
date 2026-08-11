```javascript
/*
 * ============================================
 * JOKER NETWORK - SUPABASE CONFIGURATION
 * ============================================
 *
 * IMPORTANT:
 * Replace ONLY the two values below.
 *
 * Use:
 *   Project URL
 *   Publishable key: sb_publishable_...
 *
 * NEVER put a sb_secret_ key in this file.
 *
 * This file is loaded by:
 *   login.html
 *   register.html
 *   account.html
 *
 * ============================================
 */


const JOKER_SUPABASE_URL =
    "https://supabase.com/dashboard/project/maanrztsvaipcwzwcwcz";


const JOKER_SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_-JDxiWxIKY-0tOdBM5WJ8Q_L1cQtTQe";


/*
 * ============================================
 * CONFIGURATION CHECK
 * ============================================
 */

if (
    JOKER_SUPABASE_URL.includes(
        "https://supabase.com/dashboard/project/maanrztsvaipcwzwcwcz"
    )
) {

    console.error(
        "❌ Joker Network: Supabase Project URL has not been configured."
    );

}


if (
    JOKER_SUPABASE_PUBLISHABLE_KEY.includes(
        "sb_publishable_-JDxiWxIKY-0tOdBM5WJ8Q_L1cQtTQe"
    )
) {

    console.error(
        "❌ Joker Network: Supabase publishable key has not been configured."
    );

}


/*
 * ============================================
 * CREATE SUPABASE CLIENT
 * ============================================
 */

let jokerSupabase = null;


if (
    typeof window.supabase !== "undefined"
) {

    try {

        jokerSupabase =
            window.supabase.createClient(
                JOKER_SUPABASE_URL,
                JOKER_SUPABASE_PUBLISHABLE_KEY
            );


        console.log(
            "🃏 Joker Network: Supabase connected."
        );


    }

    catch (error) {

        console.error(
            "❌ Joker Network: Could not create Supabase client.",
            error
        );

    }

}

else {

    console.error(
        "❌ Joker Network: Supabase JavaScript library was not loaded."
    );

}
```
