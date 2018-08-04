var db = require('mysql2-db');
var fs = require('fs');

function storeQuoteData(dbcfg, quotes, callback) {
    var stage = db.stage(dbcfg);
    var sql = 'truncate table quote';
    //var content = sql;
    stage.execute(sql);
    quotes.forEach((q) => {
        if (q.symbol_id.search('_SPOT_') == -1) return;
        var symbol_parts = q.symbol_id.split('_SPOT_');
        var exchange_id = symbol_parts[0];
        var asset_parts = symbol_parts[1].split('_');
        var asset_id_base = asset_parts[0];
        var asset_id_quote = asset_parts[1];
        sql = `insert into quote(exchange_id, asset_id_base, asset_id_quote, 
            ask_price, ask_size, bid_price, bid_size) values 
            ('${exchange_id}', '${asset_id_base}', '${asset_id_quote}', 
            ${q.ask_price}, ${q.ask_size}, ${q.bid_price}, ${q.bid_size})`;
        stage.execute(sql);
        //content = content + ';\n' + sql;
    });
    //fs.writeFile('SQL.txt', content, (e) => {});
    stage.finale(callback, true);
}

function loadQuoteData(dbcfg, callback) {
    db.stage(dbcfg).query("select * from quote").finale(callback);
}

module.exports = {
    storeQuoteData: storeQuoteData,
    loadQuoteData: loadQuoteData
};