import { RequestInfo, RequestInit } from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

interface AuthCommandInit {
  enviornment: string;
  appAPIKey: string;
  appId: string;
}

interface CreateUserInt {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

interface Result<T> {
  data?: T;
  message: string;
  status: number;
}

export default class AuthCommandSDK {
  enviornment: string;
  appAPIKey: string;
  appId: string;
  config: any;

  constructor({ enviornment, appAPIKey, appId }: AuthCommandInit) {
    this.enviornment = enviornment + "/users";
    this.appAPIKey = appAPIKey;
    this.appId = appId;
    this.config = {
      headers: {
        Authorization: `Bearer ${appAPIKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  }

  async createUser(user: CreateUserInt): Promise<Result<any>> {
    const result = await fetch(`${this.enviornment}`, {
      method: "POST",
      ...this.config,
      body: JSON.stringify({ ...user, appId: this.appId }),
    });

    const response: any = await result.json();
    const processedResult: Result<any> = { ...response, status: result.status };
    return processedResult;
  }
  async getUserById(id: string) {
    const result = await fetch(
      `${this.enviornment}/${id}?appId=${this.appId}`,
      this.config
    );
    const response: any = await result.json();
    const processedResult: Result<any> = { ...response, status: result.status };
    return processedResult;
  }
  async getAllUsers() {
    const result = await fetch(
      `${this.enviornment}/application?appId=${this.appId}`,
      this.config
    );
    const response: any = await result.json();
    const processedResult: Result<any> = { ...response, status: result.status };
    return processedResult;
  }
  async authenticate(email: string, password: string): Promise<any> {
    const result = await fetch(
      `${this.enviornment}/authenticate?appId=${this.appId}`,
      {
        ...this.config,
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    const response: any = await result.json();
    const processedResult: Result<any> = { ...response, status: result.status };
    return processedResult;
  }
  async updateUser(userId: string, updates) {
    const result = await fetch(
      `${this.enviornment}/${userId}?appId=${this.appId}`,
      {
        ...this.config,
        method: "PUT",
        body: JSON.stringify(updates),
      }
    );
    const response = await result.json();
    console.log(response.data);
    const processedResult: Result<any> = { ...response, status: result.status };
    return processedResult;
  }

  async deleteUser(userId: string) {
    const result = await fetch(
      `${this.enviornment}/${userId}?appId=${this.appId}`,
      {
        ...this.config,
        method: "DELETE",
      }
    );
    const response = await result.json();
    const processedResult: Result<any> = { ...response, status: result.status };
    return processedResult;
  }
}
