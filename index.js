import { web } from '@am/server';
import { findResources } from '@am/loader';
import path from "path";
import mime from "mime";
import { prepareResponse } from "./libs/prepareResponse.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function componentsHandler(context) {
    let file = await findResources(context.url);
    const resp = await prepareResponse(file[0], { mimeType: 'application/javascript' });

    context.headers(resp.headers);
    if (resp.content) {
        context.send(resp.content);
    }
}

async function initScriptsHandler(context) {
    let files = await findResources('components/initScripts.js');
    for(let i= 0; i < files.length; i++) {
        const resp = await prepareResponse(files[i], { mimeType: 'application/javascript' });

        context.headers(resp.headers);
        if (resp.content) {
            context.send(resp.content);
        }
    }
}

async function formsHandler(context) {
    try {
        let files = await findResources(context.url);
        const resp = await prepareResponse(files.reverse()[0], { mimeType: 'application/javascript' });

        context.headers(resp.headers);
        if (resp.content) {
            context.send(resp.content);
        }
    }
    catch (err){
        context.send(err);
    }
    
}


async function libFileHandler(context) {
    let rpath = [context.params.lib, context.params.dir, context.params['*'], context.params.file].filter(i => i).join('/');
    const x = rpath;
    if (x) {
        let path = `${process.cwd()}/node_modules/${[(x && x.path) || context.params.lib, context.params.dir, context.params['*'], context.params.file].filter(i => i).join('/')}`;
        if (path) {
            const match = path.match(/(\.[^\.\/]+)$/);
            if (!match) {
                path += '.js';
            }

            const mimeType = mime.getType(path);
            const contentType = mimeType?.split('/')[1] || 'javascript';
            const response = await prepareResponse(path, { contentType, mimeType });
            if (response.headers) context.headers(response.headers);
            if (response.content) context.send(response.content);
            else if (response.stream) context.send(response.stream);
        }
    } else {
        context.code(500);
        context.end();
    }
}

async function rootHandler(context) {
    const indexPath = path.join(__dirname, "static", "index.html");
    const resp = await prepareResponse(indexPath, { mimeType: 'text/html; charset=UTF-8' });
    context.headers(resp.headers);
    if (resp.stream) {
        context.send(resp.stream);
    }
}

async function staticHandler(context) {
    const staticPath = path.join(__dirname, context.url);
    let mimeType = mime.getType(staticPath);
    if (mimeType === 'image/vnd.microsoft.icon') {
        mimeType = 'image/x-icon';
    }
    if(mimeType === 'text/css') {
        mimeType = 'text/css; charset=UTF-8';
    }

    const contentType = mimeType?.split('/')[1] || 'javascript';
    const resp = await prepareResponse(staticPath, { contentType, mimeType });
    context.headers(resp.headers);
    if (resp.stream) {
        context.send(resp.stream);
    }

    if (resp.content) {
        context.send(resp.content);
    }
}

web.on('GET', '/', rootHandler);
web.on('GET', '/static/:lib', staticHandler)
web.on('GET', '/mixins/:lib', staticHandler)
web.on('GET', '/directives/:lib', staticHandler)
web.on('GET', '/components/initScripts', initScriptsHandler)
web.on('GET', '/components/:lib/:file', componentsHandler)
web.on('GET', '/forms/:file', formsHandler);
web.on('GET', '/:lib/:file', libFileHandler)
web.on('GET', '/:file', libFileHandler)
web.on('GET', '/:lib/:dir/*', libFileHandler)