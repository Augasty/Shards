
export function extractHeader(Shard) {

    const html = Shard.content
    const regex = /<([^>\s]+)[^>]*>.*?<\/\1>|<[^>]+>/;
    const match = html.match(regex);
    const firstTagText = match ? match[0].replace(/<\/?[^>]+(>|$)/g, "") : "";

    // Get the first 20 characters from the HTML string
    const first20Letters = html.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 20) ;

    // Choose the smaller of the two
    const result = first20Letters.length <= firstTagText.length ? first20Letters : firstTagText;

    
    return result
  }