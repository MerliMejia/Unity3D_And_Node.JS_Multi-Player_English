import { IPlayer } from "../Server";

//We're going to use it to know which room type
interface RoomConfig {
  mode: "1VS1" | "2VS2";
}

/**
 * This method returns true if the players type is for OneVsOne rooms
 * @param players type: { player1: IPlayer; player2: IPlayer } | Map<String, IPlayer>
 */
function isOneVsOne(
  players: { player1: IPlayer; player2: IPlayer } | Map<String, IPlayer>
): players is { player1: IPlayer; player2: IPlayer } {
  return <Map<String, IPlayer>>players == undefined;
}

/**
 * This is kind of the abstract class from which all the rooms are going to inherit from.
 */ 
class Habitacion {
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
    if (isOneVsOne(type)) {
      this.config = { mode: "1VS1" };
      this.player1 = type.player1;
      this.player2 = type.player2;
    } else {
      this.config = { mode: "2VS2" };
      this.players = type;
    }
  }
}

/**
 * This will be the class for working with one vs one rooms
 */
export class OneVsOne extends Habitacion {
  constructor(player1: IPlayer, player2: IPlayer) {
    super({ player1: player1, player2: player2 });
  }
}
