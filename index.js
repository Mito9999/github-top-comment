const reactions = [];
const reactionsPath = 'div > div.edit-comment-hide > div > form > div > button';
const emojiRegex = /([\u2764]|[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
const allReactionElements = document.querySelectorAll(reactionsPath);

const removeSpaces = (string) => string.trim().replaceAll(' ', '');
const removeNewlines = (string) => string.replaceAll('\n', '');
const format = (string) => removeNewlines(removeSpaces(string));

const removeEmoji = (string) => string.replace(emojiRegex, '');

allReactionElements.forEach((reaction) => {
  const text = format(reaction.textContent);

  // breaks on heart emoji:
  const reactionCount = Number(removeEmoji(text));
  reactions.push(reactionCount);
});

console.log(
  reactions
    .filter((num) => !isNaN(num))
    .sort((a, b) => a - b)
    .pop()
);
