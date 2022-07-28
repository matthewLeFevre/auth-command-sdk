import fetch, { Response } from "node-fetch";

interface AuthCommandInit {
  enviornment: string;
  appAPIKey: string;
  appID: string;
}

interface CreateUserInt {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

interface Result {
  data: any;
  message: string;
  status: number;
}

export default class AuthCommandSDK {
  enviornment: string;
  appAPIKey: string;
  appId: string;
  config: any;

  constructor({ enviornment, appAPIKey, appID }: AuthCommandInit) {
    this.enviornment = enviornment + "/users";
    this.appAPIKey = appAPIKey;
    this.appId = appID;
    this.config = {
      headers: {
        Authorization: `Bearer ${appAPIKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  }

  async createUser(user: CreateUserInt): Promise<Result> {
    const result = await fetch(`${this.enviornment}`, {
      method: "POST",
      ...this.config,
      body: { ...user, appId: this.appId },
    });
    const response: any = await result.json();
    const processedResult: Result = { ...response, status: result.status };
    return processedResult;
  }
  async getUserById(id: string) {
    const result = await fetch(
      `${this.enviornment}/${id}?appId=${this.appId}`,
      this.config
    );
    const response: any = await result.json();
    const processedResult: Result = { ...response, status: result.status };
    return processedResult;
  }
  async getAllUsers() {
    const result = await fetch(
      `${this.enviornment}?appId=${this.appId}`,
      this.config
    );
    const response: any = await result.json();
    const processedResult: Result = { ...response, status: result.status };
    return processedResult;
  }
  async authenticate(email: string, password: string): Promise<any> {
    const result = await fetch(
      `${this.enviornment}/authenticate?appId=${this.appId}`,
      { ...this.config, body: { email, password } }
    );
    const response: any = await result.json();
    const processedResult: Result = { ...response, status: result.status };
    return processedResult;
  }
}
