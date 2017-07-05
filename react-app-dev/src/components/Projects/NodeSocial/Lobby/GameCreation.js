import React from 'react';
import styles from './GameCreation.css';

export default ({gameList, onJoinGame}) => (
  <div className={styles.container}>
    <div className={styles.title}>Game List</div>
    <div className={styles.innerContainer}>
      {
        gameList.map(game => {
          return (<div key={game.id} className={styles.gameWrap}>
            <div className={styles.gameName}>{game.name}</div>
            <div style={{textAlign: 'center'}}>players: {game.playerCount}</div>
            <div className={styles.joinBtn} onClick={onJoinGame}>Join</div>
          </div>);
        })
      }
    </div>
  </div>
);
