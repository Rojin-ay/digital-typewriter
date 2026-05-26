module.exports = async (req, res) => {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || "Notion API error",
        details: data
      });
    }

    const todos = data.results.map((page) => {
      const title =
        page.properties.Name?.title?.[0]?.plain_text ||
        "Untitled";

      const priority =
        page.properties.Priority?.select?.name ||
        "todo";

      return {
        title,
        type: priority
      };
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};