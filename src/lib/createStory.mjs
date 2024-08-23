import timeSince from './timeSince.mjs';

export default function createStory(storyData) {
  return Object.assign({}, storyData, {
    time_ago: timeSince(new Date(storyData.created_at + '.000Z')),
  });
}
