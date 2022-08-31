import request from "supertest";
import { app } from "../../app"

it ("returns 200 on successful email", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200);
});

it ("returns 400 on invalid email", async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test",
            password: "password"
        })
        .expect(400);
});

it ("returns 404 on unmatched email and password", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test1@test.com",
            password: "password1"
        })
        .expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test2@test.com",
            password: "password2"
        })
        .expect(400);
});

it ("returns 400 on invalid email", async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test",
            password: "password"
        })
        .expect(400);
});

it ("returns 404 on unmatched password", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test1@test.com",
            password: "password1"
        })
        .expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test1@test.com",
            password: "password2"
        })
        .expect(400);
});
