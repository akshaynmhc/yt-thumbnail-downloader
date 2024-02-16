declare module 'xml2js' {
    export function parseStringPromise(xml: string, options?: object): Promise<any>;
  }