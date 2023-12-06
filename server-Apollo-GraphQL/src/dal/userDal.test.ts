import { expect, test, describe, afterAll } from "vitest";
import userDal from "./userDal.js";
import { config } from "dotenv";
config();

describe("User Data Access Layer Tests", () => {
  let createdUserId: string | undefined;

  test("should add a user to the database", async () => {
    const user = {
      email: "test@example.com",
      password: "testpassword",
    };
    const rowCount = await userDal.addUser(user);
   
    expect(rowCount).toBe(1);
  });

  test("should retrieve user by email from the database", async () => {
    const email = "test@example.com";
    const users = await userDal.getUserByEmail(email);

    expect(users).not.toBeUndefined();    
    expect(users.length).toBeGreaterThan(0);

    const userObj = users[0];
    expect(userObj.email).toEqual(email);
    createdUserId = userObj.userid;
  });

  test("should retrieve user by ID from the database", async () => {
    const userId = createdUserId;
    const user = await userDal.getUser(userId!);    

    expect(user).not.toBeUndefined();
    expect(user.rows.length).toBeGreaterThan(0);

    const userObj = user.rows[0];
    expect(userObj.userid).toEqual(userId);
  });


  afterAll(async () => {
    if (createdUserId!) {
      const deleteQuery = 'DELETE FROM users WHERE user_id = $1';
      const deleteValues = [createdUserId];
      const deleteRes = await userDal.sendQueryToDatabase(deleteQuery, deleteValues);
      expect(deleteRes.rowCount).toBe(1);
    }
  });
});
