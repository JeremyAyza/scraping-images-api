


import { Hono } from "hono";
import { validator as vValidator } from "hono-openapi/valibot";
import {
    array,
    object,
    string,
} from "valibot";
import { describeRoute } from "hono-openapi";
import { HTTPException } from 'hono/http-exception'

async function getImagesByQuery(query: string) {
    // const query = 'Piqueo snax grande'
    const queryEncode = encodeURIComponent(query)
    const pageReq = await fetch(`https://duckduckgo.com/?q=${queryEncode}&iax=images&ia=images`)
    const pageContent = await pageReq.text()

    const vqd = pageContent.split('vqd="')[1].split('"')[0]
    const imagesReq = await fetch(`https://duckduckgo.com/i.js?o=json&q=${queryEncode}&l=us-en&p=1&vqd=${vqd}`)

    const imagesData: {
        "ads": null,
        "next": string,
        "query": string,
        "queryEncoded": string,
        "response_type": "images",
        "results": {
            "height": number,
            "image": string,
            "image_token": string,
            "source": "Bing",
            "thumbnail": string,
            "thumbnail_token": string,
            "title": string,
            "url": string,
            "width": number
        }[]
    }
        = await imagesReq.json()
    return imagesData
}




export const proxyImageController = new Hono()
    .get(
        "/",
        describeRoute({ description: "", tags: ["images"] }),
        vValidator("query", object({
            url: string()
        })),
        async (c) => {
            const {url} = c.req.valid('query')

            try {
                const response = await fetch(url, {
                    headers: {
                        // Puedes agregar encabezados personalizados aquí si es necesario
                        'Access-Control-Allow-Origin': '*',
                        'User-Agent': 'PostmanRuntime/7.37.3',
                        'Accept': '*/*',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Connection': 'keep-alive'
                    },

                });

                const data= await response.arrayBuffer()
                c.res.headers.set('Content-Type', response.headers.get('content-type')??'text/plain')
                c.res.headers.set( 'Access-Control-Allow-Origin','*' )
                return c.body(data)
            } catch (_error) {
                const error = _error as Error
                console.log(error);
                throw new HTTPException(400, { message: error.message })
                
            }
        }
    )