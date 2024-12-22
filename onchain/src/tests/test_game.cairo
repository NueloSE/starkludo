#[cfg(test)]
mod tests {
    use dojo_cairo_test::WorldStorageTestTrait;
    use dojo::model::{ModelStorage, ModelValueStorage, ModelStorageTest};
    use dojo::world::WorldStorageTrait;
    use dojo_cairo_test::{
        spawn_test_world, NamespaceDef, TestResource, ContractDefTrait, ContractDef
    };

    use starkludo::systems::game_actions::{
        GameActions, IGameActionsDispatcher, IGameActionsDispatcherTrait
    };
    use starkludo::models::game::{Game, m_Game};
    use starkludo::models::player::{Player, m_Player, AddressToUsername, UsernameToAddress, m_AddressToUsername, m_UsernameToAddress};

    fn namespace_def() -> NamespaceDef {
        let ndef = NamespaceDef {
            namespace: "starkludo", resources: [
                TestResource::Model(m_Game::TEST_CLASS_HASH),
                TestResource::Model(m_Player::TEST_CLASS_HASH),
                TestResource::Model(m_AddressToUsername::TEST_CLASS_HASH),
                TestResource::Model(m_UsernameToAddress::TEST_CLASS_HASH),
                TestResource::Contract(GameActions::TEST_CLASS_HASH),
                TestResource::Event(GameActions::e_GameCreated::TEST_CLASS_HASH),
            ].span()
        };

        ndef
    }

    fn contract_defs() -> Span<ContractDef> {
        [
            ContractDefTrait::new(@"starkludo", @"GameActions")
                .with_writer_of([dojo::utils::bytearray_hash(@"starkludo")].span())
        ].span()
    }

    #[test]
    fn test_world() {
        let caller = starknet::contract_address_const::<'caller'>();

        let ndef = namespace_def();
        let mut world = spawn_test_world([ndef].span());
        world.sync_perms_and_inits(contract_defs());

        let (contract_address, _) = world.dns(@"GameActions").unwrap();
        let game_action_system = IGameActionsDispatcher { contract_address };
    }

    #[test]
    fn test_roll() {
        let ndef = namespace_def();
        let mut world = spawn_test_world([ndef].span());
        world.sync_perms_and_inits(contract_defs());

        let (contract_address, _) = world.dns(@"GameActions").unwrap();
        let game_action_system = IGameActionsDispatcher { contract_address };

        let mut unique_rolls = ArrayTrait::new();
        let mut i: u8 = 0;
        while i < 100 {
            let (dice1, dice2) = game_action_system.roll();

            assert(dice1 <= 6, 'Dice1 Exceeded Max');
            assert(dice1 > 0, 'Dice1 Below Min');
            assert(dice2 <= 6, 'Dice2 Exceeded Max');
            assert(dice2 > 0, 'Dice2 Below Min');

            let roll_combo = dice1 * 10 + dice2;
            unique_rolls.append(roll_combo);

            i += 1;
        };

        assert(unique_rolls.len() > 1, 'Not enough unique rolls');
    }

    #[test]
    fn test_get_username_from_address() {
    
        let ndef = namespace_def();
        let mut world = spawn_test_world([ndef].span());
        world.sync_perms_and_inits(contract_defs());
        
        let (contract_address, _) = world.dns(@"GameActions").unwrap();
        let game_action_system = IGameActionsDispatcher { contract_address };
        
        let test_address1 = starknet::contract_address_const::<'test_user1'>();
        let test_address2 = starknet::contract_address_const::<'test_user2'>();
        let username1: felt252 = 'alice';
        let username2: felt252 = 'bob';

        let address_to_username1 = AddressToUsername { 
            address: test_address1,
            username: username1 
        };
        let address_to_username2 = AddressToUsername { 
            address: test_address2,
            username: username2 
        };
       
        world.write_model(@address_to_username1);
        world.write_model(@address_to_username2);

        let retrieved_username1 = game_action_system.get_username_from_address(test_address1);
        let retrieved_username2 = game_action_system.get_username_from_address(test_address2);

        assert(retrieved_username1 == username1, 'Wrong username for address1');
        assert(retrieved_username2 == username2, 'Wrong username for address2');

        let non_existent_address = starknet::contract_address_const::<'non_existent'>();
        let retrieved_username3 = game_action_system.get_username_from_address(non_existent_address);
        assert(retrieved_username3 == 0, 'Non-existent should return 0');
    }
}
