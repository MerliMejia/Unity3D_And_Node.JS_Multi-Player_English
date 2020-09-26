import { IPlayer } from "../Server";

//Lo que usaremos para saber que type de habitacion es
interface HabConfig {
  mode: "1VS1" | "2VS2";
}

/**
 * Este metodo devuelve verdadero si el type de habitacion esta configurado para ser 1VS1
 * @param players type: { player1: IPlayer; player2: IPlayer } | Map<String, IPlayer>... Que type de
 * configuracion o cantidad de players es.
 */
function isOneVsOne(
  players: { player1: IPlayer; player2: IPlayer } | Map<String, IPlayer>
): players is { player1: IPlayer; player2: IPlayer } {
  return <Map<String, IPlayer>>players == undefined;
}

/**
 * Esta clase es la clase padre de donde heredaran todas las diferentes habitaciones o modes de juegos
 */
class Habitacion {
  private config: HabConfig;
  private player1: IPlayer | null = null;
  private player2: IPlayer | null = null;
  private players: Map<String, IPlayer> | null = null;

  /**
   * mode 1VS1
   * @param type { player1: IPlayer; player2: IPlayer }: Jugador 1 y 2 para esta habitacion
   */
  constructor(type: { player1: IPlayer; player2: IPlayer });

  /**
   * mode 2VS2 o mas
   * @param type  Map<String, IPlayer>: Lista de players que estaran en esta habitacion
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
 * Esta clase sera la encargada de comunicar los players en el metodo 1VS1
 */
export class OneVsOne extends Habitacion {
  constructor(player1: IPlayer, player2: IPlayer) {
    super({ player1: player1, player2: player2 });
  }
}
