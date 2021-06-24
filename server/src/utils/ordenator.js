function ordenator(ordenation, queue) {
  if (ordenation === 'name') {
    return orderByName(queue);
  } else if (ordenation === 'score') {
    return orderByScore(queue);
  } 

  return orderByScore(queue);
}

function orderByName(queue) {
  queue.sort(function (a, b) {
    if (a.player_name > b.player_name) {
      return 1;
    }
    if (a.player_name < b.player_name) {
      return -1;
    }
    return 0;
  });

  return queue;
}

function orderByScore(queue) {
  queue.sort(function (a, b) {
    if (a.scores < b.scores) {
      return 1;
    }
    if (a.scores > b.scores) {
      return -1;
    }
    return 0;
  });

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