import { Router } from "express";
import axios from "axios";

const router = Router();

// Obtener listado de productos (Max 4)
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

// Obtener detalle un producto por su id
router.get("/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/items/${itemId}`
    );
    const item = {
      id: response.data.id,
      title: response.data.title,
      price: {
        currency: response.data.currency_id,
        amount: Math.floor(response.data.price),
        decimals: Math.round((response.data.price % 1) * 100),
      },
      picture: response.data.thumbnail,
      condition: response.data.condition,
      free_shipping: response.data.shipping.free_shipping,
    };

    res.json(item);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Obtener descripcion de un producto por su id
router.get("/:id/description", async (req, res) => {
  const itemId = req.params.id;

  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/items/${itemId}/description`
    );
    const description = response.data.plain_text;

    res.json({ description });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
