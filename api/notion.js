const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

module.exports = async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const todos = response.results.map((page) => ({
      title: page.properties.Name.title[0]?.plain_text || "Untitled",
      type: page.properties.Priority.select?.name || "todo",
    }));

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
}
//no
};