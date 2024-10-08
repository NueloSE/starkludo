// Generated by dojo-bindgen on Mon, 30 Sep 2024 04:07:50 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript`
import { DojoProvider } from "@dojoengine/core";
import { Account, AccountInterface } from "starknet";
import * as models from "./models.gen";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export async function setupWorld(provider: DojoProvider) {
  // System definitions for `starkludo-GameActions` contract
  function GameActions() {
    const contract_name = "GameActions";

    // Call the `create` system with the specified Account and calldata
    const create = async (props: {
      account: Account;
      created_by: bigint;
      game_mode: models.GameMode;
      player_green: bigint;
      player_yellow: bigint;
      player_blue: bigint;
      player_red: bigint;
      number_of_players: number;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "create",
            calldata: [
              props.created_by,
              ["SinglePlayer", "MultiPlayer"].indexOf(props.game_mode.type),
              props.player_green,
              props.player_yellow,
              props.player_blue,
              props.player_red,
              props.number_of_players,
            ],
          },
          "starkludo"
        );
      } catch (error) {
        console.error("Error executing create:", error);
        throw error;
      }
    };

    // Call the `restart` system with the specified Account and calldata
    const restart = async (props: { account: Account; game_id: number }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "restart",
            calldata: [props.game_id],
          },
          "starkludo"
        );
      } catch (error) {
        console.error("Error executing restart:", error);
        throw error;
      }
    };

    // Call the `terminate_game` system with the specified Account and calldata
    const terminate_game = async (props: {
      account: Account;
      game_id: number;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "terminate_game",
            calldata: [props.game_id],
          },
          "starkludo"
        );
      } catch (error) {
        console.error("Error executing terminate_game:", error);
        throw error;
      }
    };

    // Call the `world` system with the specified Account and calldata
    const world = async (props: { account: Account }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "world",
            calldata: [],
          },
          "starkludo"
        );
      } catch (error) {
        console.error("Error executing world:", error);
        throw error;
      }
    };

    return {
      create,
      restart,
      terminate_game,
      world,
    };
  }

  // System definitions for `starkludo-PlayerActions` contract
  function PlayerActions() {
    const contract_name = "PlayerActions";

    // Call the `create` system with the specified Account and calldata
    const create = async (props: {
      account: Account | AccountInterface;
      username: bigint;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "create",
            calldata: [props.username],
          },
          "starkludo"
        );
      } catch (error) {
        console.error("Error executing create:", error);
        throw error;
      }
    };

    // Call the `get_address_from_username` system with the specified Account and calldata
    const get_address_from_username = async (props: {
      account: Account;
      username: bigint;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "get_address_from_username",
            calldata: [props.username],
          },
          "starkludo"
        );
      } catch (error) {
        console.error("Error executing get_address_from_username:", error);
        throw error;
      }
    };

    // Call the `get_player_stats` system with the specified Account and calldata
    const get_player_stats = async (props: {
      account: Account;
      username: bigint;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "get_player_stats",
            calldata: [props.username],
          },
          "starkludo"
        );
      } catch (error) {
        console.error("Error executing get_player_stats:", error);
        throw error;
      }
    };

    // Call the `update_username` system with the specified Account and calldata
    const update_username = async (props: {
      account: Account;
      new_username: bigint;
      old_username: bigint;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "update_username",
            calldata: [props.new_username, props.old_username],
          },
          "starkludo"
        );
      } catch (error) {
        console.error("Error executing update_username:", error);
        throw error;
      }
    };

    // Call the `world` system with the specified Account and calldata
    const world = async (props: { account: Account }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "world",
            calldata: [],
          },
          "starkludo"
        );
      } catch (error) {
        console.error("Error executing world:", error);
        throw error;
      }
    };

    return {
      create,
      get_address_from_username,
      get_player_stats,
      update_username,
      world,
    };
  }

  return {
    GameActions: GameActions(),
    PlayerActions: PlayerActions(),
  };
}