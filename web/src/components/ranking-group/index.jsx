import React from 'react';
import { Avatar } from '@chakra-ui/react';

import './styles.css';

export default function rankItem(props) {
  const { srcPhoto, name, points } = props;

  return (
    <div className="rankItem">
      <div className="rankPhoto">
        <Avatar src={srcPhoto} name={name} size="md" />
      </div>
      <div className="rankInfos">
        <p>{name}</p>
        <h2>{points}</h2>
      </div>
    </div>
  );
}
