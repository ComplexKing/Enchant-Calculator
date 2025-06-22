import React, { useState, useEffect } from "react";
import enchantmentsData from "./data/enchantments.json";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "./components/ui/select";

const items = [
  "Sword",
  "Pickaxe",
  "Axe",
  "Shovel",
  "Helmet",
  "Chestplate",
  "Leggings",
  "Boots",
  "Bow",
  "Crossbow",
  "Trident",
  "Book",
  "Fishing Rod",
  "Elytra",
  "Mace",
];

const itemTiersList = [
  "Wooden",
  "Stone",
  "Iron",
  "Golden",
  "Diamond",
  "Netherite",
];

const itemTierMap = {
  Wooden: {
    Sword: "wooden_sword",
    Pickaxe: "wooden_pickaxe",
    Axe: "wooden_axe",
    Shovel: "wooden_shovel",
    Hoe: "wooden_hoe",
  },
  Stone: {
    Sword: "stone_sword",
    Pickaxe: "stone_pickaxe",
    Axe: "stone_axe",
    Shovel: "stone_shovel",
    Hoe: "stone_hoe",
    Helmet: "leather_helmet",
    Chestplate: "leather_chestplate",
    Leggings: "leather_leggings",
    Boots: "leather_boots",
  },
  Iron: {
    Sword: "iron_sword",
    Pickaxe: "iron_pickaxe",
    Axe: "iron_axe",
    Shovel: "iron_shovel",
    Hoe: "iron_hoe",
    Helmet: "iron_helmet",
    Chestplate: "iron_chestplate",
    Leggings: "iron_leggings",
    Boots: "iron_boots",
  },
  Golden: {
    Sword: "golden_sword",
    Pickaxe: "golden_pickaxe",
    Axe: "golden_axe",
    Shovel: "golden_shovel",
    Hoe: "golden_hoe",
    Helmet: "golden_helmet",
    Chestplate: "golden_chestplate",
    Leggings: "golden_leggings",
    Boots: "golden_boots",
  },
  Diamond: {
    Sword: "diamond_sword",
    Pickaxe: "diamond_pickaxe",
    Axe: "diamond_axe",
    Shovel: "diamond_shovel",
    Hoe: "diamond_hoe",
    Helmet: "diamond_helmet",
    Chestplate: "diamond_chestplate",
    Leggings: "diamond_leggings",
    Boots: "diamond_boots",
  },
  Netherite: {
    Sword: "netherite_sword",
    Pickaxe: "netherite_pickaxe",
    Axe: "netherite_axe",
    Shovel: "netherite_shovel",
    Hoe: "netherite_hoe",
    Helmet: "netherite_helmet",
    Chestplate: "netherite_chestplate",
    Leggings: "netherite_leggings",
    Boots: "netherite_boots",
  },
};

