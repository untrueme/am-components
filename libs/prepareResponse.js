import fs from "fs";
import zlib from "zlib";
import util from "util";

const gzip = util.promisify(zlib.gzip);

const importReplacerRegexp = /((?:\bimport\b|\bexport\b)(?:[\w *{}\n,$]*?)['"])([^ ]*?)(['"](?:\s*);?)/gm;

function replacer(m, s, f, e) {
    let match = f.match(/^\/?([@\w-]*)(\/.*)?/);

    try {
        if (match[0] != "" && !match[0].endsWith('.js') && !match[0].endsWith('.ts')) {
            if (f.includes('/') && (f.endsWith('.js') || f.endsWith('.ts'))) {
                f = f;
            } else {
                let pj = JSON.parse(fs.readFileSync(process.cwd() + '/node_modules/' + match[0] + '/package.json', 'utf8'));
                let file = (pj.module || pj['jsnext:main']) || pj.main || match[1];
                f += '/' + file;
            }
        }
    } catch (err) {
        console.log(err);
    }

    if (f[0] !== '.' && f[0] !== '/') {
        return [s, '/', f, e].join('');
    } else {
        return [s, f, e].join('');
    }
}


export async function prepareResponse(path, options) {
    try {
        await fs.promises.access(path);

        if (options.mimeType == 'application/javascript') {
            const jsFile = await fs.promises.readFile(path, "utf8");
            const replased = jsFile.replace(importReplacerRegexp, replacer);
            const headers = {
                'Content-Type': `${options.mimeType}; charset=UTF-8`,
                'Content-Encoding': 'gzip',
                'X-Content-Type-Options': 'nosniff'
            };

            const buffer = Buffer.from(replased, 'utf-8');
            const data = await gzip(buffer);
            return { content: data, headers };
        } else {
            const c = fs.createReadStream(path);
            if (c) {
                const headers = {
                    'Content-Type': options.mimeType,
                    'X-Content-Type-Options': 'nosniff'
                };
                return { stream: c, headers };
            }
        }
    }
    catch (err) {
        console.log(err);
        return { notFound: true }
    }
}

