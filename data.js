export const modes = [
  { mode: `arcade`, name: `Arcade Games`, api: `ARCADE`, icon: 'slime_ball' },
  { mode: `bedwars`, name: `Bed Wars`, api: `BEDWARS`, icon: 'bed' },
  { mode: `blitz`, name: `Blitz SG`, api: `SURVIVAL_GAMES`, icon: 'diamond_sword' },
  { mode: `buildbattle`, name: `Build Battle`, api: `BUILD_BATTLE`, icon: 'crafting_table' },
  { mode: `classic`, name: `Classic Games`, api: `LEGACY`, icon: 'jukebox' },
  { mode: `copsandcrims`, name: `Cops and Crims`, api: `MCGO`, icon: 'iron_bars' },
  { mode: `duels`, name: `Duels`, api: `DUELS`, icon: 'fishing_rod' },
  { mode: `megawalls`, name: `Mega Walls`, api: `WALLS3`, icon: 'soul_sand' },
  { mode: `murdermystery`, name: `Murder Mystery`, api: `MURDER_MYSTERY`, icon: 'bow' },
  { mode: `skywars`, name: `SkyWars`, api: `SKYWARS`, icon: 'ender_eye' },
  { mode: `smashheroes`, name: `Smash Heroes`, api: `SUPER_SMASH`, icon: 'player_head_spooderman' },
  { mode: `speeduhc`, name: `Speed UHC`, api: `SPEED_UHC`, icon: 'golden_carrot' },
  { mode: `tnt`, name: `The TNT Games`, api: `TNTGAMES`, icon: 'tnt' },
  { mode: `uhc`, name: `UHC Champions`, api: `UHC`, icon: 'golden_apple' },
  { mode: `warlords`, name: `Warlords`, api: `BATTLEGROUND`, icon: 'stone_axe' },
  { mode: `wool`, name: `Wool Games`, api: `WOOL_GAMES`, icon: 'white_wool' }
];

export const modesMap = new Map(modes.map(mode => [mode.mode, mode]));

const games = {
  arcade: [
    { name: 'Blocking Dead', api: 'DAYONE', icon: 'rotten_flesh', count: 9 },
    { name: 'Bounty Hunters', api: 'ONEINTHEQUIVER', icon: 'bow', count: 6 },
    { name: 'Creeper Attack', api: 'DEFENDER', icon: 'creeper_head', count: 5 },
    { name: 'Disasters', api: 'DISASTERS', icon: 'lava_bucket', count: 12 },
    { name: 'Dragon Wars', api: 'DRAGONWARS2', icon: 'dragon_egg', count: 5 },
    { name: 'Dropper', api: 'DROPPER', icon: 'hopper', count: 10 },
    { name: 'Ender Spleef', api: 'ENDER', icon: 'ender_pearl', count: 5 },
    { name: 'Farm Hunt', api: 'FARM_HUNT', icon: 'sheep_spawn_egg', count: 11 },
    { name: 'Football', api: 'SOCCER', icon: 'player_head_football', count: 5 },
    { name: 'Galaxy Wars', api: 'STARWARS', icon: 'firework_rocket', count: 6 },
    { name: 'Hide and Seek: Party Pooper', api: 'HIDE_AND_SEEK_PARTY_POOPER', icon: 'blaze_rod', count: 6 },
    { name: 'Hide and Seek: Prop Hunt', api: 'HIDE_AND_SEEK_PROP_HUNT', icon: 'tnt', count: 6 },
    { name: 'Hole In The Wall', api: 'HOLE_IN_THE_WALL', icon: 'bricks', count: 5 },
    { name: 'Hypixel Says', api: 'SIMON_SAYS', icon: 'cookie', count: 5 },
    { name: 'Mini Walls', api: 'MINI_WALLS', icon: 'player_head_lime_wool', count: 8 },
    { name: 'Party Games', api: 'PARTY', icon: 'cake', count: 3 },
    { name: 'Pixel Painters', api: 'DRAW_THEIR_THING', icon: 'pink_dye', count: 5 },
    { name: 'Pixel Party', api: 'PIXEL_PARTY', icon: 'record_13', count: 10 },
    { name: 'Throw Out', api: 'THROW_OUT', icon: 'snowball', count: 5 },
    { name: 'Zombies: Alien Arcadium', api: 'ZOMBIES_ALIEN_ARCADIUM', icon: 'player_head_alien_arcadium', count: 4 },
    { name: 'Zombies: Bad Blood', api: 'ZOMBIES_BAD_BLOOD', icon: 'player_head_herobrine', count: 4 },
    { name: 'Zombies: Dead End', api: 'ZOMBIES_DEAD_END', icon: 'zombie_head', count: 4 },
    { name: 'Zombies: Prison', api: 'ZOMBIES_PRISON', icon: 'player_head_undead', count: 4 }
  ],
  bedwars: [
    { name: '3v3v3v3', api: 'BEDWARS_FOUR_THREE', icon: 'bed', count: 11 },
    { name: '40v40 Castle V2', api: 'BEDWARS_CASTLE', icon: 'stone_bricks', count: 40 },
    { name: '4v4', api: 'BEDWARS_TWO_FOUR', icon: 'bed', count: 7 },
    { name: '4v4v4v4', api: 'BEDWARS_FOUR_FOUR', icon: 'bed', count: 14 },
    { name: 'Armed 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_ARMED', icon: 'diamond_hoe', count: 14 },
    { name: 'Armed Doubles', api: 'BEDWARS_EIGHT_TWO_ARMED', icon: 'diamond_hoe', count: 14 },
    { name: 'Doubles', api: 'BEDWARS_EIGHT_TWO', icon: 'bed', count: 14 },
    { name: 'Lucky V2 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_LUCKY', icon: 'player_head_lucky_block', count: 14 },
    { name: 'Lucky V2 Doubles', api: 'BEDWARS_EIGHT_TWO_LUCKY', icon: 'player_head_lucky_block', count: 14 },
    { name: 'One Block', api: 'BEDWARS_EIGHT_ONE_ONEBLOCK', icon: 'bed', count: 7 },
    { name: 'Rush 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_RUSH', icon: 'ender_eye', count: 14 },
    { name: 'Rush Doubles', api: 'BEDWARS_EIGHT_TWO_RUSH', icon: 'ender_eye', count: 14 },
    { name: 'Solo', api: 'BEDWARS_EIGHT_ONE', icon: 'bed', count: 7 },
    { name: 'Swappage 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_SWAP', icon: 'end_portal_frame', count: 14 },
    { name: 'Swappage Doubles', api: 'BEDWARS_EIGHT_TWO_SWAP', icon: 'end_portal_frame', count: 14 },
    { name: 'Ultimate 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_ULTIMATE', icon: 'nether_star', count: 14 },
    { name: 'Ultimate Doubles', api: 'BEDWARS_EIGHT_TWO_ULTIMATE', icon: 'nether_star', count: 14 },
    { name: 'Underworld 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_UNDERWORLD', icon: 'skeleton_skull', count: 14 },
    { name: 'Underworld Doubles', api: 'BEDWARS_EIGHT_TWO_UNDERWORLD', icon: 'skeleton_skull', count: 14 },
    { name: 'Voidless 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_VOIDLESS', icon: 'bedrock', count: 14 },
    { name: 'Voidless Doubles', api: 'BEDWARS_EIGHT_TWO_VOIDLESS', icon: 'bedrock', count: 14 }
  ],
  blitz: [
    { name: 'Solo', api: 'solo_normal', icon: 'diamond_sword', count: 9 },
    { name: 'Teams', api: 'team_normal', icon: 'diamond_sword', count: 9 }
  ],
  buildbattle: [
    { name: 'Guess The Build', api: 'BUILD_BATTLE_GUESS_THE_BUILD', icon: 'crafting_table', count: 3 },
    { name: 'Pro Mode', api: 'BUILD_BATTLE_SOLO_PRO', icon: 'crafting_table', count: 5 },
    { name: 'Solo Mode', api: 'BUILD_BATTLE_SOLO_NORMAL', icon: 'crafting_table', count: 13 },
    { name: 'Speed Builders', api: 'BUILD_BATTLE_SPEED_BUILDERS', icon: 'crafting_table', count: 4 },
    { name: 'Teams Mode', api: 'BUILD_BATTLE_TEAMS_NORMAL', icon: 'crafting_table', count: 23 }
  ],
  classic: [
    { name: 'Arena Brawl', api: 'ARENA', icon: 'blaze_powder', count: 2 },
    { name: 'Paintball Warfare', api: 'PAINTBALL', icon: 'snowball', count: 8 },
    { name: 'Quakecraft', api: 'QUAKECRAFT', icon: 'firework_rocket', count: 4 },
    { name: 'The Walls', api: 'WALLS', icon: 'sand', count: 8 },
    { name: 'Turbo Kart Racers', api: 'GINGERBREAD', icon: 'minecart', count: 4 },
    { name: 'VampireZ', api: 'VAMPIREZ', icon: 'wither_skeleton_skull', count: 10 }
  ],
  copsandcrims: [
    { name: 'Defusal', api: 'normal', icon: 'iron_bars', count: 5 },
    { name: 'Gun Game', api: 'gungame', icon: 'iron_bars', count: 3 },
    { name: 'Team Deathmatch', api: 'deathmatch', icon: 'iron_bars', count: 5 }
  ],
  duels: [
    { name: 'Bed Rush Duel', api: 'BEDWARS_TWO_ONE_DUELS_RUSH', icon: 'red_wool', count: 2 },
    { name: 'Bed Wars Duel', api: 'BEDWARS_TWO_ONE_DUELS', icon: 'bed', count: 2 },
    { name: 'Blitz Duel', api: 'DUELS_BLITZ_DUEL', icon: 'diamond_sword', count: 2 },
    { name: 'Bow Duel', api: 'DUELS_BOW_DUEL', icon: 'bow', count: 2 },
    { name: 'Bow Spleef Duel', api: 'DUELS_BOWSPLEEF_DUEL', icon: 'tnt', count: 2 },
    { name: 'Boxing Duel', api: 'DUELS_BOXING_DUEL', icon: 'fish_cod_raw', count: 2 },
    { name: 'Bridge 3v3', api: 'DUELS_BRIDGE_THREES', icon: 'blue_terracotta', count: 6 },
    { name: 'Bridge Doubles', api: 'DUELS_BRIDGE_DOUBLES', icon: 'blue_terracotta', count: 4 },
    { name: 'Bridge Duel', api: 'DUELS_BRIDGE_DUEL', icon: 'blue_terracotta', count: 2 },
    { name: 'Bridge Teams', api: 'DUELS_BRIDGE_FOUR', icon: 'blue_terracotta', count: 8 },
    { name: 'Classic Doubles', api: 'DUELS_CLASSIC_DOUBLES', icon: 'fishing_rod', count: 4 },
    { name: 'Classic Duel', api: 'DUELS_CLASSIC_DUEL', icon: 'fishing_rod', count: 2 },
    { name: 'Combo Duel', api: 'DUELS_COMBO_DUEL', icon: 'sugar', count: 2 },
    { name: 'Duel Arena', api: 'DUELS_DUEL_ARENA', icon: 'beacon', count: 4 },
    { name: 'Mega Walls Duel', api: 'DUELS_MW_DUEL', icon: 'soul_sand', count: 2 },
    { name: 'NoDebuff Duel', api: 'DUELS_POTION_DUEL', icon: 'brewing_stand', count: 2 },
    { name: 'OP Doubles', api: 'DUELS_OP_DOUBLES', icon: 'diamond_chestplate', count: 4 },
    { name: 'OP Duel', api: 'DUELS_OP_DUEL', icon: 'diamond_chestplate', count: 2 },
    { name: 'Parkour Duels', api: 'DUELS_PARKOUR_EIGHT', icon: 'feather', count: 6 },
    { name: 'Quakecraft Duel', api: 'DUELS_QUAKE_DUEL', icon: 'firework_rocket', count: 2 },
    { name: 'SkyWars Doubles', api: 'DUELS_SW_DOUBLES', icon: 'ender_eye', count: 4 },
    { name: 'SkyWars Duel', api: 'DUELS_SW_DUEL', icon: 'ender_eye', count: 2 },
    { name: 'Spleef Duel', api: 'DUELS_SPLEEF_DUEL', icon: 'iron_shovel', count: 2 },
    { name: 'Sumo Duel', api: 'DUELS_SUMO_DUEL', icon: 'slime_ball', count: 2 },
    { name: 'UHC Deathmatch', api: 'DUELS_UHC_MEETUP', icon: 'golden_apple', count: 8 },
    { name: 'UHC Doubles', api: 'DUELS_UHC_DOUBLES', icon: 'golden_apple', count: 4 },
    { name: 'UHC Duel', api: 'DUELS_UHC_DUEL', icon: 'golden_apple', count: 2 },
    { name: 'UHC Teams', api: 'DUELS_UHC_FOUR', icon: 'golden_apple', count: 8 }
  ],
  megawalls: [
    { name: 'Face Off', api: 'face_off', icon: 'soul_sand', count: 10 },
    { name: 'Standard', api: 'standard', icon: 'soul_sand', count: 20 }
  ],
  murdermystery: [
    { name: 'Assassins', api: 'MURDER_ASSASSINS', icon: 'bow', count: 12 },
    { name: 'Classic', api: 'MURDER_CLASSIC', icon: 'bow', count: 12 },
    { name: 'Double Up', api: 'MURDER_DOUBLE_UP', icon: 'bow', count: 24 },
    { name: 'Infection', api: 'MURDER_INFECTION', icon: 'bow', count: 12 }
  ],
  skywars: [
    { name: 'Doubles Normal', api: 'teams_normal', icon: 'ender_eye', count: 18 },
    { name: 'Mega Doubles', api: 'mega_doubles', icon: 'ender_eye', count: 12 },
    { name: 'Mini', api: 'mini_normal', icon: 'ender_eye', count: 3 },
    { name: 'Solo Insane', api: 'solo_insane', icon: 'ender_eye', count: 9 },
    { name: 'Solo Lucky Block', api: 'solo_insane_lucky', icon: 'player_head_lucky_block', count: 9 },
    { name: 'Solo Normal', api: 'solo_normal', icon: 'ender_eye', count: 9 },
    { name: 'Solo Rush', api: 'solo_insane_rush', icon: 'ender_pearl', count: 2 },
    { name: 'Solo Slime', api: 'solo_insane_slime', icon: 'slime_ball', count: 2 },
    { name: 'Solo TNT Madness', api: 'solo_insane_tnt_madness', icon: 'tnt', count: 2 },
    { name: 'Teams Lucky Block', api: 'teams_insane_lucky', icon: 'player_head_lucky_block', count: 18 },
    { name: 'Teams Rush', api: 'teams_insane_rush', icon: 'ender_pearl', count: 3 },
    { name: 'Teams Slime', api: 'teams_insane_slime', icon: 'slime_ball', count: 3 },
    { name: 'Teams TNT Madness', api: 'teams_insane_tnt_madness', icon: 'tnt', count: 3 }
  ],
  smashheroes: [
    { name: '1v1', api: '1v1_normal', icon: 'player_head_spooderman', count: 2 },
    { name: '2v2', api: '2v2_normal', icon: 'player_head_spooderman', count: 4 },
    { name: 'Friends', api: 'friends_normal', icon: 'player_head_spooderman', count: 4 },
    { name: 'Solo', api: 'solo_normal', icon: 'player_head_spooderman', count: 4 },
    { name: 'Team', api: 'teams_normal', icon: 'player_head_spooderman', count: 6 }
  ],
  speeduhc: [
    { name: 'Solo Normal', api: 'solo_normal', icon: 'golden_carrot', count: 4 },
    { name: 'Team Normal', api: 'team_normal', icon: 'golden_carrot', count: 8 }
  ],
  tnt: [
    { name: 'Bow Spleef', api: 'BOWSPLEEF', icon: 'tnt', count: 4 },
    { name: 'PVP Run', api: 'PVPRUN', icon: 'tnt', count: 4 },
    { name: 'TNT Run', api: 'TNTRUN', icon: 'tnt', count: 4 },
    { name: 'TNT Tag', api: 'TNTAG', icon: 'tnt', count: 9 },
    { name: 'Wizards', api: 'CAPTURE', icon: 'tnt', count: 6 }
  ],
  uhc: [
    { name: 'Solo', api: 'SOLO', icon: 'golden_apple', count: 21 },
    { name: 'Teams of 3', api: 'TEAMS', icon: 'golden_apple', count: 34 }
  ],
  warlords: [
    { name: 'Capture the Flag', api: 'ctf_mini', icon: 'stone_axe', count: 10 },
    { name: 'Domination', api: 'domination', icon: 'stone_axe', count: 18 },
    { name: 'Team Deathmatch', api: 'team_deathmatch', icon: 'stone_axe', count: 9 }
  ],
  wool: [
    { name: 'Capture the Wool', api: 'capture_the_wool_two_twenty', icon: 'white_wool', count: 12 },
    { name: 'Sheep Wars', api: 'sheep_wars_two_six', icon: 'white_wool', count: 10 },
    { name: 'Wool Wars', api: 'wool_wars_two_four', icon: 'white_wool', count: 8 }
  ]
};

export const gamesMap = new Map();

for (const [mode, modeGames] of Object.entries(games))
    gamesMap.set(mode, new Map(modeGames.map(game => [game.name, game])));

export const gamesChoices = new Map();

for (const [mode, modeGames] of Object.entries(games))
    gamesChoices.set(mode, modeGames.map(game => ({ name: game.name, value: game.name })));