export const modes = [
  { mode: `arcade`, name: `Arcade Games`, api: `ARCADE` },
  { mode: `bedwars`, name: `Bed Wars`, api: `BEDWARS` },
  { mode: `blitz`, name: `Blitz SG`, api: `SURVIVAL_GAMES` },
  { mode: `buildbattle`, name: `Build Battle`, api: `BUILD_BATTLE` },
  { mode: `classic`, name: `Classic Games`, api: `LEGACY` },
  { mode: `copsandcrims`, name: `Cops and Crims`, api: `MCGO` },
  { mode: `duels`, name: `Duels`, api: `DUELS` },
  { mode: `megawalls`, name: `Mega Walls`, api: `WALLS3` },
  { mode: `murdermystery`, name: `Murder Mystery`, api: `MURDER_MYSTERY` },
  { mode: `skywars`, name: `SkyWars`, api: `SKYWARS` },
  { mode: `smashheroes`, name: `Smash Heroes`, api: `SUPER_SMASH` },
  { mode: `speeduhc`, name: `Speed UHC`, api: `SPEED_UHC` },
  { mode: `tnt`, name: `The TNT Games`, api: `TNTGAMES` },
  { mode: `uhc`, name: `UHC Champions`, api: `UHC` },
  { mode: `warlords`, name: `Warlords`, api: `BATTLEGROUND` },
  { mode: `wool`, name: `Wool Games`, api: `WOOL_GAMES` }
];

export const modesMap = new Map(modes.map(mode => [mode.mode, mode]));

