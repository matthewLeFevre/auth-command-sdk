// const AuthCommandSDK = require("../dist/index");
// const { faker } = require("@faker-js/faker");
import { appAPIKey, appId, appName, enviornment } from "./env";
import AuthCommandSDK from "../src/index";
import { faker } from "@faker-js/faker";
import { assert, describe, expect, test } from "vitest";
import { j } from "vitest/dist/index-ea17aa0c";
describe("User CRUD Operations", () => {
  const auth: AuthCommandSDK = new AuthCommandSDK({
    appAPIKey,
    appId,
    enviornment,
  });

  const user = {
    name: (<any>faker).name.fullName(),
    password: (<any>faker).random.alpha(10),
    email: (<any>faker).internet.email().toLowerCase(),
    phone: (<any>faker).phone.number("##########"),
    appName: appName,
  };

  const fn = faker.name.firstName();
  const ln = faker.name.lastName();

  const newValues = {
    name: `${fn} ${ln}`,
    email: faker.internet.email(fn, ln).toLowerCase(),
  };

  let userId;

  test("can create user", async () => {
    const result = await auth.createUser(user);
    userId = result.data.id;
    expect(result.data.id).toBeTruthy();
  });
  test("can get user", async () => {
    expect(userId).toBeTruthy();
    const result = await auth.getUserById(userId);
    expect(result.data.name).toBe(user.name);
    expect(result.data.hiddenFields).toBeUndefined();
  });
  test("can get all users", async () => {
    const result = await auth.getAllUsers();
    expect(result.data.users.length).toBeGreaterThan(0);
  });
  test("can authenticate users", async () => {
    const result = await auth.authenticate(user.email, user.password);
    expect(result.data.id).toBe(userId);
    expect(result.data.email.toLowerCase()).toBe(user.email);
    expect(result.data.name).toBe(user.name);
  });
  test("can update user", async () => {
    const result = await auth.updateUser(userId, newValues);
    console.log(result);
    // expect(result.data.name).toBe(newValues.name);
    expect(result.data.email).toBe(newValues.email);
    expect(result.data.id).toBe(userId);
  }, 100000);
  test("can delete user", async () => {
    const result = await auth.deleteUser(userId);
    expect(result.status).toBe(200);
  });
});
