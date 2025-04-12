import { elizaLogger, HandlerCallback, Memory, State } from "@elizaos/core";

export async function retrieveTripData( message: Memory, state : State, callback : HandlerCallback, storageClient){
  const ipfsLink = message.content.text.match(/https:\/\/[^ ]+\.ipfs\.w3s\.link\/?/i);
  if (!ipfsLink) {
    await callback?.({ text: "Hmm, I couldn't find a valid CID link in your message. Could you try again?" });
    return;
  }

  const link = ipfsLink?.[0];
  const cid = link.match(/^https:\/\/([^.]+)\.ipfs\.w3s\.link/)[1];
  const username = 'nk1175'; //state?.actorsData?.[0]?.username 
  const gatewayUrl = storageClient?.config?.GATEWAY_URL || "https://w3s.link";

  try {
    const response = await fetch(`${gatewayUrl}/ipfs/${cid}/${username}-TripData.json `);
    if (!response.ok) {
      await callback?.({ text: `Couldn’t fetch your trip data from CID. Status: ${response.statusText}` });
      return;
    }
    
    const data = await response.text();
    // const tripMessages = data.split(/\\n|\n/).filter(line => line.trim() !== '');
    // const latestSummary = tripMessages.slice(-55).join("\n- ");
    const cleaned = data
      .replace(/^"|"$/g, '') // strip outer quotes
      .replace(/\\n/g, '\n') // convert literal \n to real linebreaks
      .replace(/\\"/g, '"'); // unescape quotes

    const lines = cleaned.split('\n');
    const highlights = lines.filter(line =>
      /origin|destination|budget|dates|itinerary|hotel|flight|plan|summary/i.test(line)
    );

    const formatted = highlights.length > 0
      ? highlights.map(line => `- ${line.trim()}`).join('\n')
      : "Sorry, I couldn't find any travel summary details in that file.";

    await callback?.({
      text: `🧳 **Here’s a quick trip summary for @${username}:**\n\nLatest highlights:\n\n- ${formatted}`
    });

  } catch (error) {
    await callback?.({ text: "Error retrieving trip data." });
    elizaLogger.error("retrieveTripData error:", error);
  }
}