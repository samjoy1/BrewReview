import { useState } from 'react';
import StarRating from 'react-native-star-rating-widget';
import { Text, View, TouchableOpacity } from "react-native";

function ReviewRating ( { posting_user_id, posting_beer_id, submitReview } ) {
    const [rating, setRating] = useState(0)

    function createReview () {
        let review_id = posting_beer_id+"#"+posting_user_id

        const newReview = {
            "id": review_id,
            "type": "rating",
            "user_id": posting_user_id,
            "beer_id": posting_beer_id,
            "title": "",
            "body": "",
            "tags": [],
            "rating": rating,
            "created_at": Date.now(),
            "votes": []
        }
        submitReview(newReview)
    }

    return (
        <View>
            <View className="text-white w-32 bg-stone-900 rounded-t-xl ml-6 p-2">
                <Text className='text-white'>Leave a Rating</Text>
            </View>
            <View className="flex w-full bg-stone-900/90 rounded-xl mb-8 p-4 border border-amber-300/90">
                <View className="flex-row justify-center m-5 bg-gray-500 rounded-xl">
                        <StarRating                                                 // Rating                                                 
                            rating={rating}
                            onChange={setRating}
                            enableHalfStar={false}
                            starSize={40}
                        />
                </View>
                <TouchableOpacity                                           // Submit Button
                    onPress={() => { createReview() }}
                    className="flex-row justify-center bg-green-400 rounded-xl px-6 py-6 mx-4 mb-6 hover:bg-green-300"
                >
                    <Text className="text-black text-lg font-bold">Leave Rating</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReviewRating