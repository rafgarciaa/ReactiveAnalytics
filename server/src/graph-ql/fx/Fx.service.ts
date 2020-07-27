import autobahn from 'autobahn'
import { Service } from 'typedi'
import data from '../../mock-data/currencySymbols.json'
import { pubsub } from '../../pubsub'
import logger from '../../services/logger'
import { SearchResultSchema as SearchResult } from '../stock/Stock.schema'
import getDataSource  from '../../connectors'
import { MarketSegments } from '../ref-data/RefData.schema'
import EventSource from 'eventsource'

const createTopic = (fxPair: string) => `FX_UPDATE.${fxPair}`

const iex = getDataSource(process.env.INSIGHTS_OFFLINE)

const baseURL = "https://cloud.iexapis.com/";
const sseBaseURL = "https://cloud-sse.iexapis.com/";
const sandboxURL = "https://sandbox.iexapis.com/";
const sseSandboxURL = "https://sandbox-sse.iexapis.com/";
const pk = process.env.IEXCLOUD_PUBLIC_KEY;
const apiversion = process.env.IEXCLOUD_API_VERSION;
const aToken = `&token=${pk}`;
const qToken = `?token=${pk}`;

interface ISymbolData {
  [key: string]: {
    name: string
    ratePrecision?: number
    pipsPosition?: number
    base?: string
    terms?: string
  }
}

interface IStatusTopic {
  [pair: string]: {
    connection: EventSource
    listeners:number
  }
}

interface IPreviousMid {
  [key: string]: number | null
}

@Service()
export default class {
  private statusTopics: IStatusTopic = {}
  constructor() {
    
  }

  public getSymbol(id: string): SearchResult {
    const symbolData = data as ISymbolData
    return { id, marketSegment: MarketSegments.FX, ...symbolData[id] }
  }

  public getSymbols(filterText: string): SearchResult[] {
    const symbolData = data as ISymbolData
    return Object.keys(symbolData)
      .filter(key => key.includes(filterText) || symbolData[key].name.includes(filterText))
      .map(key => ({ id: key, marketSegment: MarketSegments.FX, ...symbolData[key] }))
  }

  public async getPriceHistory(from: string, to: string) {
    const raw = await iex.iexApiRequest(`/fx/historical?symbols=${from}${to}&last=10`);
    return raw[0].map((key:any) =>({Pair:{from,to},ask:key.rate,bid:key.rate,creationTimestamp:key.timestamp, mid:key.rate,valueDate:key.date}));
  }
  private createFXRate(rawFXRate:any){
      const fromCurrency = rawFXRate.symbol.substring(0,4);
      const toCurrency = rawFXRate.symbol.substring(3);
      return {
        date: rawFXRate.timestamp,
        fromCurrency,
        toCurrency,
        rate:rawFXRate.rate
      }
  }
  public async subscribeFXUpdates(fxPair: string) {
    if (this.statusTopics && this.statusTopics[fxPair]) {
      this.statusTopics[fxPair].listeners++;
    }else {
      const url = this.constructURL(`/forex1Minute?symbols=${fxPair}`,true);
      const eventSource = new EventSource(url);
      this.statusTopics[fxPair] = {
        connection:eventSource,
        listeners:1
      }
      const onMessageFunc = (event:any) => {
        const data = JSON.parse(event.data);
        if(event.data &&  data.length > 0){
          pubsub.publish(createTopic(fxPair), this.createFXRate(data[0]))
        }
        }
      eventSource.onmessage = onMessageFunc;
    }
  }

  public stopFXUpdates(fxPair: string){
    if (this.statusTopics[fxPair]) {
      this.statusTopics[fxPair].connection.close();
      delete this.statusTopics[fxPair];
    }
  }

  private makeid(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  private prefix(isSSE:Boolean) {
      if (pk && pk[0] === "T") {
          return isSSE ? sseSandboxURL :sandboxURL;
      }
      else {
          return isSSE ? sseBaseURL :baseURL;
      }
  };

  private chooseToken(str:string){
      if (str.includes("?")) {
          return aToken;
      }
      else {
          return qToken;
      }
  };
  public  constructURL = (endpoint:string, isSSE:Boolean) => {
      return this.prefix(isSSE) + apiversion + endpoint + this.chooseToken(endpoint);
  };
}
