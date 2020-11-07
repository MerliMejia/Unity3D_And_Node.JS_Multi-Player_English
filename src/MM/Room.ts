import uuid from 'uuid';
import { IPlayer } from '../Server';

//We're going to use it to know which room type
interface RoomConfig {
  id: string;
  mode: '1VS1' | '2VS2';
}

/**
 * This method returns true if the players type is for OneVsOne rooms
 * @param players type: { player1: IPlayer; player2: IPlayer } | Map<String, IPlayer>
 */
function isOneVsOne(
  players: { player1: IPlayer; player2: IPlayer } | Map<String, IPlayer>
): players is { player1: IPlayer; player2: IPlayer } {
  return (
    (players as { player1: IPlayer; player2: IPlayer }).player1 !== undefined
  );
}

/**
 * This is kind of the abstract class from which all the rooms are going to inherit from.
 */
class Room {
  private config: RoomConfig;
  private player1: IPlayer | null = null;
  private player2: IPlayer | null = null;
  private players: Map<String, IPlayer> | null = null;

  /**
   * mode 1VS1
   * @param type { player1: IPlayer; player2: IPlayer }: Player 1 and 2 for this room.
   */
  constructor(type: { player1: IPlayer; player2: IPlayer });

  /**
   * mode 2VS2 or more
   * @param type  Map<String, IPlayer>: Player list for this room.
   */
  constructor(type: Map<String, IPlayer>);

  constructor(
    type:
      | {
          player1: IPlayer;
          player2: IPlayer;
        }
      | Map<String, IPlayer>
  ) {
    this.config = {
      id: uuid(),
      mode: '1VS1',
    };
    if (isOneVsOne(type)) {
      this.config.mode = '1VS1';
      this.player1 = type.player1;
      this.player2 = type.player2;
      console.log('HAB 1VS1 CREATED');
    } else {
      this.config.mode = '2VS2';
      this.players = type;
      console.log('HAB 2VS2 CREATED');
    }
  }
}

/**
 * This will be the class for working with one vs one rooms
 */
export class OneVsOne extends Room {
  constructor(player1: IPlayer, player2: IPlayer) {
    super({ player1: player1, player2: player2 });
  }
}

export class TwoVsTwo extends Room {
  constructor(players: Map<String, IPlayer>) {
    super(players);
  }
}
