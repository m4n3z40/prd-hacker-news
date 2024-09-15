import timeSince from './timeSince.ts';

export default function createStory(storyData):Story {
  return Object.assign({}, storyData, {
    time_ago: timeSince(new Date(storyData.created_at + '.000Z')),
  }) as Story;
}
