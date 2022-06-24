import { createServer, Response } from "miragejs";
import { api } from "./api";

export function makeServer({ environment = "development" } = {}) {
    let server = createServer({
        environment,
        routes() {
            this.post(api.postUser, (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                console.log(attrs);
                if (attrs.name) {
                    return schema.authors.create(attrs);
                } else {
                    return Math.random() > 0.4 ? (new Response(200, {}, {
                        "result": {
                            "status": true,
                            "result": {
                                "formId": 63,
                            },
                            "message": []
                        },
                        "data": {
                            "status": true,
                            "result": {
                                "formId": 63,
                            },
                            "message": []
                        },
                        "meta": {}
                    })) : (new Response(400, {}, {
                        "errors": [
                            {
                                "status": "404",
                                "source": {
                                    "pointer": "/callback"
                                },
                                "title": "Что-то пошло не так :-(",
                                "detail": "Произошла ошибка на сервере"
                            }
                        ]
                    }));
                }
            });
        },
    });
    return server;
}