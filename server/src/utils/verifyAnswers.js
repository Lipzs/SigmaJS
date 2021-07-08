function verifyAnswers(stack) {
  for (var prop in stack) {
    if (stack.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

export default verifyAnswers;