var db = require('mysql2-db');
var fs = require('fs');

function truncateQuoteData(dbcfg, callback) {
    var stage = db.stage(dbcfg);
    var sql = 'truncate table quote';
    stage.execute(sql);
    stage.finale(callback, true);
}

function storeQuoteData(dbcfg, quotes, callback) {
    var stage = db.stage(dbcfg);
    var sql = '';
    var count = 0;
    var base = `insert into quote(exchange_id, asset_id_base, asset_id_quote, 
        ask_price, ask_size, bid_price, bid_size) values `;
    var sql = base;
    quotes.forEach((q) => {
        if (q.symbol_id.search('_SPOT_') == -1) return;       
        if (count > 0) {
            sql += ','
        }
        count++;
        var symbol_parts = q.symbol_id.split('_SPOT_');
        var exchange_id = symbol_parts[0];
        var asset_parts = symbol_parts[1].split('_');
        var asset_id_base = asset_parts[0];
        var asset_id_quote = asset_parts[1];       
        sql = sql + `('${exchange_id}', '${asset_id_base}', '${asset_id_quote}', 
            ${q.ask_price}, ${q.ask_size}, ${q.bid_price}, ${q.bid_size})`;
        if (count == 500) {
            stage.execute(sql + ';');
            sql = base;
            count = 0;
        }
    });
    if (count > 0) {
        stage.execute(sql + ';');
    }
    stage.finale(callback, true);
}

function loadQuoteData(dbcfg, callback) {
    db.stage(dbcfg).query("CALL FindArbitrageInQuote").finale(callback);
}

module.exports = {
    truncateQuoteData: truncateQuoteData,
    storeQuoteData: storeQuoteData,
    loadQuoteData: loadQuoteData
};