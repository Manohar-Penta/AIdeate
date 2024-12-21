async function handler(req: Request) {
  try {
    const { page, query } = await req.json();
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&orientation=landscape`
    );
    const data = await response.json();
    return new Response(JSON.stringify(data));
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: e }));
  }
}

export { handler as POST };
