function ordenator(ordenation, queue) {
  if (ordenation === 'name') {
    return orderByName(queue);
  } else if (ordenation === 'score') {
    return orderByScore(queue);
  } 

  return orderByScore(queue);
}

function orderByName(queue) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < queue.length - 1; i++) {
      if (queue[i]['player_name'] > queue[i + 1]['player_name']) {
        let temp = queue[i];
        queue[i] = queue[i + 1];
        queue[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return queue;
}

function orderByScore(queue) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < queue.length - 1; i++) {
      if (queue[i]['scores'] < queue[i + 1]['scores']) {
        let temp = queue[i];
        queue[i] = queue[i + 1];
        queue[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return queue;
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export default ordenator;