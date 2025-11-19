// index.js
import express from "express";
const app = express();
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "gameon_bi",
  connectionLimit: 10,
});

import { loadMetricConfig } from "./configLoader.js";

const config = loadMetricConfig();

function buildQuery(block) {
  let columns = block.columns.join(", ");
  return `
    SELECT ${columns}
    FROM ${block.table_name}
    ORDER BY ${block.order_by_column} ${block.order_by}
    LIMIT ${block.record_count};
  `;
}

app.get("/api/cards", async (req, res) => {
  try {
    const results = [];
    const { table_name } = req.query;
    console.log(table_name);

    if (table_name == undefined) {
      //means we need all
      for (const card of config.Cards) {
        const sql = buildQuery(card);
        // const [rows] = await pool.query(sql);
        const [rows] = [
          {
            week_start_date: "2025-11-17",
            week_end_date: "2025-11-24",
            total_amount: 15430.75,
            transactions_count: 182,
          },
          {
            week_start_date: "2025-11-17",
            week_end_date: "2025-11-24",
            total_amount: 15430.75,
            transactions_count: 182,
          },
        ];
        results.push({
          metric_name: card.metric_name,
          sql,
          field_names: card.columns,
          data: rows,
        });
      }
    } else {
      //means we need specific table
      for (const card of config.Cards) {
        if (card.table_name == table_name) {
          const sql = buildQuery(card);
          // const [rows] = await pool.query(sql);
          const [rows] = [
            {
              week_start_date: "2025-11-17",
              week_end_date: "2025-11-24",
              total_amount: 15430.75,
              transactions_count: 182,
            },
          ];
          results.push({
            metric_name: card.metric_name,
            sql,
            field_names: card.columns,
            data: rows,
          });
        }
      }
    }

    res.json({ status: "success", results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/tables", async (req, res) => {
  try {
    const results = [];
    const { table_name } = req.query;
    console.log(table_name);

    if (table_name == undefined) {
      //means we need all
      for (const card of config.Tables) {
        const sql = buildQuery(card);
        // const [rows] = await pool.query(sql);
        const [rows] = [
          {
            first_name: "John",
            wallet_address: "sdfsdfsdf",
            total_balance: 20,
            total_hold: 2,
          },
        ];
        results.push({
          metric_name: card.metric_name,
          sql,
          field_names: card.columns,
          data: rows,
        });
      }
    } else {
      //means we need specific table
      for (const card of config.Tables) {
        if (card.table_name == table_name) {
          const sql = buildQuery(card);
          // const [rows] = await pool.query(sql);
          const [rows] = [
            {
              first_name: "John",
              wallet_address: "sdfsdfsdf",
              total_balance: 20,
              total_hold: 2,
            },
          ];
          results.push({
            metric_name: card.metric_name,
            sql,
            field_names: card.columns,
            data: rows,
          });
        }
      }
    }

    res.json({ status: "success", results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/charts", async (req, res) => {
  try {
    const results = [];
    const { table_name } = req.query;
    console.log(table_name);

    if (table_name == undefined) {
      //means we need all
      for (const card of config.Charts) {
        const sql = buildQuery(card);
        // const [rows] = await pool.query(sql);
        const [rows] = [
          {
            first_name: "John",
            wallet_address: "sdfsdfsdf",
            total_balance: 20,
            total_hold: 2,
          },
        ];
        results.push({
          metric_name: card.metric_name,
          sql,
          field_names: card.columns,
          data: rows,
        });
      }
    } else {
      //means we need specific table
      for (const card of config.Charts) {
        if (card.table_name == table_name) {
          const sql = buildQuery(card);
          // const [rows] = await pool.query(sql);
          const [rows] = [
            {
              first_name: "John",
              wallet_address: "sdfsdfsdf",
              total_balance: 20,
              total_hold: 2,
            },
          ];
          results.push({
            metric_name: card.metric_name,
            sql,
            field_names: card.columns,
            data: rows,
          });
        }
      }
    }

    res.json({ status: "success", results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
