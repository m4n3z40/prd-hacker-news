import timeSince from './timeSince.mjs';

export default function createStory(storyData) {
  return Object.assign({}, storyData, {
    domain: storyData.url ? new URL(storyData.url).hostname : storyData.url,
    time_ago: timeSince(new Date(storyData.time * 1000)),
  });
}
