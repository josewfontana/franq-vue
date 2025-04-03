export interface CurrencyQuote {
  name: string
  buy: number | null
  sell: number | null
  variation: number
}

export interface StockQuote {
  name: string
  location: string
  points: number
  variation: number
}

export interface QuotesApiResponse {
  by: string
  valid_key: boolean
  results: {
    currencies: {
      source: string
      [code: string]: CurrencyQuote | string;
    }
    stocks: {
      [index: string]: StockQuote
    }
    available_sources: string[]
  }
  execution_time: number
  from_cache: boolean
}