export const games = {
  arcade: [
    { name: 'Blocking Dead', api: 'DAYONE', count: 9 },
    { name: 'Bounty Hunters', api: 'ONEINTHEQUIVER', count: 6 },
    { name: 'Creeper Attack', api: 'DEFENDER', count: 5 },
    { name: 'Disasters', api: 'DISASTERS', count: 12 },
    { name: 'Dragon Wars', api: 'DRAGONWARS2', count: 5 },
    { name: 'Dropper', api: 'DROPPER', count: 10 },
    { name: 'Ender Spleef', api: 'ENDER', count: 5 },
    { name: 'Farm Hunt', api: 'FARM_HUNT', count: 11 },
    { name: 'Football', api: 'SOCCER', count: 5 },
    { name: 'Galaxy Wars', api: 'STARWARS', count: 6 },
    { name: 'Hide and Seek: Party Pooper', api: 'HIDE_AND_SEEK_PARTY_POOPER', count: 6 },
    { name: 'Hide and Seek: Prop Hunt', api: 'HIDE_AND_SEEK_PROP_HUNT', count: 6 },
    { name: 'Hole In The Wall', api: 'HOLE_IN_THE_WALL', count: 5 },
    { name: 'Hypixel Says', api: 'SIMON_SAYS', count: 5 },
    { name: 'Mini Walls', api: 'MINI_WALLS', count: 8 },
    { name: 'Party Games', api: 'PARTY', count: 3 },
    { name: 'Pixel Painters', api: 'DRAW_THEIR_THING', count: 5 },
    { name: 'Pixel Party', api: 'PIXEL_PARTY', count: 10 },
    { name: 'Throw Out', api: 'THROW_OUT', count: 5 },
    { name: 'Zombies: Alien Arcadium', api: 'ZOMBIES_ALIEN_ARCADIUM', count: 4 },
    { name: 'Zombies: Bad Blood', api: 'ZOMBIES_BAD_BLOOD', count: 4 },
    { name: 'Zombies: Dead End', api: 'ZOMBIES_DEAD_END', count: 4 },
    { name: 'Zombies: Prison', api: 'ZOMBIES_PRISON', count: 4 }
  ],
  bedwars: [
    { name: '3v3v3v3', api: 'BEDWARS_FOUR_THREE', count: 11 },
    { name: '40v40 Castle V2', api: 'BEDWARS_CASTLE', count: 40 },
    { name: '4v4', api: 'BEDWARS_TWO_FOUR', count: 7 },
    { name: '4v4v4v4', api: 'BEDWARS_FOUR_FOUR', count: 14 },
    { name: 'Armed 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_ARMED', count: 14 },
    { name: 'Armed Doubles', api: 'BEDWARS_EIGHT_TWO_ARMED', count: 14 },
    { name: 'Doubles', api: 'BEDWARS_EIGHT_TWO', count: 14 },
    { name: 'Lucky V2 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_LUCKY', count: 14 },
    { name: 'Lucky V2 Doubles', api: 'BEDWARS_EIGHT_TWO_LUCKY', count: 14 },
    { name: 'One Block', api: 'BEDWARS_EIGHT_ONE_ONEBLOCK', count: 7 },
    { name: 'Rush 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_RUSH', count: 14 },
    { name: 'Rush Doubles', api: 'BEDWARS_EIGHT_TWO_RUSH', count: 14 },
    { name: 'Solo', api: 'BEDWARS_EIGHT_ONE', count: 7 },
    { name: 'Swappage 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_SWAP', count: 14 },
    { name: 'Swappage Doubles', api: 'BEDWARS_EIGHT_TWO_SWAP', count: 14 },
    { name: 'Ultimate 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_ULTIMATE', count: 14 },
    { name: 'Ultimate Doubles', api: 'BEDWARS_EIGHT_TWO_ULTIMATE', count: 14 },
    { name: 'Underworld 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_UNDERWORLD', count: 14 },
    { name: 'Underworld Doubles', api: 'BEDWARS_EIGHT_TWO_UNDERWORLD', count: 14 },
    { name: 'Voidless 4v4v4v4', api: 'BEDWARS_FOUR_FOUR_VOIDLESS', count: 14 },
    { name: 'Voidless Doubles', api: 'BEDWARS_EIGHT_TWO_VOIDLESS', count: 14 }
  ],
  blitz: [
    { name: 'Solo', api: 'solo_normal', count: 9 },
    { name: 'Teams', api: 'team_normal', count: 9 }
  ],
  buildbattle: [
    { name: 'Guess The Build', api: 'BUILD_BATTLE_GUESS_THE_BUILD', count: 3 },
    { name: 'Pro Mode', api: 'BUILD_BATTLE_SOLO_PRO', count: 5 },
    { name: 'Solo Mode', api: 'BUILD_BATTLE_SOLO_NORMAL', count: 13 },
    { name: 'Speed Builders', api: 'BUILD_BATTLE_SPEED_BUILDERS', count: 4 },
    { name: 'Teams Mode', api: 'BUILD_BATTLE_TEAMS_NORMAL', count: 23 }
  ],
  classic: [
    { name: 'Arena Brawl', api: 'ARENA', count: 2 },
    { name: 'Paintball Warfare', api: 'PAINTBALL', count: 8 },
    { name: 'Quakecraft', api: 'QUAKECRAFT', count: 4 },
    { name: 'The Walls', api: 'WALLS', count: 8 },
    { name: 'Turbo Kart Racers', api: 'GINGERBREAD', count: 4 },
    { name: 'VampireZ', api: 'VAMPIREZ', count: 10 }
  ],
  copsandcrims: [
    { name: 'Defusal', api: 'normal', count: 5 },
    { name: 'Gun Game', api: 'gungame', count: 3 },
    { name: 'Team Deathmatch', api: 'deathmatch', count: 5 }
  ],
  duels: [
    { name: 'Bed Rush Duel', api: 'BEDWARS_TWO_ONE_DUELS_RUSH', count: 2 },
    { name: 'Bed Wars Duel', api: 'BEDWARS_TWO_ONE_DUELS', count: 2 },
    { name: 'Blitz Duel', api: 'DUELS_BLITZ_DUEL', count: 2 },
    { name: 'Bow Duel', api: 'DUELS_BOW_DUEL', count: 2 },
    { name: 'Bow Spleef Duel', api: 'DUELS_BOWSPLEEF_DUEL', count: 2 },
    { name: 'Boxing Duel', api: 'DUELS_BOXING_DUEL', count: 2 },
    { name: 'Bridge 3v3', api: 'DUELS_BRIDGE_THREES', count: 6 },
    { name: 'Bridge Doubles', api: 'DUELS_BRIDGE_DOUBLES', count: 4 },
    { name: 'Bridge Duel', api: 'DUELS_BRIDGE_DUEL', count: 2 },
    { name: 'Bridge Teams', api: 'DUELS_BRIDGE_FOUR', count: 8 },
    { name: 'Classic Doubles', api: 'DUELS_CLASSIC_DOUBLES', count: 4 },
    { name: 'Classic Duel', api: 'DUELS_CLASSIC_DUEL', count: 2 },
    { name: 'Combo Duel', api: 'DUELS_COMBO_DUEL', count: 2 },
    { name: 'Duel Arena', api: 'DUELS_DUEL_ARENA', count: 4 },
    { name: 'Mega Walls Duel', api: 'DUELS_MW_DUEL', count: 2 },
    { name: 'NoDebuff Duel', api: 'DUELS_POTION_DUEL', count: 2 },
    { name: 'OP Doubles', api: 'DUELS_OP_DOUBLES', count: 4 },
    { name: 'OP Duel', api: 'DUELS_OP_DUEL', count: 2 },
    { name: 'Parkour Duels', api: 'DUELS_PARKOUR_EIGHT', count: 6 },
    { name: 'Quakecraft Duel', api: 'DUELS_QUAKE_DUEL', count: 2 },
    { name: 'SkyWars Doubles', api: 'DUELS_SW_DOUBLES', count: 4 },
    { name: 'SkyWars Duel', api: 'DUELS_SW_DUEL', count: 2 },
    { name: 'Spleef Duel', api: 'DUELS_SPLEEF_DUEL', count: 2 },
    { name: 'Sumo Duel', api: 'DUELS_SUMO_DUEL', count: 2 },
    { name: 'UHC Deathmatch', api: 'DUELS_UHC_MEETUP', count: 8 },
    { name: 'UHC Doubles', api: 'DUELS_UHC_DOUBLES', count: 4 },
    { name: 'UHC Duel', api: 'DUELS_UHC_DUEL', count: 2 },
    { name: 'UHC Teams', api: 'DUELS_UHC_FOUR', count: 8 }
  ],
  megawalls: [
    { name: 'Face Off', api: 'face_off', count: 10 },
    { name: 'Standard', api: 'standard', count: 20 }
  ],
  murdermystery: [
    { name: 'Assassins', api: 'MURDER_ASSASSINS', count: 12 },
    { name: 'Classic', api: 'MURDER_CLASSIC', count: 12 },
    { name: 'Double Up', api: 'MURDER_DOUBLE_UP', count: 24 },
    { name: 'Infection', api: 'MURDER_INFECTION', count: 12 }
  ],
  skywars: [
    { name: 'Doubles Normal', api: 'teams_normal', count: 18 },
    { name: 'Mega Doubles', api: 'mega_doubles', count: 12 },
    { name: 'Mini', api: 'mini_normal', count: 3 },
    { name: 'Solo Insane', api: 'solo_insane', count: 9 },
    { name: 'Solo Lucky Block', api: 'solo_insane_lucky', count: 9 },
    { name: 'Solo Normal', api: 'solo_normal', count: 9 },
    { name: 'Solo Rush', api: 'solo_insane_rush', count: 2 },
    { name: 'Solo Slime', api: 'solo_insane_slime', count: 2 },
    { name: 'Solo TNT Madness', api: 'solo_insane_tnt_madness', count: 2 },
    { name: 'Teams Lucky Block', api: 'teams_insane_lucky', count: 18 },
    { name: 'Teams Rush', api: 'teams_insane_rush', count: 3 },
    { name: 'Teams Slime', api: 'teams_insane_slime', count: 3 },
    { name: 'Teams TNT Madness', api: 'teams_insane_tnt_madness', count: 3 }
  ],
  smashheroes: [
    { name: '1v1', api: '1v1_normal', count: 2 },
    { name: '2v2', api: '2v2_normal', count: 4 },
    { name: 'Friends', api: 'friends_normal', count: 4 },
    { name: 'Solo', api: 'solo_normal', count: 4 },
    { name: 'Team', api: 'teams_normal', count: 6 }
  ],
  speeduhc: [
    { name: 'Solo Normal', api: 'solo_normal', count: 4 },
    { name: 'Team Normal', api: 'team_normal', count: 8 }
  ],
  tnt: [
    { name: 'Bow Spleef', api: 'BOWSPLEEF', count: 4 },
    { name: 'PVP Run', api: 'PVPRUN', count: 4 },
    { name: 'TNT Run', api: 'TNTRUN', count: 4 },
    { name: 'TNT Tag', api: 'TNTAG', count: 9 },
    { name: 'Wizards', api: 'CAPTURE', count: 6 }
  ],
  uhc: [
    { name: 'Solo', api: 'SOLO', count: 21 },
    { name: 'Teams of 3', api: 'TEAMS', count: 34 }
  ],
  warlords: [
    { name: 'Capture the Flag', api: 'ctf_mini', count: 10 },
    { name: 'Domination', api: 'domination', count: 18 },
    { name: 'Team Deathmatch', api: 'team_deathmatch', count: 9 }
  ],
  wool: [
    { name: 'Capture the Wool', api: 'capture_the_wool_two_twenty', count: 12 },
    { name: 'Sheep Wars', api: 'sheep_wars_two_six', count: 10 },
    { name: 'Wool Wars', api: 'wool_wars_two_four', count: 8 }
  ]
};

export const gamesMap = new Map();

for (const [mode, modeGames] of Object.entries(games))
    gamesMap.set(mode, new Map(modeGames.map(game => [game.name, game])));