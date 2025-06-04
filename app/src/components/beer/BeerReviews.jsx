import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function BeerReviews({ reviews, onPostReviewButtonPress, onVoteButtonPress }) {
  return (
    <View className="bg-white border border-gray-300 rounded-xl p-4 mb-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold mb-2">Reviews</Text>

        <TouchableOpacity
          onPress={onPostReviewButtonPress}
          className="bg-green-500 px-3 py-1 rounded"
        >
          <Text className="text-black text-sm font-semibold">Post Review</Text>
        </TouchableOpacity>
      </View>

      {reviews.map((review) => (
        <View key={review.id} className="border-b border-gray-200 mb-2 pb-2">
          <Text className="font-semibold text-lg">{review.title}</Text>
          <Text className="text-gray-600 text-sm mb-1">
            By {review.user} on {review.date_created} --- Rating:{" "}
            {review.rating}
          </Text>
          <Text className="mb-2">{review.body}</Text>
          <View className="flex-row items-center justify-between">
            <Text>Votes: {review.votes}</Text>
            <TouchableOpacity
              className="bg-blue-500 px-3 py-1 rounded"
              onPress={() => onVoteButtonPress(review.id)}
            >
              <Text className="text-white">Vote +1</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

export default BeerReviews;
