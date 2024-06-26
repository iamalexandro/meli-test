import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
    );
    const results = response.data.results.slice(0, 4);
    const items = results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: Math.round((item.price % 1) * 100),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));

    const categories =
      response.data.filters
        .find((filter) => filter.id === "category")
        ?.values[0]?.path_from_root.map((cat) => cat.name) || [];

    res.json({
      author: {
        name: "Nicola",
        lastname: "Di Candia",
      },
      categories: categories,
      items: items,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
