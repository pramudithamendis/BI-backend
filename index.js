// index.js
import express from "express";
const app = express();
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "52.221.131.12",
  port: 3306,
  user: "pramuditha",
  password: "Pramuditha@20",
  database: "gaming_app_bi",
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

        const [rows] = await pool.query(sql);

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

          const [rows] = await pool.query(sql);

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
        const rows = [
          {
            first_name: "John",
            wallet_address: "sdfsdfsdf",
            total_balance: 20,
            total_hold: 2,
          },
          {
            first_name: "Sara",
            wallet_address: "0xA1B2C3D4E5F6",
            total_balance: 150,
            total_hold: 20,
          },
          {
            first_name: "Michael",
            wallet_address: "0x9F8E7D6C5B4A",
            total_balance: 75,
            total_hold: 5,
          },
          {
            first_name: "Emily",
            wallet_address: "0x123456789ABC",
            total_balance: 200,
            total_hold: 10,
          },
          {
            first_name: "David",
            wallet_address: "0xFFEEDDCCBBAA",
            total_balance: 40,
            total_hold: 3,
          },
          {
            first_name: "Sophia",
            wallet_address: "0x998877665544",
            total_balance: 320,
            total_hold: 50,
          },
          {
            first_name: "Liam",
            wallet_address: "0xABCDEF112233",
            total_balance: 90,
            total_hold: 12,
          },
          {
            first_name: "Olivia",
            wallet_address: "0x5566778899AA",
            total_balance: 55,
            total_hold: 8,
          },
          {
            first_name: "Noah",
            wallet_address: "0xCAFEBABE2211",
            total_balance: 500,
            total_hold: 100,
          },
          {
            first_name: "Ava",
            wallet_address: "0xFACE1234BEEF",
            total_balance: 27,
            total_hold: 1,
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