export default function EnchantApp() {
  const [selectedVersion, setSelectedVersion] = useState("1.21");
  const [selectedItem, setSelectedItem] = useState("Sword");
  const [selectedItemTier, setSelectedItemTier] = useState("Netherite");
  const [selectedEnchants, setSelectedEnchants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [enchantLevels, setEnchantLevels] = useState({});
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    // Also toggle background color on body/html for full page dark mode
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-gray-100");
      document.body.classList.remove("bg-white", "text-black");
    } else {
      document.body.classList.remove("bg-gray-900", "text-gray-100");
      document.body.classList.add("bg-white", "text-black");
    }
  }, [darkMode]);

    useEffect(() => {
    // Clear selected enchantments and levels when item changes
    setSelectedEnchants([]);
    setEnchantLevels({});
  }, [selectedItem]);


  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const getEnchantmentsForItem = () => {
    return enchantmentsData.filter(
      (e) =>
        e.versions.includes(selectedVersion) &&
        (e.items.includes(selectedItem) || selectedItem === "Book") &&
        e.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getBaseItemId = () => {
    if (!selectedItem) return "";
    const tierMap = itemTierMap[selectedItemTier] || {};
    return tierMap[selectedItem] || selectedItem.toLowerCase().replace(/\s+/g, "_");
  };

  const toggleEnchant = (id) => {
    if (selectedEnchants.includes(id)) {
      setSelectedEnchants(selectedEnchants.filter((e) => e !== id));
      setEnchantLevels((levels) => {
        const copy = { ...levels };
        delete copy[id];
        return copy;
      });
    } else {
      setSelectedEnchants([...selectedEnchants, id]);
      setEnchantLevels((levels) => ({ ...levels, [id]: 1 }));
    }
  };

  const onLevelInputClick = (e) => {
    e.stopPropagation();
  };

  const updateEnchantLevel = (id, value) => {
    let lvl = parseInt(value);
    if (isNaN(lvl)) lvl = 1;
    const enchant = enchantmentsData.find((e) => e.id === id);
    if (enchant) {
      lvl = Math.min(Math.max(lvl, 1), enchant.max_level);
    }
    setEnchantLevels((levels) => ({ ...levels, [id]: lvl }));
  };

    const hasConflict = (id) => {
    const enchant = enchantmentsData.find((e) => e.id === id);
    if (!enchant || !enchant.conflicts) return false;
    return selectedEnchants.some(
      (selectedId) =>
        selectedId !== id && enchant.conflicts.includes(selectedId)
    );
  };

  const hasAnySelectedConflict = () => {
    for (let i = 0; i < selectedEnchants.length; i++) {
      for (let j = i + 1; j < selectedEnchants.length; j++) {
        const e1 = enchantmentsData.find((e) => e.id === selectedEnchants[i]);
        const e2 = enchantmentsData.find((e) => e.id === selectedEnchants[j]);
        if (
          e1 &&
          e2 &&
          (e1.conflicts?.includes(e2.id) || e2.conflicts?.includes(e1.id))
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Survival restriction stays the same but using "conflicts"
  const hasSurvivalRestriction = () => {
    const filteredEnchants = selectedEnchants.filter((id) => id !== "minecraft:mending");
    for (let i = 0; i < filteredEnchants.length; i++) {
      for (let j = i + 1; j < filteredEnchants.length; j++) {
        const e1 = enchantmentsData.find((e) => e.id === filteredEnchants[i]);
        const e2 = enchantmentsData.find((e) => e.id === filteredEnchants[j]);
        if (
          e1 &&
          e2 &&
          (e1.conflicts?.includes(e2.id) || e2.conflicts?.includes(e1.id))
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const generateGiveCommand = () => {
    if (!selectedItem || selectedEnchants.length === 0) return "";
    const baseItemId = getBaseItemId();

    if (selectedVersion === "1.12") {
      const legacyEnchantIdMap = enchantmentsData.reduce((acc, e, idx) => {
        acc[e.id] = idx;
        return acc;
      }, {});

      const enchArray = selectedEnchants
        .map((id) => {
          const legacyId = legacyEnchantIdMap[id];
          if (legacyId === undefined) return null;
          const lvl = enchantLevels[id] || 1;
          return `{id:${legacyId},lvl:${lvl}}`;
        })
        .filter(Boolean)
        .join(",");
      return `/give @p minecraft:${baseItemId} {ench:[${enchArray}]}`;
    }

    if (["1.13", "1.16", "1.20"].includes(selectedVersion)) {
      const enchArray = selectedEnchants
        .map((id) => `{id:\"${id}\",lvl:${enchantLevels[id] || 1}}`)
        .join(",");
      return `/give @p minecraft:${baseItemId} {Enchantments:[${enchArray}]}`;
    }

    if (selectedVersion === "1.21") {
      const levelsObj = selectedEnchants
        .map((id) => `\"${id}\":${enchantLevels[id] || 1}`)
        .join(",");
      return `/give @s minecraft:${baseItemId}[enchantments={levels:{${levelsObj}}}] 1`;
    }

    return `/give @p minecraft:${baseItemId}`;
  };

  const generateCommandBlock = () => {
    const giveCmd = generateGiveCommand();
    if (!giveCmd) return "";
    return `/setblock ~ ~1 ~ minecraft:command_block{Command:"${giveCmd.replace(/"/g, '\\\"')}",auto:0b}`;
  };

  return (
    <div className={`${darkMode ? "dark" : ""} p-6 max-w-4xl mx-auto space-y-6 relative`}>
      <Button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 rounded px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </Button>

      <h1 className="text-4xl font-bold mb-6 text-center">Minecraft Enchantment Calculator</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="version" className="block font-semibold mb-1">
            Minecraft Version
          </label>
          <Select
            id="version"
            onValueChange={setSelectedVersion}
            defaultValue={selectedVersion}
          >
            <SelectTrigger className="bg-white dark:bg-gray-700">
              <SelectValue placeholder="Select Version" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700">
              {["1.12", "1.13", "1.16", "1.20", "1.21"].map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="item" className="block font-semibold mb-1">
            Item
          </label>
          <Select
            id="item"
            onValueChange={setSelectedItem}
            defaultValue={selectedItem}
          >
            <SelectTrigger className="bg-white dark:bg-gray-700">
              <SelectValue placeholder="Select Item" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700">
              {items.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="tier" className="block font-semibold mb-1">
            Item Tier
          </label>
          <Select
            id="tier"
            onValueChange={setSelectedItemTier}
            defaultValue={selectedItemTier}
          >
            <SelectTrigger className="bg-white dark:bg-gray-700">
              <SelectValue placeholder="Select Tier" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700">
              {itemTiersList.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Input
        type="text"
        placeholder="Search enchantments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {getEnchantmentsForItem().map((e) => {
          const isSelected = selectedEnchants.includes(e.id);
          const isConflicting = !isSelected && hasConflict(e.id);
          const level = enchantLevels[e.id] || 1;

          return (
            <Card
              key={e.id}
              className={`cursor-pointer border ${
                isSelected ? "border-blue-500" : ""
              } ${isConflicting ? "border-red-500 border-2" : ""}`}
              onClick={() => toggleEnchant(e.id)}
            >
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{e.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Max Level: {e.max_level} | {e.treasure ? "Treasure" : "Standard"}
                </p>
                {isConflicting && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Conflicts with selected enchantment
                  </p>
                )}
                {isSelected && (
                  <div className="mt-2">
                    <label
                      htmlFor={`level-${e.id}`}
                      className="block text-sm font-medium mb-1"
                    >
                      Level:
                    </label>
                    <input
                      id={`level-${e.id}`}
                      type="number"
                      min={1}
                      max={e.max_level}
                      value={level}
                      onChange={(evt) => updateEnchantLevel(e.id, evt.target.value)}
                      onClick={onLevelInputClick} // Prevent toggle on input click
                      className="w-full border rounded p-1 text-center
                        bg-white text-gray-900 border-gray-300
                        dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Warnings */}
      {hasAnySelectedConflict() && (
        <div
          className={`mt-6 p-4 rounded border-2 border-red-500 bg-red-100 text-red-900 font-semibold select-none ${
            darkMode ? "bg-red-900 bg-opacity-30 text-red-400 border-red-400" : ""
          }`}
        >
          ⚠️ Conflicting enchantments selected! This combination is not possible without commands.
        </div>
      )}


      {/* Commands */}
      <div className="mt-6 space-y-4">
        <label className="block font-semibold mb-1">Give Command</label>
        <textarea
          readOnly
          value={generateGiveCommand()}
          className="w-full p-2 border rounded bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 resize-none"
          rows={3}
        />
      </div>
    </div>
  );
}
