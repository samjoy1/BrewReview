// IMPORTS
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseconfig";

console.log("fetch.js DEBUG: FIRESTORE_DB imported as:", FIRESTORE_DB);

// GET DATA
export async function fetchData(collection, id) {
  return new Promise(async function (resolve, reject) {
    console.log(
      "fetch.js DEBUG: Inside fetchData - FIRESTORE_DB is:",
      FIRESTORE_DB
    );
    console.log("fetch.js DEBUG: 'collection' argument is:", collection);
    console.log("fetch.js DEBUG: 'id' argument is:", id);

    // 💡 Fix: Make sure id is a string
    const safeId =
      typeof id === "string"
        ? id
        : typeof id === "object" && id?.id
        ? id.id
        : null;

    if (!collection || typeof collection !== "string" || !safeId) {
      console.error("fetchData: Invalid collection or id", { collection, id });
      reject(new Error("Invalid collection or id"));
      return;
    }

    try {
      const docRef = doc(FIRESTORE_DB, collection, safeId);
      const docSnap = await getDoc(docRef);
      resolve(docSnap);
    } catch (err) {
      console.error("fetchData: Failed to fetch doc", err);
      reject(err);
    }
  });
}

// GET BY ID (with ID sanitisation for beer_id)
export async function getBeerById(beer_id, setFunction) {
  const safeId = typeof beer_id === "string" ? beer_id : beer_id?.id;
  if (!safeId) {
    console.warn("getBeerById: Invalid beer_id passed:", beer_id);
    return null;
  }

  return fetchData("beers", safeId)
    .then((beer) => {
      if (setFunction) setFunction(beer.data());
      return beer.data();
    })
    .catch((err) => {
      console.error("getBeerById error:", err);
      return null;
    });
}

export async function getBreweryById(brewery_id, setFunction) {
  return fetchData("breweries", brewery_id)
    .then((brewery) => {
      if (setFunction) setFunction(brewery.data());
      return brewery.data();
    })
    .catch((err) => {
      console.error("getBreweryById error:", err);
      return null;
    });
}

export async function getCategoryById(category_id, setFunction) {
  return fetchData("categories", category_id)
    .then((category) => {
      if (setFunction) setFunction(category.data());
      return category.data();
    })
    .catch((err) => {
      console.error("getCategoryById error:", err);
      return null;
    });
}

export async function getReviewById(review_id, setFunction) {
  return fetchData("reviews", review_id)
    .then((review) => {
      if (setFunction) setFunction(review.data());
      return review.data();
    })
    .catch((err) => {
      console.error("getReviewById error:", err);
      return null;
    });
}

export async function getUserById(user_id, setFunction) {
  return fetchData("users", user_id)
    .then((user) => {
      if (setFunction) setFunction(user.data());
      return user.data();
    })
    .catch((err) => {
      console.error("getUserById error:", err);
      return null;
    });
}
