import axios from "axios";

interface AuthCommandInit {
  path: string;
  appAPIKey: string;
  appID: string;
}

interface CreateUserInt {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

export default class AuthCommandSDK {
  path: string;
  appAPIKey: string;
  appId: string;
  config: any;

  constructor({ path, appAPIKey, appID }: AuthCommandInit) {
    this.path = path + "/users";
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

  async createUser(user: CreateUserInt): Promise<string> {
    const result = await axios.post(
      `${this.path}?appId=${this.appId}`,
      user,
      this.config
    );
    return result.data.data;
  }
  async getUserById(id: string) {
    return await axios.get(
      `${this.path}/${id}?appId=${this.appId}`,
      this.config
    );
  }
  async getAllUsers() {
    return await axios.get(`${this.path}?appId=${this.appId}`, this.config);
  }
  async authenticate(email: string, password: string): Promise<any> {
    const result = await axios.post(
      `${this.path}/authenticate?appId=${this.appId}`,
      { email, password },
      this.config 
    );
    return result.data.data;
  }
}
