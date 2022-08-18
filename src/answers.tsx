export const answers: Record<string, string> = {
  Basic_Vicious_win: "Basic Vicious wins because your opponent chose no option or your opponent is shielding. ",
  Basic_Vicious_lose: "Basic Vicious (your characters innate strong move) loses to ANY other attack option. ",
  Basic_Vicious_tie:
    "Basic Vicious (your characters innate strong move) tie on use at the same time as an opposing player will clash (no damage is delt to either player) . ",
  Special_Vicious_win:
    "Special Vicious (attacks gained from magazines found as loot) will sometimes have a VICIOUS perk attached. These are known as Special Vicious attacks. Special Vicious only wins over the Basic Vicious (innate to player) attack. ",
  Special_Vicious_lose:
    "Special Vicious (attacks gained from magazines found as loot) will lose to every attack in game besides a Basic Vicious (innate to player) attack.",
  Special_Vicious_tie:
    "Special Vicious (your characters learned move found as loot with Vicious perk) tie on use at the same time as an opposing player will clash (no damage is delt to either player) .",
  Basic_Strike_win:
    "Basic Strikes (jabs attacks innate to player) will win to any attack that is learned and has a Visicous Perk or is just a players innate Vicious attack. ",
  Basic_Strike_lose:
    "Basic Strikes (jabs attacks innate to player) will lose to any attack found as loot with a High-Priority Perk, any character attacking with a weapon, any learned move WITHOUT a Vicious perk, and any character using a super move. ",
  Basic_Strike_tie:
    "Basic Strikes (your characters innate jab attack) tie on use at the same time as an opposing player will clash (no damage is delt to either player) . ",
  Special_Strike_win:
    "Special Strikes (strikes learned from looting that don't have a Vicious perk attached) will win against all basic strikes (jab innate to player), all learned strikes with a Vicious perk, and all players innate Vicious attack. ",
  Special_Strike_lose:
    "Special Strikes (strikes learned from looting without a Vicious perk attached) will lose against all attacks with weapons, all strikes learned with a High-Priority perk, and a players super. ",
  Special_Strike_tie:
    "Special Strikes (your characters learned from looting attacks with no Vicious perk) tie on use at the same time as an opposing player will clash (no damage is delt to either player) . ",
  Power_win:
    "Power moves (strikes learned from looting with a High-Priority perk) will win to opposing player using any move besides a super. ",
  Power_lose:
    "Power moves (strikes learned from looting with a High-Priority perk) will only lose to an opposing player using a super. ",
  Power_tie:
    "Power moves  (your characters leanred from looting attacks with a High-Priority perk) tie on use at the same time as an opposing player will clash (no damage is delt to either player). ",
  Super_win:
    "Super moves (attack gained from charging meter with either lootable stars or attacking players) will win to opposing player using any move.",
  Super_lose:
    "Super moves (attack gained from charging meter with either lootable stars or attacking players) will never lose to a player using any move. ",
  Super_tie:
    "Super moves (attack gained from charging meter with either lootable stars or attacking players) tie on use at the same time as an opposing player will clash (no damage is delt to either player) . ",
};

export const rankItems: Record<string, number> = {
  Super: 7,
  Power: 6,
  Weapon: 5,
  Special_Strike: 4,
  Basic_Strike: 3,
  Special_Vicious: 2,
  Basic_Vicious: 1,
};
