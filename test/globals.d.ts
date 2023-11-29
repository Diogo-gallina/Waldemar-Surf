import { SuperTest, Test } from "supertest";

declare global {
  interface Global {
    var testRequest: SuperTest<Test>;
  }
}
