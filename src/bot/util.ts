import { Client, Guild, TextChannel } from "discord.js";

export const getChannel = async (client: Client, channelId?: string) => {
  if (!channelId || channelId === "undefined") return null;

  try {
    const result = client.channels.cache.get(channelId);

    if (result) return result as TextChannel;

    return (await client.channels.fetch(channelId)) as TextChannel;
  } catch (e: any) {
    if (e.message === "Unknown Channel" || e.message === "Missing Access") {
      return null;
    }
    // await logError("tsitsi", e, `bot-interface`, JSON.stringify({ channelId }));
    return null;
  }
};

export const getMember = async (guild: Guild, discordUserId?: string) => {
  if (!discordUserId) return null;

  try {
    const result = guild.members.cache.get(discordUserId);

    if (result) return result;

    return await guild.members.fetch(discordUserId);
  } catch (e: any) {
    if (e.message === "Unknown Member") {
      return null;
    }
    console.error(
      "ERROR",
      e.Message,
      JSON.stringify({ guildId: guild.id, discordUserId })
    );
    return null;
  }
};
