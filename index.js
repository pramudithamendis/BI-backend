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
        const rows = [
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

          // ---- Added 8 more ----
          {
            week_start_date: "2025-11-24",
            week_end_date: "2025-12-01",
            total_amount: 16780.4,
            transactions_count: 195,
          },
          {
            week_start_date: "2025-12-01",
            week_end_date: "2025-12-08",
            total_amount: 14250.1,
            transactions_count: 162,
          },
          {
            week_start_date: "2025-12-08",
            week_end_date: "2025-12-15",
            total_amount: 18930.55,
            transactions_count: 214,
          },
          {
            week_start_date: "2025-12-15",
            week_end_date: "2025-12-22",
            total_amount: 17560.2,
            transactions_count: 201,
          },
          {
            week_start_date: "2025-12-22",
            week_end_date: "2025-12-29",
            total_amount: 16040.0,
            transactions_count: 187,
          },
          {
            week_start_date: "2025-12-29",
            week_end_date: "2026-01-05",
            total_amount: 19320.85,
            transactions_count: 223,
          },
          {
            week_start_date: "2026-01-05",
            week_end_date: "2026-01-12",
            total_amount: 17810.6,
            transactions_count: 198,
          },
          {
            week_start_date: "2026-01-12",
            week_end_date: "2026-01-19",
            total_amount: 20450.72,
            transactions_count: 241,
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
