// IMPORTS
import { deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseconfig.js";


// DELETE FUNCTIONS
export async function deleteBeer (beer_id, setLoading, setError) {
    if (setLoading) setLoading(true)

    await deleteDoc(doc(FIRESTORE_DB, "beer", beer_id))    
    .catch((err) => { 
        if (setError) setError(err)
        return err })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

export async function deleteBrewery (brewery_id, setLoading, setError) {
    if (setLoading) setLoading(true)

    await deleteDoc(doc(FIRESTORE_DB, "breweries", brewery_id))    
    .catch((err) => { 
        if (setError) setError(err)
        return err })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

export async function deleteCategory (category_id, setLoading, setError) {
    if (setLoading) setLoading(true)

    await deleteDoc(doc(FIRESTORE_DB, "categories", category_id))    
    .catch((err) => { 
        if (setError) setError(err)
        return err })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

export async function deleteReview (review_id, setLoading, setError) {
    if (setLoading) setLoading(true)

    await deleteDoc(doc(FIRESTORE_DB, "reviews", review_id))    
    .catch((err) => { 
        if (setError) setError(err)
        return err })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

export async function deleteUser (user_id, setLoading, setError) {
    if (setLoading) setLoading(true)

    await deleteDoc(doc(FIRESTORE_DB, "users", user_id))    
    .catch((err) => { 
        if (setError) setError(err)
        return err })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

deleteReview("313_craft#bitter_black")