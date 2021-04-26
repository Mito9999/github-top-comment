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
  reactions.push({ element: reaction, count: reactionCount });
});

const climbUpDomTree = (HTMLElement, count) => {
  if (count <= 0) return HTMLElement;
  return climbUpDomTree(HTMLElement.parentElement, count - 1);
};

const bestComment = reactions
  .filter((obj) => !isNaN(obj.count))
  .sort((a, b) => a.count - b.count)
  .pop();

console.log(climbUpDomTree(bestComment.element, 5));
setTimeout(() => {
  // Goes to the card element around the reaction, scrolls to it, then adds 60px offset due to header, and 15px offset for good measure
  climbUpDomTree(bestComment.element, 5).scrollIntoView();
  window.scrollBy(0, -75);
}, 1000);
