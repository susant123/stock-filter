const path = require("path");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  path.join(__dirname, "..", "db", "tradeData.db"),
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the tradeData database.");
  }
);

db.serialize(function () {
  console.log("dir name", __dirname);
  db.each("SELECT * FROM stock_master", function (err, row) {
    console.log(row.id + ": " + row.name);
  });

  /* db.run(`INSERT INTO stock_master(name) VALUES(?)`, ["ITC"], function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  }); */

  //const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];
  /*const stock_details = [
    { symbol: "AARTIDRUGS", mcScid: "AD", mcScdid: "AD" },
    { symbol: "ABBOTINDIA", mcScid: "KP", mcScdid: "AI51" },
    { symbol: "ABCAPITAL", mcScid: "ABC07", mcScdid: "ABC9" },
    { symbol: "ACC", mcScid: "ACC", mcScdid: "ACC06" },
    { symbol: "ADANITRANS", mcScid: "AT18", mcScdid: "AT22" },
    { symbol: "AIAENG", mcScid: "AIE01", mcScdid: "AIE01" },
    { symbol: "AKZOINDIA", mcScid: "ICI", mcScdid: "ICI" },
    { symbol: "AMARAJABAT", mcScid: "ARB", mcScdid: "ARB" },
    { symbol: "AMBUJACEM", mcScid: "GAC", mcScdid: "AC18" },
    { symbol: "APOLLOTYRE", mcScid: "AT", mcScdid: "AT14" },
    { symbol: "ASAHIINDIA", mcScid: "AIS", mcScdid: "AIG01" },
    { symbol: "ASHOKLEY", mcScid: "AL", mcScdid: "AL" },
    { symbol: "ASTERDM", mcScid: "ADH", mcScdid: "ADH" },
    { symbol: "ASTRAZEN", mcScid: "AID", mcScdid: "AZP" },
    { symbol: "ATUL", mcScid: "A06", mcScdid: "A06" },
    { symbol: "AUROPHARMA", mcScid: "AP", mcScdid: "AP" },
    { symbol: "BAJAJ-AUTO", mcScid: "BA06", mcScdid: "BA10" },
    { symbol: "BAJAJHLDNG", mcScid: "BA", mcScdid: "BHI" },
    { symbol: "BALRAMCHIN", mcScid: "BCM", mcScdid: "BCM" },
    { symbol: "BANKBEES", mcScid: "BAM02", mcScdid: "BAM02" },
    { symbol: "BAYERCROP", mcScid: "HSA01", mcScdid: "BC12" },
    { symbol: "BBTC", mcScid: "BBT", mcScdid: "BBT" },
    { symbol: "BEL", mcScid: "BE03", mcScdid: "BE03" },
    { symbol: "BIRLACORPN", mcScid: "BC07", mcScdid: "BC07" },
    { symbol: "BLUESTARCO", mcScid: "BS", mcScdid: "BS" },
    { symbol: "BRITANNIA", mcScid: "BI", mcScdid: "BI" },
    { symbol: "CADILAHC", mcScid: "CHC", mcScdid: "CHC" },
    { symbol: "CANFINHOME", mcScid: "CFH", mcScdid: "CFH" },
    { symbol: "CASTROLIND", mcScid: "CI01", mcScdid: "CI01" },
    { symbol: "CDSL", mcScid: "CDS", mcScdid: "CDS" },
    { symbol: "CEATLTD", mcScid: "C07", mcScdid: "C07" },
    { symbol: "CESC", mcScid: "CES", mcScdid: "CES" },
    { symbol: "CIPLA", mcScid: "C", mcScdid: "C" },
    { symbol: "COALINDIA", mcScid: "CI29", mcScdid: "CI11" },
    { symbol: "COCHINSHIP", mcScid: "CS17", mcScdid: "CS" },
    { symbol: "COLPAL", mcScid: "CPI", mcScdid: "CPI" },
    { symbol: "CRAFTSMAN", mcScid: "CA07", mcScdid: "CA04" },
    { symbol: "CRISIL", mcScid: "CRI", mcScdid: "CRI" },
    { symbol: "CYIENT", mcScid: "IE07", mcScdid: "IE07" },
    { symbol: "DABUR", mcScid: "DI", mcScdid: "DI" },
    { symbol: "DCMSHRIRAM", mcScid: "DCM02", mcScdid: "DCM02" },
    { symbol: "EICHERMOT", mcScid: "EM", mcScdid: "EM" },
    { symbol: "EIHOTEL", mcScid: "EIH", mcScdid: "EIH" },
    { symbol: "EMAMILTD", mcScid: "E05", mcScdid: "E06" },
    { symbol: "EMBASSY", mcScid: "EOP", mcScdid: "EOP" },
    { symbol: "EPL", mcScid: "EP", mcScdid: "EP11" },
    { symbol: "ERIS", mcScid: "EL01", mcScdid: "EL01" },
    { symbol: "EXIDEIND", mcScid: "EI", mcScdid: "EI" },
    { symbol: "FINCABLES", mcScid: "FC01", mcScdid: "FC01" },
    { symbol: "FINEORG", mcScid: "FOI", mcScdid: "FOI" },
    { symbol: "FINPIPE", mcScid: "FI", mcScdid: "FI" },
    { symbol: "FSL", mcScid: "FS07", mcScdid: "FS07" },
    { symbol: "GAIL", mcScid: "GAI", mcScdid: "GAI" },
    { symbol: "GILLETTE", mcScid: "ISP", mcScdid: "GI22" },
    { symbol: "GLENMARK", mcScid: "GP08", mcScdid: "GP08" },
    { symbol: "GMMPFAUDLR", mcScid: "GMM01", mcScdid: "GMM01" },
    { symbol: "GODREJAGRO", mcScid: "GA08", mcScdid: "GA03" },
    { symbol: "GODREJCP", mcScid: "GCP", mcScdid: "GCP" },
    { symbol: "GODREJIND", mcScid: "GS", mcScdid: "GI23" },
    { symbol: "GOLDBEES", mcScid: "GBE", mcScdid: "GBE" },
    { symbol: "GRAPHITE", mcScid: "GI13", mcScdid: "GI13" },
    { symbol: "HAL", mcScid: "HAL", mcScdid: "HAL" },
    { symbol: "HCLTECH", mcScid: "HCL02", mcScdid: "HCL02" },
    { symbol: "HDFC", mcScid: "HDF", mcScdid: "HDF" },
    { symbol: "HDFCBANK", mcScid: "HDF01", mcScdid: "HDF01" },
    { symbol: "HEIDELBERG", mcScid: "MC14", mcScdid: "HCI02" },
    { symbol: "HINDUNILVR", mcScid: "HL", mcScdid: "HU" },
    { symbol: "HUDCO", mcScid: "HUD", mcScdid: "HUD" },
    { symbol: "IDFC", mcScid: "IDF", mcScdid: "IDF" },
    { symbol: "IIFL", mcScid: "II15", mcScdid: "II15" },
    { symbol: "IIFLWAM", mcScid: "IIFLW54277", mcScdid: "IIFLW54277" },
    { symbol: "INDIACEM", mcScid: "IC", mcScdid: "IC" },
    { symbol: "INDIANB", mcScid: "IB04", mcScdid: "IB04" },
    { symbol: "INFY", mcScid: "IT", mcScdid: "IT" },
    { symbol: "INOXWIND", mcScid: "IW", mcScdid: "IW" },
    { symbol: "IOC", mcScid: "IOC", mcScdid: "IOC" },
    { symbol: "IPCALAB", mcScid: "IL", mcScdid: "IL" },
    { symbol: "IRFC", mcScid: "IRF", mcScdid: "IRF" },
    { symbol: "ITC", mcScid: "ITC", mcScdid: "ITC" },
    { symbol: "JBCHEPHARM", mcScid: "JBC", mcScdid: "JBC01" },
    { symbol: "JCHAC", mcScid: "AA02", mcScdid: "HHL" },
    { symbol: "JKLAKSHMI", mcScid: "JKC", mcScdid: "JKL01" },
    { symbol: "JUBLPHARMA", mcScid: "VOC", mcScdid: "JO03" },
    { symbol: "JUNIORBEES", mcScid: "BMF04", mcScdid: "BMF04" },
    { symbol: "JYOTHYLAB", mcScid: "JL", mcScdid: "JL" },
    { symbol: "KALPATPOWR", mcScid: "KPT", mcScdid: "KPT" },
    { symbol: "KALYANKJIL", mcScid: "KJI01", mcScdid: "KJI01" },
    { symbol: "KEC", mcScid: "KEC03", mcScdid: "KEC04" },
    { symbol: "KOTAKBANK", mcScid: "KMF", mcScdid: "KMB" },
    { symbol: "LICHSGFIN", mcScid: "LIC", mcScdid: "LIC" },
    { symbol: "M%26MFIN", mcScid: "MMF04", mcScdid: "MMF04" },
    { symbol: "M%26M", mcScid: "MM", mcScdid: "MM" },
    { symbol: "MAHINDCIE", mcScid: "MAS", mcScdid: "MF19" },
    { symbol: "MARUTI", mcScid: "MU01", mcScdid: "MS24" },
    { symbol: "MCDOWELL-N", mcScid: "MC08", mcScdid: "US" },
    { symbol: "MGL", mcScid: "MG02", mcScdid: "MG02" },
    { symbol: "MPHASIS", mcScid: "BFL", mcScdid: "MB02" },
    { symbol: "NATIONALUM", mcScid: "NAC", mcScdid: "NAC" },
    { symbol: "NBCC", mcScid: "NBC", mcScdid: "NBC01" },
    { symbol: "NCC", mcScid: "NCC01", mcScdid: "NCC01" },
    { symbol: "NESTLEIND", mcScid: "NI", mcScdid: "NI" },
    { symbol: "NH", mcScid: "NH", mcScdid: "NH" },
    { symbol: "NHPC", mcScid: "N07", mcScdid: "N07" },
    { symbol: "NIFTYBEES", mcScid: "NBE01", mcScdid: "NBE01" },
    { symbol: "NMDC", mcScid: "NMD01", mcScdid: "NMD02" },
    { symbol: "NTPC", mcScid: "NTP", mcScdid: "NTP" },
    { symbol: "OFSS", mcScid: "S11", mcScdid: "OFS01" },
    { symbol: "PEL", mcScid: "NP07", mcScdid: "PH05" },
    { symbol: "PETRONET", mcScid: "PLN", mcScdid: "PLN" },
    { symbol: "PFIZER", mcScid: "P", mcScdid: "P" },
    { symbol: "PNB", mcScid: "PNB05", mcScdid: "PNB05" },
    { symbol: "POWERGRID", mcScid: "PGC", mcScdid: "PGC" },
    { symbol: "PSUBNKBEES", mcScid: "BMF", mcScdid: "BMF" },
    { symbol: "QUESS", mcScid: "QC", mcScdid: "QC" },
    { symbol: "RAIN", mcScid: "PC13", mcScdid: "RC12" },
    { symbol: "RAJESHEXPO", mcScid: "RE07", mcScdid: "RE07" },
    { symbol: "RALLIS", mcScid: "RI03", mcScdid: "RI03" },
    { symbol: "RCF", mcScid: "RCF01", mcScdid: "RCF01" },
    { symbol: "REDINGTON", mcScid: "RI37", mcScdid: "RI37" },
    { symbol: "RELIANCE", mcScid: "RI", mcScdid: "RI" },
    { symbol: "RITES", mcScid: "R06", mcScdid: "R02" },
    { symbol: "SAIL", mcScid: "SAI", mcScdid: "SAI" },
    { symbol: "SCI", mcScid: "SCI", mcScdid: "SCI" },
    { symbol: "SHRIRAMCIT", mcScid: "SCU", mcScdid: "SCU" },
    { symbol: "SIS", mcScid: "SIS07", mcScdid: "SIS08" },
    { symbol: "SJVN", mcScid: "S14", mcScdid: "sjvn" },
    { symbol: "SKFINDIA", mcScid: "SKF", mcScdid: "SKF01" },
    { symbol: "SONATSOFTW", mcScid: "SS42", mcScdid: "SS42" },
    { symbol: "STLTECH", mcScid: "SO03", mcScdid: "ST20" },
    { symbol: "SUNCLAYLTD", mcScid: "SC", mcScdid: "SC" },
    { symbol: "SUNPHARMA", mcScid: "SPI", mcScdid: "SPI" },
    { symbol: "SWARAJENG", mcScid: "SE", mcScdid: "SE" },
    { symbol: "TATAPOWER", mcScid: "TPC", mcScdid: "TPC" },
    { symbol: "TATASTLBSL", mcScid: "BSS", mcScdid: "BS14" },
    { symbol: "TEAMLEASE", mcScid: "TS15", mcScdid: "TS13" },
    { symbol: "TECHM", mcScid: "TM4", mcScdid: "TM4" },
    { symbol: "TIMKEN", mcScid: "TT04", mcScdid: "TI23" },
    { symbol: "TITAN", mcScid: "TI01", mcScdid: "TI01" },
    { symbol: "TV18BRDCST", mcScid: "GBN", mcScdid: "IBN" },
    { symbol: "TVSMOTOR", mcScid: "TVS", mcScdid: "TVS" },
    { symbol: "UNIONBANK", mcScid: "UBI01", mcScdid: "UBI01" },
    { symbol: "VIPIND", mcScid: "VIP", mcScdid: "VIP" },
    { symbol: "VSTIND", mcScid: "VST", mcScdid: "VST" },
    { symbol: "VTL", mcScid: "MSM", mcScdid: "VT10" },
    { symbol: "WABCOINDIA", mcScid: "WAB", mcScdid: "WAB" },
    { symbol: "WELSPUNIND", mcScid: "WI03", mcScdid: "WI03" },
    { symbol: "WIPRO", mcScid: "W", mcScdid: "W" },
    { symbol: "YESBANK", mcScid: "YB", mcScdid: "YB" },
    { symbol: "ZEEL", mcScid: "ZT", mcScdid: "ZEE" },
  ];

  let placeholders = stock_details
    .map(
      (stock) =>
        "(" + stock.symbol + "," + stock.mcScid + "," + stock.mcScdid + ")"
    )
    .join(",");

  //console.log(placeholders);

  const insertIntoStockMaster = (symbol, mcScid, mcScdid) => {
    db.run(
      `INSERT INTO stock_master (symbol, mcScid, mcScdid) VALUES (?, ?, ?) `,
      [symbol, mcScid, mcScdid],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      }
    );
  };

  for (var i = 0; i < stock_details.length; i++) {
    const { symbol, mcScid, mcScdid } = stock_details[i];
    console.log(symbol, mcScid, mcScdid);
    insertIntoStockMaster(symbol, mcScid, mcScdid);
  }
*/
  // close the database connection
  db.close();
});
