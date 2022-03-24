import { HttpRequest } from "./http-request";

export interface IResponse {
  status: number;

  statusText: string;

  headers: Headers | any;

  trailer?: Promise<Headers | any>;

  ok: boolean;

  redirected: boolean;

  type: ResponseType;

  url: string;

  json(): Promise<any>;

  text(): Promise<string>;

  arrayBuffer(): Promise<ArrayBuffer>;

  formData?(): Promise<FormData>;

  blob(): Promise<Blob | any>;

  clone(): any;
}

export class HttpResponse {
  get status(): number {
    return this.response.status;
  }

  get statusText(): string {
    return this.response.statusText;
  }

  get headers(): Headers {
    return this.response.headers;
  }

  get trailer(): Promise<Headers> | undefined {
    return this.response.trailer;
  }

  get ok(): boolean {
    return this.response.ok;
  }

  get redirected(): boolean {
    return this.response.redirected;
  }

  get type(): ResponseType {
    return this.response.type;
  }

  get url(): string {
    return this.response.url;
  }

  constructor(
    public readonly response: IResponse,
    public readonly request: HttpRequest
  ) {}

  async json(): Promise<any> {
    return await this.response.json();
  }

  async text(): Promise<string> {
    return await this.response.text();
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    return await this.response.arrayBuffer();
  }

  async formData(): Promise<FormData> {
    if (this.response.formData) return await this.response.formData();
    throw new Error("Form data method not present in response.");
  }

  async blob(): Promise<Blob> {
    return await this.response.blob();
  }

  async cloneInternalResponse(): Promise<Response> {
    return await this.response.clone();
  }
}
