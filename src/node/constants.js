module.exports = {
  nseBaseURL: "https://www.nseindia.com/",
  nseDataURL: "https://www.nseindia.com/api/quote-equity?symbol={0}",
  moneyControlSMAEMAUrl:
    "https://priceapi.moneycontrol.com/pricefeed/techindicator/D/{0}?fields=sentiments,pivotLevels,sma,ema",
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "accept-language": "en,gu;q=0.9,hi;q=0.8",
    "accept-encoding": "gzip, deflate, br",
  },
  waitTime: 1000,

  allStocks1: [
    {
      symbol: "ABB",
      mcScid: "ABB",
      mcScdid: "ABB",
    },
    {
      symbol: "POWERINDIA",
      mcScid: "APP03",
      mcScdid: "APP03",
    },
    {
      symbol: "ACC",
      mcScid: "ACC",
      mcScdid: "ACC06",
    },
  ],
  allStocks: [
    {
      symbol: "3MINDIA",
      mcScid: "B3M",
      mcScdid: "MI42",
    },
    {
      symbol: "ABB",
      mcScid: "ABB",
      mcScdid: "ABB",
    },
    {
      symbol: "POWERINDIA",
      mcScid: "APP03",
      mcScdid: "APP03",
    },
    {
      symbol: "ACC",
      mcScid: "ACC",
      mcScdid: "ACC06",
    },
    {
      symbol: "AIAENG",
      mcScid: "AIE01",
      mcScdid: "AIE01",
    },
    {
      symbol: "APLAPOLLO",
      mcScid: "BT09",
      mcScdid: "BT09",
    },
    {
      symbol: "AUBANK",
      mcScid: "ASF03",
      mcScdid: "ASF02",
    },   
    {
      symbol: "AARTIIND",
      mcScid: "AI",
      mcScdid: "AI45",
    },
    {
      symbol: "AAVAS",
      mcScid: "AF32",
      mcScdid: "AF17",
    },
    {
      symbol: "ABBOTINDIA",
      mcScid: "KP",
      mcScdid: "AI51",
    },
    {
      symbol: "ADANIENT",
      mcScid: "AE01",
      mcScdid: "AE13",
    },
    {
      symbol: "ADANIGREEN",
      mcScid: "ADANI54145",
      mcScdid: "ADANI54145",
    },
    {
      symbol: "ADANIPORTS",
      mcScid: "MPS",
      mcScdid: "MPS",
      angelName: "ADANI PORTS"
    },
    {
      symbol: "ATGL",
      mcScid: "ADG01",
      mcScdid: "ADG01",
    },
    {
      symbol: "ADANITRANS",
      mcScid: "AT18",
      mcScdid: "AT22",
    },
    {
      symbol: "ABCAPITAL",
      mcScid: "ABC07",
      mcScdid: "ABC9",
    },
    {
      symbol: "ABFRL",
      mcScid: "PFR",
      mcScdid: "PFR",
      angelName: "ADITYA BIR. FAS."
    },
    {
      symbol: "ADVENZYMES",
      mcScid: "AET02",
      mcScdid: "AET",
      angelName: "ADVANCED ENZYME"
    },
    {
      symbol: "AEGISCHEM",
      mcScid: "AC02",
      mcScdid: "AL9",
      angelName: "AEGIS LOGISTICS"
    },
    {
      symbol: "AFFLE",
      mcScid: "AI72",
      mcScdid: "AI82",
    },
    {
      symbol: "AJANTPHARM",
      mcScid: "AP22",
      mcScdid: "AP22",
    },
    {
      symbol: "AKZOINDIA",
      mcScid: "ICI",
      mcScdid: "ICI",
      angelName: "AKZO NOBEL"
    },
    {
      symbol: "APLLTD",
      mcScid: "AP29",
      mcScdid: "AP35",
      angelName:"ALEMBIC PHARMA"
    },
    {
      symbol: "ALKEM",
      mcScid: "AL16",
      mcScdid: "AL05",
    },
    {
      symbol: "ALKYLAMINE",
      mcScid: "AAC",
      mcScdid: "AAC",
    },
    {
      symbol: "ALOKINDS",
      mcScid: "ATI",
      mcScdid: "AI54",
    },
    {
      symbol: "AMARAJABAT",
      mcScid: "ARB",
      mcScdid: "ARB",
      angelName: "AMARA RAJA BATT."
    },
    {
      symbol: "AMBER",
      mcScid: "AEI01",
      mcScdid: "AEI01",
    },
    {
      symbol: "AMBUJACEM",
      mcScid: "GAC",
      mcScdid: "AC18",
    },

    {
      symbol: "APOLLOHOSP",
      mcScid: "AHE",
      mcScdid: "AHE",
    },
    {
      symbol: "APOLLOTYRE",
      mcScid: "AT",
      mcScdid: "AT14",
      angelName: "APOLLO TYRES"
    },
    {
      symbol: "ASAHIINDIA",
      mcScid: "AIS",
      mcScdid: "AIG01",
    },
    {
      symbol: "ASHOKLEY",
      mcScid: "AL",
      mcScdid: "AL",
    },
    {
      symbol: "ASIANPAINT",
      mcScid: "API",
      mcScdid: "AP31",
    },
    {
      symbol: "ASTERDM",
      mcScid: "ADH",
      mcScdid: "ADH",
    },    
    {
      symbol: "ASTRAL",
      mcScid: "APT02",
      mcScdid: "APT02",
    },
    {
      symbol: "ATUL",
      mcScid: "A06",
      mcScdid: "A06",
    },
    {
      symbol: "AUROPHARMA",
      mcScid: "AP",
      mcScdid: "AP",
    },   
    {
      symbol: "DMART",
      mcScid: "AS28",
      mcScdid: "AS19",
    },
    {
      symbol: "AXISBANK",
      mcScid: "UTI10",
      mcScdid: "AB16",
    },
    {
      symbol: "BASF",
      mcScid: "BAS",
      mcScdid: "BAS",
    },        
    {
      symbol: "BAJAJ-AUTO",
      mcScid: "BA06",
      mcScdid: "BA10",
      angelName: "BAJAJ AUTO"
    },
    {
      symbol: "BAJAJCON",
      mcScid: "BC14",
      mcScdid: "BC02",
      angelName: "BAJAJ CONSUMER"
    },
    {
      symbol: "BAJAJELEC",
      mcScid: "BE",
      mcScdid: "BE",
      angelName: "BAJAJ ELECTRIC"
    },
    {
      symbol: "BAJFINANCE",
      mcScid: "BAF",
      mcScdid: "BAF",
    },
    {
      symbol: "BAJAJFINSV",
      mcScid: "BF04",
      mcScdid: "BF04",
    },
    {
      symbol: "BAJAJHLDNG",
      mcScid: "BA",
      mcScdid: "BHI",
    },   
    {
      symbol: "BALKRISIND",
      mcScid: "BI03",
      mcScdid: "BI03",
    },
    {
      symbol: "BALMLAWRIE",
      mcScid: "BLC",
      mcScdid: "BLC",
      angelName: "BALMER LAWRIE"
    },
    
    {
      symbol: "BANDHANBNK",
      mcScid: "BB09",
      mcScdid: "BB09",
    },
    {
      symbol: "BANKBARODA",
      mcScid: "BOB",
      mcScdid: "BOB",
    },
    {
      symbol: "BANKINDIA",
      mcScid: "BOI",
      mcScdid: "BOI",
    },
    {
      symbol: "MAHABANK",
      mcScid: "BM05",
      mcScdid: "BM05",
      angelName: "Bank of Maha"
    },
    {
      symbol: "BATAINDIA",
      mcScid: "BI01",
      mcScdid: "BI01",
    },
    {
      symbol: "BAYERCROP",
      mcScid: "HSA01",
      mcScdid: "BC12",
      angelName: "BAYER CORP SCI."
    },
    {
      symbol: "BERGEPAINT",
      mcScid: "BPI02",
      mcScdid: "BPI02",
    },
    {
      symbol: "BDL",
      mcScid: "BDL01",
      mcScdid: "BDL01",
    },
    {
      symbol: "BEL",
      mcScid: "BE03",
      mcScdid: "BE03",
    },
    {
      symbol: "BHARATFORG",
      mcScid: "BFC",
      mcScdid: "BF03",
    },
    {
      symbol: "BHEL",
      mcScid: "BHE",
      mcScdid: "BHE",
      angelName: "B H E L"
    },
    {
      symbol: "BPCL",
      mcScid: "BPC",
      mcScdid: "BPC",
      angelName: "B P C L"
    },    
    {
      symbol: "BHARTIARTL",
      mcScid: "BTV",
      mcScdid: "BA08",
    },
    {
      symbol: "BIOCON",
      mcScid: "BL03",
      mcScdid: "BL03",
    },    
    {
      symbol: "BOSCHLTD",
      mcScid: "MIC",
      mcScdid: "B05",
    },    
    {
      symbol: "BLUEDART",
      mcScid: "BDE",
      mcScdid: "BDE",
    },
    {
      symbol: "BLUESTARCO",
      mcScid: "BS",
      mcScdid: "BS",
    },
    {
      symbol: "BBTC",
      mcScid: "BBT",
      mcScdid: "BBT",
      angelName: "BOMBAY BURMAH"
    },
    {
      symbol: "BOSCHLTD",
      mcScid: "MIC",
      mcScdid: "B05",
    },
    {
      symbol: "BRIGADE",
      mcScid: "BE08",
      mcScdid: "BE08",
    },
    {
      symbol: "BRITANNIA",
      mcScid: "BI",
      mcScdid: "BI",
    },    
    {
      symbol: "CESC",
      mcScid: "CES",
      mcScdid: "CES",
    },
    {
      symbol: "CRISIL",
      mcScid: "CRI",
      mcScdid: "CRI",
    },    
    {
      symbol: "ZYDUSLIFE",
      mcScid: "CHC",
      mcScdid: "CHC",
    },    
    {
      symbol: "CANBK",
      mcScid: "CB06",
      mcScdid: "CB06",
    },    
    {
      symbol: "CGCL",
      mcScid: "DSL01",
      mcScdid: "MMF05",
    },
    {
      symbol: "CARBORUNIV",
      mcScid: "CU",
      mcScdid: "CU",
    },
    {
      symbol: "CASTROLIND",
      mcScid: "CI01",
      mcScdid: "CI01",
      angelName: "CASTROL INDIA"
    },
    {
      symbol: "CEATLTD",
      mcScid: "C07",
      mcScdid: "C07",
      angelName: "CEAT"
    },
    {
      symbol: "CENTRALBK",
      mcScid: "CBO01",
      mcScdid: "CBO01",
    },
    {
      symbol: "CDSL",
      mcScid: "CDS",
      mcScdid: "CDS",
    },
    {
      symbol: "CENTURYPLY",
      mcScid: "CP9",
      mcScdid: "CP9",
    },           
    {
      symbol: "CHAMBLFERT",
      mcScid: "CFC",
      mcScdid: "CFC",
    },
    {
      symbol: "CHOLAHLDNG",
      mcScid: "TII",
      mcScdid: "TII",
    },
    {
      symbol: "CHOLAFIN",
      mcScid: "CIF01",
      mcScdid: "CDB",
    },
    {
      symbol: "CIPLA",
      mcScid: "C",
      mcScdid: "C",
    },
    {
      symbol: "CUB",
      mcScid: "CUB",
      mcScdid: "CUB",
      angelName: "CITY UNION BANK"
    },
    {
      symbol: "COALINDIA",
      mcScid: "CI29",
      mcScdid: "CI11",
    },
    {
      symbol: "COCHINSHIP",
      mcScid: "CS17",
      mcScdid: "CS",
    },
    {
      symbol: "COFORGE",
      mcScid: "NII02",
      mcScdid: "NII02",
    },
    {
      symbol: "COLPAL",
      mcScid: "CPI",
      mcScdid: "CPI",
      angelName: "COLGATE PALMOLIVE LTD."
    },
    {
      symbol: "CAMS",
      mcScid: "CAM",
      mcScdid: "CAM",
    },
    {
      symbol: "CONCOR",
      mcScid: "CCI",
      mcScdid: "CCI",
    },
    {
      symbol: "COROMANDEL",
      mcScid: "CF06",
      mcScdid: "CI45",
    },
    {
      symbol: "CREDITACC",
      mcScid: "CG02",
      mcScdid: "CG03",
    },
    {
      symbol: "CROMPTON",
      mcScid: "CGC01",
      mcScdid: "CGC01",
    },
    {
      symbol: "CUMMINSIND",
      mcScid: "CI02",
      mcScdid: "CI02",
    },    
    {
      symbol: "DCMSHRIRAM",
      mcScid: "DCM02",
      mcScdid: "DCM02",
    },
    {
      symbol: "DLF",
      mcScid: "D04",
      mcScdid: "D04",
    },
    {
      symbol: "DABUR",
      mcScid: "DI",
      mcScdid: "DI",
      angelName: "DABUR INDIA"
    },
    {
      symbol: "DALBHARAT",
      mcScid: "OCL",
      mcScdid: "OCL",
    },
    {
      symbol: "DEEPAKNTR",
      mcScid: "DN",
      mcScdid: "DN",
    },    
    {
      symbol: "DBL",
      mcScid: "DB03",
      mcScdid: "DB04",
      angelName: "DILLIP BUILDCON"
    },
    {
      symbol: "DIVISLAB",
      mcScid: "DL03",
      mcScdid: "DL03",
    },
    {
      symbol: "DIXON",
      mcScid: "DT07",
      mcScdid: "DT07",
    },
    {
      symbol: "LALPATHLAB",
      mcScid: "DLP01",
      mcScdid: "DLP01",
    },
    {
      symbol: "DRREDDY",
      mcScid: "DRL",
      mcScdid: "DRL",
    },
    {
      symbol: "EBBETF0430",
      mcScid: "EBBET16253",
      mcScdid: "EBBET16253",
    },
    {
      symbol: "EIDPARRY",
      mcScid: "EID",
      mcScdid: "EID",
    },
    {
      symbol: "EIHOTEL",
      mcScid: "EIH",
      mcScdid: "EIH",
    },
    {
      symbol: "EPL",
      mcScid: "EP",
      mcScdid: "EP11",
      angelName: "EPL LTD"
    },    
    {
      symbol: "EICHERMOT",
      mcScid: "EM",
      mcScdid: "EM",
      angelName: "EICHER MOTORS"
    },
    {
      symbol: "ELGIEQUIP",
      mcScid: "EE01",
      mcScdid: "EE01",
    },
    {
      symbol: "EMAMILTD",
      mcScid: "E05",
      mcScdid: "E06",
    },
    {
      symbol: "ENDURANCE",
      mcScid: "ET04",
      mcScdid: "ET01",
    },
    {
      symbol: "ENGINERSIN",
      mcScid: "EI14",
      mcScdid: "EI14",
      angelName:"Engineers India Ltd."
    },
    {
      symbol: "EQUITAS",
      mcScid: "EH03",
      mcScdid: "EH03",
      angelName: "EQUITAS HOLDINGS"
    },        
    {
      symbol: "ESCORTS",
      mcScid: "E",
      mcScdid: "E",
    },
    {
      symbol: "EXIDEIND",
      mcScid: "EI",
      mcScdid: "EI",
      angelName: "EXIDE INDS."
    },    
    {
      symbol: "FEDERALBNK",
      mcScid: "FB",
      mcScdid: "FB",
    },
    {
      symbol: "FINEORG",
      mcScid: "FOI",
      mcScdid: "FOI",
    },    
    {
      symbol: "FORTIS",
      mcScid: "FH",
      mcScdid: "FH",
    },
    {
      symbol: "GAIL",
      mcScid: "GAI",
      mcScdid: "GAI",
    },    
    {
      symbol: "GALAXYSURF",
      mcScid: "GSL06",
      mcScdid: "GSL06",
    },        
    {
      symbol: "GICRE",
      mcScid: "GIC12",
      mcScdid: "GIC12",
      angelName: "GENERAL INS CORP OF INDIA"
    },
    {
      symbol: "GILLETTE",
      mcScid: "ISP",
      mcScdid: "GI22",
      angelName: "GILLETTE INDIA"
    },
    {
      symbol: "GLAXO",
      mcScid: "GI",
      mcScdid: "GSK",
      angelName: "GLAXOSMI"
    },
    {
      symbol: "GLENMARK",
      mcScid: "GP08",
      mcScdid: "GP08",
    },    
    {
      symbol: "GODREJCP",
      mcScid: "GCP",
      mcScdid: "GCP",
    },
    {
      symbol: "GODREJIND",
      mcScid: "GS",
      mcScdid: "GI23",
    },
    {
      symbol: "GODREJPROP",
      mcScid: "GP11",
      mcScdid: "GP11",
    },
    
    {
      symbol: "GRASIM",
      mcScid: "GI01",
      mcScdid: "GI01",
    },        
    {
      symbol: "GRINDWELL",
      mcScid: "GN",
      mcScdid: "GN",
    },    
    {
      symbol: "FLUOROCHEM",
      mcScid: "GUJAR54281",
      mcScdid: "GUJAR54281",
    },
    {
      symbol: "GUJGASLTD",
      mcScid: "GGC",
      mcScdid: "GGC",
    },
    {
      symbol: "GNFC",
      mcScid: "GNV",
      mcScdid: "GNV",
    },
    {
      symbol: "GPPL",
      mcScid: "GPP03",
      mcScdid: "GPP03",
      angelName: "GUJURAT PIPAVAV"
    },
    {
      symbol: "GSFC",
      mcScid: "GSF",
      mcScdid: "GSF",
      angelName: "G S F C"
    },
    {
      symbol: "GSPL",
      mcScid: "GSP02",
      mcScdid: "GSP02",
    },
    {
      symbol: "GULFOILLUB",
      mcScid: "GOL01",
      mcScdid: "GOL01",
      angelName: "GULF OIL LUBRIC."
    },
    {
      symbol: "HEG",
      mcScid: "HEG",
      mcScdid: "HEG",
      angelName:"HEG Ltd."
    },
    {
      symbol: "HCLTECH",
      mcScid: "HCL02",
      mcScdid: "HCL02",
    },
    {
      symbol: "HDFC",
      mcScid: "HDF",
      mcScdid: "HDF",
    },
    {
      symbol: "HDFCAMC",
      mcScid: "HAM02",
      mcScdid: "HAM02",
      angelName: "HDFC AMC"
    },
    {
      symbol: "HDFCBANK",
      mcScid: "HDF01",
      mcScdid: "HDF01",
    },
    {
      symbol: "HDFCLIFE",
      mcScid: "HSL01",
      mcScdid: "HSL01",
    },
    {
      symbol: "HDFCMFGETF",
      mcScid: "HDF02",
      mcScdid: "HDF02",
    },
    {
      symbol: "HFCL",
      mcScid: "HFC",
      mcScdid: "HFC",
    },
    {
      symbol: "HAPPSTMNDS",
      mcScid: "HMT01",
      mcScdid: "HMT01",
    },
    {
      symbol: "HATSUN",
      mcScid: "HAP",
      mcScdid: "HAP",
    },
    {
      symbol: "HAVELLS",
      mcScid: "HI01",
      mcScdid: "HI01",
    },
    {
      symbol: "HEIDELBERG",
      mcScid: "MC14",
      mcScdid: "HCI02",
      angelName: "HEIDELBERG CEM."
    },    
    {
      symbol: "HEROMOTOCO",
      mcScid: "HHM",
      mcScdid: "HHM",
    },    
    {
      symbol: "HINDALCO",
      mcScid: "H",
      mcScdid: "HI",
      angelName:"Hindalco Industries Ltd"
    },
    {
      symbol: "HAL",
      mcScid: "HAL",
      mcScdid: "HAL",
    },
    {
      symbol: "HINDCOPPER",
      mcScid: "HC07",
      mcScdid: "HC07",
      angelName: "HINDUSTAN COPP.."
    },
    {
      symbol: "HINDPETRO",
      mcScid: "HPC",
      mcScdid: "HPC",
      angelName: "H P C L"
    },
    {
      symbol: "HINDUNILVR",
      mcScid: "HL",
      mcScdid: "HU",
      angelName: "HIN. UNILEVER"
    },
    {
      symbol: "HINDZINC",
      mcScid: "HZ",
      mcScdid: "HZ",
    },
    {
      symbol: "HONAUT",
      mcScid: "TH",
      mcScdid: "HA04",
    },
    {
      symbol: "ICICIBANK",
      mcScid: "ICI02",
      mcScdid: "ICI02",
    },
    {
      symbol: "ICICIGI",
      mcScid: "ILG",
      mcScdid: "ILG",
    },
    {
      symbol: "ICICIPRULI",
      mcScid: "IPL01",
      mcScdid: "IPL01",
    },
    {
      symbol: "IRFC",
      mcScid: "IRF",
      mcScdid: "IRF",
      angelName: "I R F C"
    },
    {
      symbol: "ISEC",
      mcScid: "ISL03",
      mcScdid: "ISL04",
      angelName: "ICICI Securities"
    },
    {
      symbol: "IDBI",
      mcScid: "IDB",
      mcScdid: "IDB05",
      angelName: "IDBI"
    },
    {
      symbol: "IDFCFIRSTB",
      mcScid: "IDF01",
      mcScdid: "IDF01",
      angelName: "IDFC FIRST BANK"
    },
    {
      symbol: "IDFC",
      mcScid: "IDF",
      mcScdid: "IDF",
    },    
    {
      symbol: "IIFL",
      mcScid: "II15",
      mcScdid: "II15",
    },
    {
      symbol: "IIFLWAM",
      mcScid: "IIFLW54277",
      mcScdid: "IIFLW54277",
    },    
    {
      symbol: "IRB",
      mcScid: "IID01",
      mcScdid: "IID01",
    },
    {
      symbol: "ITC",
      mcScid: "ITC",
      mcScdid: "ITC",
    },
    {
      symbol: "ITI",
      mcScid: "ITI",
      mcScdid: "ITI",
    },    
    {
      symbol: "INDIAMART",
      mcScid: "II22",
      mcScdid: "II12",
    },
    {
      symbol: "INDIANB",
      mcScid: "IB04",
      mcScdid: "IB04",
    },
    {
      symbol: "IEX",
      mcScid: "IEE",
      mcScdid: "IEE",
    },
    {
      symbol: "INDHOTEL",
      mcScid: "IHC",
      mcScdid: "IHC",
    },
    {
      symbol: "IOC",
      mcScid: "IOC",
      mcScdid: "IOC",
    },
    {
      symbol: "IOB",
      mcScid: "IOB",
      mcScdid: "IOB",
    },
    {
      symbol: "IRCTC",
      mcScid: "IRC",
      mcScdid: "IRC",
    },
    {
      symbol: "IGL",
      mcScid: "IG04",
      mcScdid: "IG04",
      angelName: "INDRAPRASTHA G.."
    },
    {
      symbol: "INDUSTOWER",
      mcScid: "BI26",
      mcScdid: "BI14",
    },
    {
      symbol: "INDUSINDBK",
      mcScid: "IIB",
      mcScdid: "IIB",
    },    
    {
      symbol: "NAUKRI",
      mcScid: "IEI01",
      mcScdid: "IEI01",
    },
    {
      symbol: "INFY",
      mcScid: "IT",
      mcScdid: "IT",
      angelName: "INFOSYS"
    },            
    {
      symbol: "INDIGO",
      mcScid: "IA05",
      mcScdid: "IA04",
    },
    {
      symbol: "IPCALAB",
      mcScid: "IL",
      mcScdid: "IL",
    },
    {
      symbol: "JBCHEPHARM",
      mcScid: "JBC",
      mcScdid: "JBC01",
    },
    {
      symbol: "JKCEMENT",
      mcScid: "JKC03",
      mcScdid: "JKC03",
    },
    {
      symbol: "JKLAKSHMI",
      mcScid: "JKC",
      mcScdid: "JKL01",
    },
    {
      symbol: "JKPAPER",
      mcScid: "CPM01",
      mcScdid: "JKP01",
    },        
    {
      symbol: "JSWENERGY",
      mcScid: "JE02",
      mcScdid: "JE01",
    },
    {
      symbol: "JSWSTEEL",
      mcScid: "JVS",
      mcScdid: "JSW01",
    },    
    {
      symbol: "JINDALSTEL",
      mcScid: "JSP",
      mcScdid: "JSP",
    },
    {
      symbol: "JCHAC",
      mcScid: "AA02",
      mcScdid: "HHL",
      angelName: "JOHNSON CON. HIT"
    },
    {
      symbol: "JUBLFOOD",
      mcScid: "JF04",
      mcScdid: "JF04",
    },
    {
      symbol: "JUSTDIAL",
      mcScid: "JD02",
      mcScdid: "JD",
    },
    {
      symbol: "JYOTHYLAB",
      mcScid: "JL",
      mcScdid: "JL",
    },
    {
      symbol: "KPRMILL",
      mcScid: "M09",
      mcScdid: "M15",
    },
    {
      symbol: "KEI",
      mcScid: "KEI",
      mcScdid: "KEI",
    },    
    {
      symbol: "KPITTECH",
      mcScid: "KPITT54265",
      mcScdid: "KPITT54265",
    },
    {
      symbol: "KRBL",
      mcScid: "KRB",
      mcScdid: "KRB01",
    },    
    {
      symbol: "KAJARIACER",
      mcScid: "KC06",
      mcScdid: "KC06",
    },    
    {
      symbol: "KANSAINER",
      mcScid: "GNP",
      mcScdid: "KNP",
      angelName: "KANSAI NEROLAC"
    },
    {
      symbol: "KARURVYSYA",
      mcScid: "KVB",
      mcScdid: "KVB",
    },
    {
      symbol: "KSCL",
      mcScid: "KSC01",
      mcScdid: "KSC01",
      angelName:"Kaveri Seed Company Ltd"
    },
    {
      symbol: "KEC",
      mcScid: "KEC03",
      mcScdid: "KEC04",
    },
    {
      symbol: "KOTAKBANK",
      mcScid: "KMF",
      mcScdid: "KMB",
      angelName: "KOTAK MAH. BANK"
    },
    {
      symbol: "LTTS",
      mcScid: "LTS",
      mcScdid: "LTS",
    },
    {
      symbol: "LICI",
      mcScid: "LIC09",
      mcScdid: "LIC09",
      angelName: "LIC India"
    },
    {
      symbol: "LICHSGFIN",
      mcScid: "LIC",
      mcScdid: "LIC",
      angelName: "LIC HOUSING FIN."
    },    
    {
      symbol: "LAXMIMACH",
      mcScid: "LMW",
      mcScdid: "LMW",
    },
    {
      symbol: "LTI",
      mcScid: "LI09",
      mcScdid: "LI12",
    },
    {
      symbol: "LT",
      mcScid: "LT",
      mcScdid: "LT",
    },
    {
      symbol: "LAURUSLABS",
      mcScid: "LL06",
      mcScdid: "LL05",
    },    
    {
      symbol: "LINDEINDIA",
      mcScid: "BOC",
      mcScdid: "BOC",
    },
    {
      symbol: "LUPIN",
      mcScid: "LC03",
      mcScdid: "L",
    },    
    {
      symbol: "M&M",
      mcScid: "MM",
      mcScdid: "MM",
      angelName: "M & M"
    },
    {
      symbol: "M&MFIN",
      mcScid: "MMF04",
      mcScdid: "MMF04",
    },
    {
      symbol: "MMTC",
      mcScid: "MMT",
      mcScdid: "MMT",
    },    
    {
      symbol: "MRF",
      mcScid: "MRF",
      mcScdid: "MRF",
    },
    {
      symbol: "MGL",
      mcScid: "MG02",
      mcScdid: "MG02",
      angelName: "MAHANAGAR GAS"
    },
    {
      symbol: "MAHINDCIE",
      mcScid: "MAS",
      mcScdid: "MF19",
    },    
    {
      symbol: "MANAPPURAM",
      mcScid: "MGF01",
      mcScdid: "MGF01",
    },
    {
      symbol: "MRPL",
      mcScid: "MRP",
      mcScdid: "MRP",
    },
    {
      symbol: "MARICO",
      mcScid: "MI25",
      mcScdid: "M13",
    },
    {
      symbol: "MARUTI",
      mcScid: "MU01",
      mcScdid: "MS24",
    },
    
    {
      symbol: "MAXHEALTH",
      mcScid: "MHI",
      mcScdid: "MHI",
    },
    {
      symbol: "MAZDOCK",
      mcScid: "MDS01",
      mcScdid: "MDS01",
    },
    {
      symbol: "METROPOLIS",
      mcScid: "MH09",
      mcScdid: "MH06",
    },
    {
      symbol: "MINDTREE",
      mcScid: "MC20",
      mcScdid: "MT13",
    },    
    {
      symbol: "MINDAIND",
      mcScid: "MI44",
      mcScdid: "MI4",
    },    
    {
      symbol: "MOTILALOFS",
      mcScid: "MOF01",
      mcScdid: "MOF01",
    },
    {
      symbol: "MPHASIS",
      mcScid: "BFL",
      mcScdid: "MB02",
    },
    {
      symbol: "MCX",
      mcScid: "MCE",
      mcScdid: "MCE",
      angelName: "MULTI COMM. EXC."
    },
    {
      symbol: "MUTHOOTFIN",
      mcScid: "MF19",
      mcScdid: "MF10",
    },
    {
      symbol: "NATCOPHARM",
      mcScid: "NP01",
      mcScdid: "NP07",
    },    
    {
      symbol: "NIFTYBEES",
      mcScid: "NBE01",
      mcScdid: "NBE01",
    },
    {
      symbol: "NHPC",
      mcScid: "N07",
      mcScdid: "N07",
    },

    {
      symbol: "NLCINDIA",
      mcScid: "NLC",
      mcScdid: "NLC",
    },
    {
      symbol: "NMDC",
      mcScid: "NMD01",
      mcScdid: "NMD02",
    },    
    {
      symbol: "NTPC",
      mcScid: "NTP",
      mcScdid: "NTP",
    },
    {
      symbol: "NATIONALUM",
      mcScid: "NAC",
      mcScdid: "NAC",
    },
    {
      symbol: "NAVINFLUOR",
      mcScid: "PRC",
      mcScdid: "NFI",
    },
    {
      symbol: "NESTLEIND",
      mcScid: "NI",
      mcScdid: "NI",
    },    
    {
      symbol: "NAM-INDIA",
      mcScid: "RNL",
      mcScdid: "RNL",
    },
    {
      symbol: "OBEROIRLTY",
      mcScid: "OR",
      mcScdid: "OR",
    },
    {
      symbol: "ONGC",
      mcScid: "ONG",
      mcScdid: "ONG",
    },
    {
      symbol: "OFSS",
      mcScid: "S11",
      mcScdid: "OFS01",
    },
    {
      symbol: "ORIENTELEC",
      mcScid: "ORIEN54130",
      mcScdid: "ORIEN54130",
    },
    {
      symbol: "RAINBOW",
      mcScid: "RCM03",
      mcScdid: "RCM03",
    },
    {
      symbol: "RHIM",
      mcScid: "OR01",
      mcScdid: "OR01",
    },
    {
      symbol: "PIIND",
      mcScid: "PII",
      mcScdid: "PII",
    },
    {
      symbol: "PAYTM",
      mcScid: "OC10",
      mcScdid: "OC03",
      angelName: "ONE 97"
    },        
    {
      symbol: "PVR",
      mcScid: "PVR",
      mcScdid: "PVR",
    },
    {
      symbol: "PAGEIND",
      mcScid: "PI35",
      mcScdid: "PI35",
    },
    {
      symbol: "PERSISTENT",
      mcScid: "PS15",
      mcScdid: "PS15",
    },
    {
      symbol: "PETRONET",
      mcScid: "PLN",
      mcScdid: "PLN",
    },
    {
      symbol: "PFIZER",
      mcScid: "P",
      mcScdid: "P",
      angelName: "PFIZER"
    },
    {
      symbol: "PHOENIXLTD",
      mcScid: "PM02",
      mcScdid: "PM02",
    },
    {
      symbol: "PIDILITIND",
      mcScid: "PI11",
      mcScdid: "PI11",
    },
    {
      symbol: "PEL",
      mcScid: "NP07",
      mcScdid: "PH05",
    },
    {
      symbol: "POLYMED",
      mcScid: "PM06",
      mcScdid: "PM06",
    },
    {
      symbol: "POLYCAB",
      mcScid: "PI41",
      mcScdid: "PI44",
    },    
    {
      symbol: "PFC",
      mcScid: "PFC02",
      mcScdid: "PFC02",
    },
    {
      symbol: "POWERGRID",
      mcScid: "PGC",
      mcScdid: "PGC",
    },
    {
      symbol: "PRESTIGE",
      mcScid: "PEP02",
      mcScdid: "PEP02",
    },
    {
      symbol: "PRINCEPIPE",
      mcScid: "PPF",
      mcScdid: "PPF",
    },
    {
      symbol: "PRSMJOHNSN",
      mcScid: "PC",
      mcScdid: "PC",
    },
    {
      symbol: "PGHL",
      mcScid: "EMI",
      mcScdid: "M12",
      angelName: "P & G HEALTH L"
    },
    {
      symbol: "PGHH",
      mcScid: "PGI",
      mcScdid: "PGH",
    },
    {
      symbol: "PNB",
      mcScid: "PNB05",
      mcScdid: "PNB05",
    },
    {
      symbol: "QUESS",
      mcScid: "QC",
      mcScdid: "QC",
    },
    {
      symbol: "RBLBANK",
      mcScid: "RB02",
      mcScdid: "RB03",
    },
    {
      symbol: "RECLTD",
      mcScid: "REC02",
      mcScdid: "REC02",
      angelName: "REC LTD"
    },
    {
      symbol: "RITES",
      mcScid: "R06",
      mcScdid: "R02",
    },
    {
      symbol: "RADICO",
      mcScid: "RK01",
      mcScdid: "RK01",
    },
    {
      symbol: "RVNL",
      mcScid: "RVN",
      mcScdid: "RVN",
      angelName: "Rail Vikas",
    },
    {
      symbol: "RAILTEL",
      mcScid: "RCO01",
      mcScdid: "RCO01",
      angelName: "RAILTEL",
    },    
    {
      symbol: "RAJESHEXPO",
      mcScid: "RE07",
      mcScdid: "RE07",
      angelName:"Rajesh Exports Ltd."
    },
    {
      symbol: "RALLIS",
      mcScid: "RI03",
      mcScdid: "RI03",
      angelName: "RALLIS INDIA"
    },    
    {
      symbol: "RATNAMANI",
      mcScid: "RMT",
      mcScdid: "RMT",
    },
    {
      symbol: "RAYMOND",
      mcScid: "R",
      mcScdid: "R",
    },
    {
      symbol: "REDINGTON",
      mcScid: "RI37",
      mcScdid: "RI37",
    },
    {
      symbol: "RELAXO",
      mcScid: "RF07",
      mcScdid: "RF07",
    },
    {
      symbol: "RELIANCE",
      mcScid: "RI",
      mcScdid: "RI",
    },
    {
      symbol: "ROUTE",
      mcScid: "RML02",
      mcScdid: "RML02",
    },
    {
      symbol: "SBICARD",
      mcScid: "SCP03",
      mcScdid: "SCP02",
    },
    {
      symbol: "SBILIFE",
      mcScid: "SLI03",
      mcScdid: "SLI03",
    },    
    {
      symbol: "SJVN",
      mcScid: "S14",
      mcScdid: "S11",
    },
    {
      symbol: "SAPPHIRE",
      mcScid: "SFI05",
      mcScdid: "SFI05",
    },
    {
      symbol: "SKFINDIA",
      mcScid: "SKF",
      mcScdid: "SKF01",
    },
    {
      symbol: "SRF",
      mcScid: "SRF",
      mcScdid: "SRF",
    },
    {
      symbol: "SANOFI",
      mcScid: "HMR",
      mcScdid: "AP26",
      angelName: "SANOFI INDIA"
    },
    {
      symbol: "SCHAEFFLER",
      mcScid: "FPB",
      mcScdid: "FAG",
    },
    {
      symbol: "SHYAMMETL",
      mcScid: "SME05",
      mcScdid: "SME05",
      angelName: "SHYAM METALICS"
    },

    {
      symbol: "SFL",
      mcScid: "SF30",
      mcScdid: "SF14",
    },
    {
      symbol: "SHREECEM",
      mcScid: "SC12",
      mcScdid: "SC12",
    },
    {
      symbol: "SHRIRAMCIT",
      mcScid: "SCU",
      mcScdid: "SCU",
    },
    {
      symbol: "SRTRANSFIN",
      mcScid: "STF",
      mcScdid: "STF",
    },
    {
      symbol: "SIEMENS",
      mcScid: "S",
      mcScdid: "S",
    },      
    {
      symbol: "SONATSOFTW",
      mcScid: "SS42",
      mcScdid: "SS42",
    },  
    {
      symbol: "SBIN",
      mcScid: "SBI",
      mcScdid: "SBI",
    },
    {
      symbol: "SAIL",
      mcScid: "SAI",
      mcScdid: "SAI",
    },
    
    {
      symbol: "STLTECH",
      mcScid: "SO03",
      mcScdid: "ST20",
      angelName: "STERLITE TECH."
    },    
    {
      symbol: "SUMICHEM",
      mcScid: "SUMIC54292",
      mcScdid: "SUMIC54292",
    },
    {
      symbol: "SPARC",
      mcScid: "SPA",
      mcScdid: "SPA",
    },
    {
      symbol: "SUNPHARMA",
      mcScid: "SPI",
      mcScdid: "SPI",
    },
    {
      symbol: "SUNTV",
      mcScid: "STV01",
      mcScdid: "STN01",
    },
    {
      symbol: "SUNDARMFIN",
      mcScid: "SF20",
      mcScdid: "SF20",
    },
    {
      symbol: "SUNDRMFAST",
      mcScid: "SF",
      mcScdid: "SF23",
    },    
    {
      symbol: "SUPREMEIND",
      mcScid: "SI48",
      mcScdid: "SI48",
    },
    {
      symbol: "SUVENPHAR",
      mcScid: "SP42",
      mcScdid: "SP19",
    },
    {
      symbol: "SUZLON",
      mcScid: "SE17",
      mcScdid: "SE17",
    },
    {
      symbol: "SWANENERGY",
      mcScid: "SM09",
      mcScdid: "SM09",
    },
    {
      symbol: "SYMPHONY",
      mcScid: "SCS04",
      mcScdid: "SCS04",
    },
    {
      symbol: "SYNGENE",
      mcScid: "SI62",
      mcScdid: "SI10",
    },
    {
      symbol: "TCIEXP",
      mcScid: "TCI08",
      mcScdid: "TCI08",
    },
    {
      symbol: "TTKPRESTIG",
      mcScid: "TTK02",
      mcScdid: "TTK02",
    },
    {
      symbol: "TV18BRDCST",
      mcScid: "GBN",
      mcScdid: "IBN",
    },
    {
      symbol: "TVSMOTOR",
      mcScid: "TVS",
      mcScdid: "TVS",
    },
    {
      symbol: "TANLA",
      mcScid: "TS11",
      mcScdid: "TS11",
    },    
    {
      symbol: "TATACHEM",
      mcScid: "TC",
      mcScdid: "TC",
    },
    {
      symbol: "TATACOMM",
      mcScid: "VSN",
      mcScdid: "TC17",
    },
    {
      symbol: "TCS",
      mcScid: "TCS",
      mcScdid: "TCS",
      angelName: "TCS"
    },
    {
      symbol: "TATACONSUM",
      mcScid: "TT",
      mcScdid: "TT",
    },
    {
      symbol: "TATAELXSI",
      mcScid: "TEI",
      mcScdid: "TE",
    },
    {
      symbol: "TATAINVEST",
      mcScid: "TIC",
      mcScdid: "TIC",
    },
    {
      symbol: "TATAMTRDVR",
      mcScid: "TMD",
      mcScdid: "TATAM57000",
    },
    {
      symbol: "TATAMOTORS",
      mcScid: "TEL",
      mcScdid: "TM03",
    },
    {
      symbol: "TATAPOWER",
      mcScid: "TPC",
      mcScdid: "TPC",
    },
    {
      symbol: "TATASTEEL",
      mcScid: "TIS",
      mcScdid: "TIS",
    },
    {
      symbol: "TECHM",
      mcScid: "TM4",
      mcScdid: "TM4",
      angelName: "TECH MAHINDRA"
    },
    {
      symbol: "NIACL",
      mcScid: "NIA",
      mcScdid: "NIA",
    },
    {
      symbol: "RAMCOCEM",
      mcScid: "MC",
      mcScdid: "MC",
    },
    {
      symbol: "THERMAX",
      mcScid: "T",
      mcScdid: "T",
    },    
    {
      symbol: "TIMKEN",
      mcScid: "TT04",
      mcScdid: "TI23",
    },
    {
      symbol: "TITAN",
      mcScid: "TI01",
      mcScdid: "TI01",
    },
    {
      symbol: "TORNTPHARM",
      mcScid: "TP06",
      mcScdid: "TP06",
    },
    {
      symbol: "TORNTPOWER",
      mcScid: "TP13",
      mcScdid: "TP14",
      angelName: "TORRENT POWER"
    },
    {
      symbol: "TRENT",
      mcScid: "L",
      mcScdid: "T04",
    },
    {
      symbol: "TRIDENT",
      mcScid: "AI01",
      mcScdid: "AI01",
    },
    {
      symbol: "TRITURBINE",
      mcScid: "TT12",
      mcScdid: "TT14",
    },
    {
      symbol: "TIINDIA",
      mcScid: "TIIND54076",
      mcScdid: "TIIND54076",
    },
    {
      symbol: "UCOBANK",
      mcScid: "UCO",
      mcScdid: "UCO",
    },
    {
      symbol: "UFLEX",
      mcScid: "FI08",
      mcScdid: "U01",
    },
    {
      symbol: "UPL",
      mcScid: "SI10",
      mcScdid: "UP04",
    },
    {
      symbol: "UTIAMC",
      mcScid: "UA03",
      mcScdid: "UA04",
    },
        
    {
      symbol: "ULTRACEMCO",
      mcScid: "UTC",
      mcScdid: "UTC01",
    },
    {
      symbol: "UNIONBANK",
      mcScid: "UBI01",
      mcScdid: "UBI01",
      angelName: "UNION BANK"
    },
    {
      symbol: "UBL",
      mcScid: "UBB",
      mcScdid: "UB02",
    },
    {
      symbol: "MCDOWELL-N",
      mcScid: "MC08",
      mcScdid: "US",
    },
    {
      symbol: "VGUARD",
      mcScid: "VI16",
      mcScdid: "VI02",
    },
    {
      symbol: "VMART",
      mcScid: "VR03",
      mcScdid: "VR03",
    },
    {
      symbol: "VIPIND",
      mcScid: "VIP",
      mcScdid: "VIP",
    },
    {
      symbol: "VSTIND",
      mcScid: "VST",
      mcScdid: "VST",
      angelName: "VST INDUSTRIES"
    },    
    {
      symbol: "VTL",
      mcScid: "MSM",
      mcScdid: "VT10",
    },
/*     {
      symbol: "VARROC",
      mcScid: "VE08",
      mcScdid: "VE08",
    }, */
    {
      symbol: "VBL",
      mcScid: "VB05",
      mcScdid: "VB05",
    },
    {
      symbol: "VEDL",
      mcScid: "SG",
      mcScdid: "SG",
    },    
    {
      symbol: "VINATIORGA",
      mcScid: "VO01",
      mcScdid: "VO01",
    },
    {
      symbol: "IDEA",
      mcScid: "IC8",
      mcScdid: "IC8",
    },
    {
      symbol: "VOLTAS",
      mcScid: "V",
      mcScdid: "V",
    },
    {
      symbol: "ZFCVINDIA",
      mcScid: "WAB",
      mcScdid: "WAB",
    },
    {
      symbol: "WELCORP",
      mcScid: "WGS",
      mcScdid: "WGS",
    },
    {
      symbol: "WELSPUNIND",
      mcScid: "WI03",
      mcScdid: "WI03",
      angelName:"Welspun India Ltd."
    },
    {
      symbol: "WESTLIFE",
      mcScid: "DIC",
      mcScdid: "DIC",
    },
    {
      symbol: "WHIRLPOOL",
      mcScid: "WI",
      mcScdid: "WI",
      angelName:"Whirlpool Of India Ltd"
    },
    {
      symbol: "WIPRO",
      mcScid: "W",
      mcScdid: "W",
    },
    {
      symbol: "WOCKPHARMA",
      mcScid: "W05",
      mcScdid: "W05",
      angelName: "WOCKHARDT"
    },
    {
      symbol: "YESBANK",
      mcScid: "YB",
      mcScdid: "YB",
      angelName: "YES BANK"
    },    
    {
      symbol: "ZOMATO",
      mcScid: "Z01",
      mcScdid: "Z",
      angelName: "ZOMATO LTD"
    },
    {
      symbol: "ZYDUSWELL",
      mcScid: "CNA",
      mcScdid: "ZW01",
    },
  ],
};
