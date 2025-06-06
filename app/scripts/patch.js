import { doc, setDoc } from "firebase/firestore"
import { FIRESTORE_DB } from "../../firebaseconfig"

// PATCH FUNCTIONS

// BEER
export function patchBeer (beer, setLoading, setError) { // beer: the beer object
    if (setLoading) setLoading(true)

    try { setDoc(doc(FIRESTORE_DB, "beers", beer.id), {...beer}) }
    catch(err) { 
        if (setError) setError(err)
        return console.log(err) }
    finally { 
        if (setLoading) setLoading(false)
        return "beer successfully updated!" }
}

// BREWERY
export function patchBrewery (brewery, setLoading, setError) { // brewery: the brewery object
    if (setLoading) setLoading(true)

    try { setDoc(doc(FIRESTORE_DB, "breweries", brewery.id), {...brewery}) }
    catch(err) { 
        if (setError) setError(err)
        return console.log(err) }
    finally { 
        if (setLoading) setLoading(false)
        return "brewery successfully updated!" }
}

// CATEGORY
export function patchCategory (category, setLoading, setError) { // category: the category object
    if (setLoading) setLoading(true)

    try { setDoc(doc(FIRESTORE_DB, "categories", category.id), {...category}) }
    catch(err) { 
        if (setError) setError(err)
        return console.log(err) }
    finally { 
        if (setLoading) setLoading(false)
        return "category successfully updated!" }
}

// REVIEW
export function patchReview (review, setLoading, setError) { // review: the review object
    if (setLoading) setLoading(true)

    try { setDoc(doc(FIRESTORE_DB, "reviews", review.id), {...review}) }
    catch(err) { 
        if (setError) setError(err)
        return console.log(err) }
    finally { 
        if (setLoading) setLoading(false)
        return "review successfully updated!" }
}

export function patchUser (user, setLoading, setError) { // user: the user object
    if (setLoading) setLoading(true)

    try { setDoc(doc(FIRESTORE_DB, "users", user.id), {...user}) }
    catch(err) { 
        if (setError) setError(err)
        return console.log(err) }
    finally { 
        if (setLoading) setLoading(false)
        return "user successfully updated!" }
}