(() => {
  try {
    const reactions = [];
    const reactionsPath = 'div > div.edit-comment-hide > div > form > div > button';
    const emojiRegex = /[^\x00-\x7F]/g;
    const allReactionElements = document.querySelectorAll(reactionsPath);

    const removeSpaces = (string) => string.trim().replaceAll(' ', '');
    const removeNewlines = (string) => string.replaceAll('\n', '');
    const format = (string) => removeNewlines(removeSpaces(string));

    const removeEmoji = (string) => string.replace(emojiRegex, '');

    allReactionElements.forEach((reaction) => {
      const text = format(reaction.textContent);

      const reactionCount = Number(removeEmoji(text));
      reactions.push({ element: reaction, count: reactionCount });
    });

    console.log(reactions);

    const climbUpDomTree = (HTMLElement, count) => {
      if (count <= 0) return HTMLElement;
      return climbUpDomTree(HTMLElement.parentElement, count - 1);
    };

    const bestComment = reactions
      .filter((obj) => !isNaN(obj.count))
      .sort((a, b) => a.count - b.count)
      .pop();

    // Goes to the card element around the reaction, scrolls to it, then adds 60px offset due to header, and 15px offset for good measure
    climbUpDomTree(bestComment.element, 5).scrollIntoView();
    window.scrollBy(0, -75);
  } catch {}
})();
