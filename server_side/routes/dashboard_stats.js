const pool = require("../dbconn");

module.exports = async (req, res) => {
  console.log("dashboard stats");
  try {
    const sql_cst_count = `select * from customers`;
    pool.query(sql_cst_count, (err, results) => {
      if (err) {
        throw err;
      }
      const total_cst = results.length;

      const sql_card_count = `select * from cards INNER JOIN customers on cards.cst_unique_id=customers.customer_num`;
      pool.query(sql_card_count, (err, data) => {
        if (err) {
          throw err;
        }
        const tot_cards = data.length;

        const sql_active_card_count = `select * from cards INNER JOIN customers on cards.cst_unique_id=customers.customer_num where cards.card_status='active'`;
        pool.query(sql_active_card_count, (err, data) => {
          if (err) {
            throw err;
          }
          const tot_active_card_count = data.length;

          const sql_inactive_card_count = `select * from cards INNER JOIN customers on cards.cst_unique_id=customers.customer_num where cards.card_status='inactive'`;
          pool.query(sql_inactive_card_count, (err, data) => {
            if (err) {
              throw err;
            }
            const tot_inactive_card_count = data.length;

            const sql_incomplete_card_count = `select * from cards INNER JOIN customers on cards.cst_unique_id=customers.customer_num where cards.card_status='incomplete'`;
            pool.query(sql_incomplete_card_count, (err, data) => {
              if (err) {
                throw err;
              }
              const tot_incomplete_card_count = data.length;

              const sql_unassigned_card_count = `select * from cards where cards.card_status='unassigned'`;
              pool.query(sql_unassigned_card_count, (err, data) => {
                if (err) {
                  throw err;
                }
                const tot_unassigned_card_count = data.length;

                const sql_cards_data = `select * from cards INNER JOIN customers on cards.cst_unique_id=customers.customer_num`;
                pool.query(sql_cards_data, (err, data) => {
                  if (err) {
                    throw err;
                  }
                  const cards_data = data.rows;

                  res.status(200).json({
                    total_cst: total_cst,
                    total_cards: tot_cards,
                    active_cards: tot_active_card_count,
                    inactive_cards: tot_inactive_card_count,
                    incomplete_cards: tot_incomplete_card_count,
                    unassigned_cards: tot_unassigned_card_count,
                    cards_data: cards_data,
                  });
                });
              });
            });
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
