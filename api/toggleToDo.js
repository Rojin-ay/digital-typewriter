module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { id, done } = req.body || {};

    if (!id) {
      return res.status(400).json({ error: "Missing page id" });
    }

    const response = await fetch(`https://api.notion.com/v1/pages/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Typee": "application/json"
      },
      body: JSON.stringify({
        properties: {
          Done: {
            checkbox: Boolean(done)
          }
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || "Notion update failed",
        details: data
      });
    }

    res.status(200).json({ success: true, id, done: Boolean(done) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//hellooo