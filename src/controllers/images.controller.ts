import { Hono } from "hono";
import { validator as vValidator } from "hono-openapi/valibot";
import {
    array,
    object,
    string,
} from "valibot";
import { describeRoute } from "hono-openapi";

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




export const scrapImageController = new Hono()
    .get(
        "/",
        describeRoute({ description: "", tags: ["images"] }),
        vValidator("query", object({
            name: string()
        })),
        async (c) => {
            try {
                const { name } = c.req.valid("query");
                const searchData = await getImagesByQuery(name)
                const imagesUrls = searchData.results.map(r => r.thumbnail)

                return c.json(imagesUrls);
            } catch (error: any) {
                console.log("ERROR RUC INFO", error);
                throw new Error(error.message);
            }
        }
    )
    .post(
        "/list",
        describeRoute({
            description: "Get logs of upload products",
            tags: ["images"],
        }),
        vValidator(
            "json",
            array(string())
        ),
        async (c) => {
            const listSearch = c.req.valid("json");

            const results = []

            for (const searchQuery of listSearch) {
                const searchData = await getImagesByQuery(searchQuery)
                const imagesUrls = searchData.results.map(r => r.thumbnail)
                results.push(imagesUrls)
            }

            return c.json(results);
        }
    )