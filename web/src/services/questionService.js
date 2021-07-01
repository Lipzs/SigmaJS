export default function questionService(id, alternativeValue, questions) {
  const newArray = []
  questions.map((question, index) => {
    if (question.id_question === id) {
      question.userAnswer = alternativeValue;
    }
    if(index === 9){
      return newArray.push(questions);
    }
  });
  return newArray;
}


