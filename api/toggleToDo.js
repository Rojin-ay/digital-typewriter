module.exports = async (req, res) => {
  try {
    const { id, done } = req.body;

    const response = await fetch(
      `https://api.notion.com/v1/pages/${id}`,
      {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          properties: {
            Done: {
              checkbox: done
            }
          }
        })
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};