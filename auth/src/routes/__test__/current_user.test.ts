import request from "supertest";
import { app } from "../../app"

it ("returns current user", async () => {
   const cookie = await global.getCookie();
   const response = await request(app)
    .post('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

    expect(response.body.current_user.email).toEqual("test@test.com");
});

it ("returns null when unauthed", async () => {
    const response = await request(app)
     .post('/api/users/currentuser')
     .send()
     .expect(200);

     expect(response.body.current_user.email).toEqual(null);
 });
