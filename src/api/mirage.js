import { createServer, Model, Response } from "miragejs";
import { api } from "./api";

export function makeServer({ environment = "development" } = {}) {
    let server = createServer({
        environment,
        routes() {
            this.post(api.postUser, (params) => {
                return Math.random() > 0.4 ? (new Response(200, {}, {
                    "result":{
                        "status":true,
                        "result":{
                            "formId":63,
                            "name":"name",
                        },
                        "message":[]
                    },
                    "data":{
                        "status":true,
                        "result":{
                            "formId":63,
                            "name":"media",
                            "fields":{}
                        },
                        "message":[]
                    },
                    "meta":{}
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
            });
        },
    });
    return server;
}