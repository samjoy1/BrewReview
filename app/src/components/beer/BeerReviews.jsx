import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function BeerReviews({
  reviews,
  onPostReviewButtonPress,
  onVoteButtonPress,
  hasVotedOnReviewID,
  loggedInUser,
}) {
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

      {reviews.map((review) => {
        // Calculate vote count from the array length
        const voteCount = review.votes ? review.votes.length : 0;
        // Determine if the vote button should be disabled
        const isVoteDisabled =
          !loggedInUser || hasVotedOnReviewID.includes(review.id);

        return (
          <View key={review.id} className="border-b border-gray-200 mb-2 pb-2">
            <Text className="font-semibold text-lg">{review.title}</Text>
            <Text className="text-gray-600 text-sm mb-1">
              By {review.user_id} on{" "}
              {new Date(review.created_at).toLocaleDateString()} --- Rating:{" "}
              {/* Correct Date format */}
              {review.rating}
            </Text>
            <Text className="mb-2">{review.body}</Text>
            <View className="flex-row items-center justify-between">
              {/* Display vote count from array length */}
              <Text>Votes: {voteCount}</Text>
              <TouchableOpacity
                className={`px-3 py-1 rounded ${
                  isVoteDisabled ? "bg-gray-400" : "bg-blue-500"
                }`} // Change button color when disabled
                onPress={() => onVoteButtonPress(review.id)}
                disabled={isVoteDisabled} // Disable the button
              >
                <Text className="text-white">Vote +1</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default BeerReviews;
