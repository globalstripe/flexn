exports.id = 290;
exports.ids = [290];
exports.modules = {

/***/ 9436:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
exports.u = getPageHandler;
var _url = __webpack_require__(4269);
var _utils = __webpack_require__(9232);
var _sendPayload = __webpack_require__(9502);
var _utils1 = __webpack_require__(2056);
var _render = __webpack_require__(3100);
var _apiUtils = __webpack_require__(8612);
var _denormalizePagePath = __webpack_require__(562);
var _loadCustomRoutes = __webpack_require__(3997);
var _getRouteFromAssetPath = _interopRequireDefault(__webpack_require__(5714));
var _constants = __webpack_require__(6724);
var _renderResult = _interopRequireDefault(__webpack_require__(5071));
var _isError = _interopRequireDefault(__webpack_require__(676));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getPageHandler(ctx) {
    const { page , pageComponent , pageConfig , pageGetStaticProps , pageGetStaticPaths , pageGetServerSideProps , appModule , documentModule , errorModule , notFoundModule , encodedPreviewProps , pageIsDynamic , generateEtags , poweredByHeader , runtimeConfig , buildManifest , reactLoadableManifest , i18n , buildId , basePath , assetPrefix , canonicalBase , escapedBuildId ,  } = ctx;
    const { handleLocale , handleRewrites , handleBasePath , defaultRouteRegex , dynamicRouteMatcher , interpolateDynamicPath , getParamsFromRouteMatches , normalizeDynamicRouteParams , normalizeVercelUrl ,  } = (0, _utils1).getUtils(ctx);
    async function renderReqToHTML(req, res, renderMode, _renderOpts, _params) {
        let Component;
        let App;
        let config;
        let Document;
        let Error;
        let notFoundMod;
        let getStaticProps;
        let getStaticPaths;
        let getServerSideProps;
        [getStaticProps, getServerSideProps, getStaticPaths, Component, App, config, { default: Document  }, { default: Error  }, notFoundMod, ] = await Promise.all([
            pageGetStaticProps,
            pageGetServerSideProps,
            pageGetStaticPaths,
            pageComponent,
            appModule,
            pageConfig,
            documentModule,
            errorModule,
            notFoundModule, 
        ]);
        const fromExport = renderMode === 'export' || renderMode === true;
        const nextStartMode = renderMode === 'passthrough';
        let hasValidParams = true;
        (0, _apiUtils).setLazyProp({
            req: req
        }, 'cookies', (0, _apiUtils).getCookieParser(req.headers));
        const options = {
            App,
            Document,
            buildManifest,
            getStaticProps,
            getServerSideProps,
            getStaticPaths,
            reactLoadableManifest,
            canonicalBase,
            buildId,
            assetPrefix,
            runtimeConfig: (runtimeConfig || {
            }).publicRuntimeConfig || {
            },
            previewProps: encodedPreviewProps,
            env: process.env,
            basePath,
            supportsDynamicHTML: false,
            ..._renderOpts
        };
        let _nextData = false;
        let defaultLocale = i18n === null || i18n === void 0 ? void 0 : i18n.defaultLocale;
        let detectedLocale = i18n === null || i18n === void 0 ? void 0 : i18n.defaultLocale;
        let parsedUrl;
        try {
            var ref;
            // We need to trust the dynamic route params from the proxy
            // to ensure we are using the correct values
            const trustQuery = !getStaticProps && req.headers[_utils1.vercelHeader];
            parsedUrl = (0, _url).parse(req.url, true);
            let routeNoAssetPath = parsedUrl.pathname;
            if (basePath) {
                routeNoAssetPath = routeNoAssetPath.replace(new RegExp(`^${basePath}`), '') || '/';
            }
            const origQuery = Object.assign({
            }, parsedUrl.query);
            parsedUrl = handleRewrites(req, parsedUrl);
            handleBasePath(req, parsedUrl);
            // remove ?amp=1 from request URL if rendering for export
            if (fromExport && parsedUrl.query.amp) {
                const queryNoAmp = Object.assign({
                }, origQuery);
                delete queryNoAmp.amp;
                req.url = (0, _url).format({
                    ...parsedUrl,
                    search: undefined,
                    query: queryNoAmp
                });
            }
            if (parsedUrl.pathname.match(/_next\/data/)) {
                _nextData = page !== '/_error';
                parsedUrl.pathname = (0, _getRouteFromAssetPath).default(parsedUrl.pathname.replace(new RegExp(`/_next/data/${escapedBuildId}/`), '/'), '.json');
                routeNoAssetPath = parsedUrl.pathname;
            }
            const localeResult = handleLocale(req, res, parsedUrl, routeNoAssetPath, fromExport || nextStartMode);
            defaultLocale = (localeResult === null || localeResult === void 0 ? void 0 : localeResult.defaultLocale) || defaultLocale;
            detectedLocale = (localeResult === null || localeResult === void 0 ? void 0 : localeResult.detectedLocale) || detectedLocale;
            routeNoAssetPath = (localeResult === null || localeResult === void 0 ? void 0 : localeResult.routeNoAssetPath) || routeNoAssetPath;
            if (parsedUrl.query.nextInternalLocale) {
                detectedLocale = parsedUrl.query.nextInternalLocale;
                delete parsedUrl.query.nextInternalLocale;
            }
            const renderOpts = Object.assign({
                Component,
                pageConfig: config,
                nextExport: fromExport,
                isDataReq: _nextData,
                locales: i18n === null || i18n === void 0 ? void 0 : i18n.locales,
                locale: detectedLocale,
                defaultLocale,
                domainLocales: i18n === null || i18n === void 0 ? void 0 : i18n.domains,
                optimizeImages: false,
                optimizeCss: false,
                concurrentFeatures: false,
                crossOrigin: undefined
            }, options);
            if (page === '/_error' && !res.statusCode) {
                res.statusCode = 404;
            }
            let params = {
            };
            if (!fromExport && pageIsDynamic) {
                const result = normalizeDynamicRouteParams(trustQuery ? parsedUrl.query : dynamicRouteMatcher(parsedUrl.pathname));
                hasValidParams = result.hasValidParams;
                params = result.params;
            }
            let nowParams = null;
            if (pageIsDynamic && !hasValidParams && ((ref = req.headers) === null || ref === void 0 ? void 0 : ref['x-now-route-matches'])) {
                nowParams = getParamsFromRouteMatches(req, renderOpts, detectedLocale);
            }
            // make sure to set renderOpts to the correct params e.g. _params
            // if provided from worker or params if we're parsing them here
            renderOpts.params = _params || params;
            normalizeVercelUrl(req, !!trustQuery);
            // normalize request URL/asPath for fallback/revalidate pages since the
            // proxy sets the request URL to the output's path for fallback pages
            if (pageIsDynamic && nowParams && defaultRouteRegex) {
                const _parsedUrl = (0, _url).parse(req.url);
                _parsedUrl.pathname = interpolateDynamicPath(_parsedUrl.pathname, nowParams);
                parsedUrl.pathname = _parsedUrl.pathname;
                req.url = (0, _url).format(_parsedUrl);
            }
            // make sure to normalize asPath for revalidate and _next/data requests
            // since the asPath should match what is shown on the client
            if (!fromExport && (getStaticProps || getServerSideProps)) {
                // don't include dynamic route params in query while normalizing
                // asPath
                if (pageIsDynamic && trustQuery && defaultRouteRegex) {
                    delete parsedUrl.search;
                    for (const param of Object.keys(defaultRouteRegex.groups)){
                        delete origQuery[param];
                    }
                }
                parsedUrl.pathname = (0, _denormalizePagePath).denormalizePagePath(parsedUrl.pathname);
                renderOpts.resolvedUrl = (0, _url).format({
                    ...parsedUrl,
                    query: origQuery
                });
                // For getServerSideProps we need to ensure we use the original URL
                // and not the resolved URL to prevent a hydration mismatch on asPath
                renderOpts.resolvedAsPath = getServerSideProps ? (0, _url).format({
                    ...parsedUrl,
                    pathname: routeNoAssetPath,
                    query: origQuery
                }) : renderOpts.resolvedUrl;
            }
            const isFallback = parsedUrl.query.__nextFallback;
            const previewData = (0, _apiUtils).tryGetPreviewData(req, res, options.previewProps);
            const isPreviewMode = previewData !== false;
            if (true) {
                renderOpts.optimizeFonts = true;
                /**
         * __webpack_require__.__NEXT_FONT_MANIFEST__ is added by
         * font-stylesheet-gathering-plugin
         */ // @ts-ignore
                renderOpts.fontManifest = __webpack_require__.__NEXT_FONT_MANIFEST__;
            }
            let result = await (0, _render).renderToHTML(req, res, page, Object.assign({
            }, getStaticProps ? {
                ...parsedUrl.query.amp ? {
                    amp: '1'
                } : {
                }
            } : parsedUrl.query, nowParams ? nowParams : params, _params, isFallback ? {
                __nextFallback: 'true'
            } : {
            }), renderOpts);
            if (!renderMode) {
                if (_nextData || getStaticProps || getServerSideProps) {
                    if (renderOpts.isNotFound) {
                        res.statusCode = 404;
                        if (_nextData) {
                            res.end('{"notFound":true}');
                            return null;
                        }
                        const NotFoundComponent = notFoundMod ? notFoundMod.default : Error;
                        const errPathname = notFoundMod ? '/404' : '/_error';
                        const result2 = await (0, _render).renderToHTML(req, res, errPathname, parsedUrl.query, Object.assign({
                        }, options, {
                            getStaticProps: notFoundMod ? notFoundMod.getStaticProps : undefined,
                            getStaticPaths: undefined,
                            getServerSideProps: undefined,
                            Component: NotFoundComponent,
                            err: undefined,
                            locale: detectedLocale,
                            locales: i18n === null || i18n === void 0 ? void 0 : i18n.locales,
                            defaultLocale: i18n === null || i18n === void 0 ? void 0 : i18n.defaultLocale
                        }));
                        (0, _sendPayload).sendRenderResult({
                            req,
                            res,
                            result: result2 !== null && result2 !== void 0 ? result2 : _renderResult.default.empty,
                            type: 'html',
                            generateEtags,
                            poweredByHeader,
                            options: {
                                private: isPreviewMode || page === '/404',
                                stateful: !!getServerSideProps,
                                revalidate: renderOpts.revalidate
                            }
                        });
                        return null;
                    } else if (renderOpts.isRedirect && !_nextData) {
                        const redirect = {
                            destination: renderOpts.pageData.pageProps.__N_REDIRECT,
                            statusCode: renderOpts.pageData.pageProps.__N_REDIRECT_STATUS,
                            basePath: renderOpts.pageData.pageProps.__N_REDIRECT_BASE_PATH
                        };
                        const statusCode = (0, _loadCustomRoutes).getRedirectStatus(redirect);
                        if (basePath && redirect.basePath !== false && redirect.destination.startsWith('/')) {
                            redirect.destination = `${basePath}${redirect.destination}`;
                        }
                        if (statusCode === _constants.PERMANENT_REDIRECT_STATUS) {
                            res.setHeader('Refresh', `0;url=${redirect.destination}`);
                        }
                        res.statusCode = statusCode;
                        res.setHeader('Location', redirect.destination);
                        res.end(redirect.destination);
                        return null;
                    } else {
                        (0, _sendPayload).sendRenderResult({
                            req,
                            res,
                            result: _nextData ? _renderResult.default.fromStatic(JSON.stringify(renderOpts.pageData)) : result !== null && result !== void 0 ? result : _renderResult.default.empty,
                            type: _nextData ? 'json' : 'html',
                            generateEtags,
                            poweredByHeader,
                            options: {
                                private: isPreviewMode || renderOpts.is404Page,
                                stateful: !!getServerSideProps,
                                revalidate: renderOpts.revalidate
                            }
                        });
                        return null;
                    }
                }
            } else if (isPreviewMode) {
                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
            }
            if (renderMode) return {
                html: result,
                renderOpts
            };
            return result ? result.toUnchunkedString() : null;
        } catch (err) {
            if (!parsedUrl) {
                parsedUrl = (0, _url).parse(req.url, true);
            }
            if ((0, _isError).default(err) && err.code === 'ENOENT') {
                res.statusCode = 404;
            } else if (err instanceof _utils.DecodeError) {
                res.statusCode = 400;
            } else {
                console.error('Unhandled error during request:', err);
                // Backwards compat (call getInitialProps in custom error):
                try {
                    await (0, _render).renderToHTML(req, res, '/_error', parsedUrl.query, Object.assign({
                    }, options, {
                        getStaticProps: undefined,
                        getStaticPaths: undefined,
                        getServerSideProps: undefined,
                        Component: Error,
                        err: err,
                        // Short-circuit rendering:
                        isDataReq: true
                    }));
                } catch (underErrorErr) {
                    console.error('Failed call /_error subroutine, continuing to crash function:', underErrorErr);
                }
                // Throw the error to crash the serverless function
                if ((0, _utils).isResSent(res)) {
                    console.error('!!! WARNING !!!');
                    console.error('Your function crashed, but closed the response before allowing the function to exit.\\n' + 'This may cause unexpected behavior for the next request.');
                    console.error('!!! WARNING !!!');
                }
                throw err;
            }
            const result2 = await (0, _render).renderToHTML(req, res, '/_error', parsedUrl.query, Object.assign({
            }, options, {
                getStaticProps: undefined,
                getStaticPaths: undefined,
                getServerSideProps: undefined,
                Component: Error,
                err: res.statusCode === 404 ? undefined : err
            }));
            return result2 ? result2.toUnchunkedString() : null;
        }
    }
    return {
        renderReqToHTML,
        render: async function render(req, res) {
            try {
                const html = await renderReqToHTML(req, res);
                if (html) {
                    (0, _sendPayload).sendRenderResult({
                        req,
                        res,
                        result: _renderResult.default.fromStatic(html),
                        type: 'html',
                        generateEtags,
                        poweredByHeader
                    });
                }
            } catch (err) {
                console.error(err);
                // Throw the error to crash the serverless function
                throw err;
            }
        }
    };
}

//# sourceMappingURL=page-handler.js.map

/***/ }),

/***/ 2056:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getUtils = getUtils;
exports.vercelHeader = void 0;
var _url = __webpack_require__(4269);
var _querystring = __webpack_require__(9819);
var _normalizeLocalePath = __webpack_require__(4014);
var _pathMatch = _interopRequireDefault(__webpack_require__(5753));
var _routeRegex = __webpack_require__(5052);
var _routeMatcher = __webpack_require__(4226);
var _prepareDestination = __webpack_require__(9521);
var _acceptHeader = __webpack_require__(600);
var _detectLocaleCookie = __webpack_require__(2374);
var _detectDomainLocale = __webpack_require__(3539);
var _denormalizePagePath = __webpack_require__(562);
var _cookie = _interopRequireDefault(__webpack_require__(738));
var _constants = __webpack_require__(6724);
var _requestMeta = __webpack_require__(2779);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getCustomRouteMatcher = (0, _pathMatch).default(true);
const vercelHeader = 'x-vercel-id';
exports.vercelHeader = vercelHeader;
function getUtils({ page , i18n , basePath , rewrites , pageIsDynamic  }) {
    let defaultRouteRegex;
    let dynamicRouteMatcher;
    let defaultRouteMatches;
    if (pageIsDynamic) {
        defaultRouteRegex = (0, _routeRegex).getRouteRegex(page);
        dynamicRouteMatcher = (0, _routeMatcher).getRouteMatcher(defaultRouteRegex);
        defaultRouteMatches = dynamicRouteMatcher(page);
    }
    function handleRewrites(req, parsedUrl) {
        for (const rewrite of rewrites){
            const matcher = getCustomRouteMatcher(rewrite.source);
            let params = matcher(parsedUrl.pathname);
            if (rewrite.has && params) {
                const hasParams = (0, _prepareDestination).matchHas(req, rewrite.has, parsedUrl.query);
                if (hasParams) {
                    Object.assign(params, hasParams);
                } else {
                    params = false;
                }
            }
            if (params) {
                const { parsedDestination  } = (0, _prepareDestination).prepareDestination({
                    appendParamsToQuery: true,
                    destination: rewrite.destination,
                    params: params,
                    query: parsedUrl.query
                });
                Object.assign(parsedUrl.query, parsedDestination.query);
                delete parsedDestination.query;
                Object.assign(parsedUrl, parsedDestination);
                let fsPathname = parsedUrl.pathname;
                if (basePath) {
                    fsPathname = fsPathname.replace(new RegExp(`^${basePath}`), '') || '/';
                }
                if (i18n) {
                    const destLocalePathResult = (0, _normalizeLocalePath).normalizeLocalePath(fsPathname, i18n.locales);
                    fsPathname = destLocalePathResult.pathname;
                    parsedUrl.query.nextInternalLocale = destLocalePathResult.detectedLocale || params.nextInternalLocale;
                }
                if (fsPathname === page) {
                    break;
                }
                if (pageIsDynamic && dynamicRouteMatcher) {
                    const dynamicParams = dynamicRouteMatcher(fsPathname);
                    if (dynamicParams) {
                        parsedUrl.query = {
                            ...parsedUrl.query,
                            ...dynamicParams
                        };
                        break;
                    }
                }
            }
        }
        return parsedUrl;
    }
    function handleBasePath(req, parsedUrl) {
        // always strip the basePath if configured since it is required
        req.url = req.url.replace(new RegExp(`^${basePath}`), '') || '/';
        parsedUrl.pathname = parsedUrl.pathname.replace(new RegExp(`^${basePath}`), '') || '/';
    }
    function getParamsFromRouteMatches(req, renderOpts, detectedLocale) {
        return (0, _routeMatcher).getRouteMatcher(function() {
            const { groups , routeKeys  } = defaultRouteRegex;
            return {
                re: {
                    // Simulate a RegExp match from the \`req.url\` input
                    exec: (str)=>{
                        const obj = (0, _querystring).parse(str);
                        // favor named matches if available
                        const routeKeyNames = Object.keys(routeKeys || {
                        });
                        const filterLocaleItem = (val)=>{
                            if (i18n) {
                                // locale items can be included in route-matches
                                // for fallback SSG pages so ensure they are
                                // filtered
                                const isCatchAll = Array.isArray(val);
                                const _val = isCatchAll ? val[0] : val;
                                if (typeof _val === 'string' && i18n.locales.some((item)=>{
                                    if (item.toLowerCase() === _val.toLowerCase()) {
                                        detectedLocale = item;
                                        renderOpts.locale = detectedLocale;
                                        return true;
                                    }
                                    return false;
                                })) {
                                    // remove the locale item from the match
                                    if (isCatchAll) {
                                        val.splice(0, 1);
                                    }
                                    // the value is only a locale item and
                                    // shouldn't be added
                                    return isCatchAll ? val.length === 0 : true;
                                }
                            }
                            return false;
                        };
                        if (routeKeyNames.every((name)=>obj[name]
                        )) {
                            return routeKeyNames.reduce((prev, keyName)=>{
                                const paramName = routeKeys === null || routeKeys === void 0 ? void 0 : routeKeys[keyName];
                                if (paramName && !filterLocaleItem(obj[keyName])) {
                                    prev[groups[paramName].pos] = obj[keyName];
                                }
                                return prev;
                            }, {
                            });
                        }
                        return Object.keys(obj).reduce((prev, key)=>{
                            if (!filterLocaleItem(obj[key])) {
                                return Object.assign(prev, {
                                    [key]: obj[key]
                                });
                            }
                            return prev;
                        }, {
                        });
                    }
                },
                groups
            };
        }())(req.headers['x-now-route-matches']);
    }
    function interpolateDynamicPath(pathname, params) {
        if (!defaultRouteRegex) return pathname;
        for (const param of Object.keys(defaultRouteRegex.groups)){
            const { optional , repeat  } = defaultRouteRegex.groups[param];
            let builtParam = `[${repeat ? '...' : ''}${param}]`;
            if (optional) {
                builtParam = `[${builtParam}]`;
            }
            const paramIdx = pathname.indexOf(builtParam);
            if (paramIdx > -1) {
                let paramValue;
                if (Array.isArray(params[param])) {
                    paramValue = params[param].map((v)=>v && encodeURIComponent(v)
                    ).join('/');
                } else {
                    paramValue = params[param] && encodeURIComponent(params[param]);
                }
                pathname = pathname.substr(0, paramIdx) + (paramValue || '') + pathname.substr(paramIdx + builtParam.length);
            }
        }
        return pathname;
    }
    function normalizeVercelUrl(req, trustQuery) {
        // make sure to normalize req.url on Vercel to strip dynamic params
        // from the query which are added during routing
        if (pageIsDynamic && trustQuery && defaultRouteRegex) {
            const _parsedUrl = (0, _url).parse(req.url, true);
            delete _parsedUrl.search;
            for (const param of Object.keys(defaultRouteRegex.groups)){
                delete _parsedUrl.query[param];
            }
            req.url = (0, _url).format(_parsedUrl);
        }
    }
    function normalizeDynamicRouteParams(params) {
        let hasValidParams = true;
        if (!defaultRouteRegex) return {
            params,
            hasValidParams: false
        };
        params = Object.keys(defaultRouteRegex.groups).reduce((prev, key)=>{
            let value = params[key];
            // if the value matches the default value we can't rely
            // on the parsed params, this is used to signal if we need
            // to parse x-now-route-matches or not
            const defaultValue = defaultRouteMatches[key];
            const isDefaultValue = Array.isArray(defaultValue) ? defaultValue.some((defaultVal)=>{
                return Array.isArray(value) ? value.some((val)=>val.includes(defaultVal)
                ) : value === null || value === void 0 ? void 0 : value.includes(defaultVal);
            }) : value === null || value === void 0 ? void 0 : value.includes(defaultValue);
            if (isDefaultValue || typeof value === 'undefined') {
                hasValidParams = false;
            }
            // non-provided optional values should be undefined so normalize
            // them to undefined
            if (defaultRouteRegex.groups[key].optional && (!value || Array.isArray(value) && value.length === 1 && // fallback optional catch-all SSG pages have
            // [[...paramName]] for the root path on Vercel
            (value[0] === 'index' || value[0] === `[[...${key}]]`))) {
                value = undefined;
                delete params[key];
            }
            // query values from the proxy aren't already split into arrays
            // so make sure to normalize catch-all values
            if (value && typeof value === 'string' && defaultRouteRegex.groups[key].repeat) {
                value = value.split('/');
            }
            if (value) {
                prev[key] = value;
            }
            return prev;
        }, {
        });
        return {
            params,
            hasValidParams
        };
    }
    function handleLocale(req, res, parsedUrl, routeNoAssetPath, shouldNotRedirect) {
        if (!i18n) return;
        const pathname = parsedUrl.pathname || '/';
        let defaultLocale = i18n.defaultLocale;
        let detectedLocale = (0, _detectLocaleCookie).detectLocaleCookie(req, i18n.locales);
        let acceptPreferredLocale;
        try {
            acceptPreferredLocale = i18n.localeDetection !== false ? (0, _acceptHeader).acceptLanguage(req.headers['accept-language'], i18n.locales) : detectedLocale;
        } catch (_) {
            acceptPreferredLocale = detectedLocale;
        }
        const { host  } = req.headers || {
        };
        // remove port from host and remove port if present
        const hostname = host && host.split(':')[0].toLowerCase();
        const detectedDomain = (0, _detectDomainLocale).detectDomainLocale(i18n.domains, hostname);
        if (detectedDomain) {
            defaultLocale = detectedDomain.defaultLocale;
            detectedLocale = defaultLocale;
            (0, _requestMeta).addRequestMeta(req, '__nextIsLocaleDomain', true);
        }
        // if not domain specific locale use accept-language preferred
        detectedLocale = detectedLocale || acceptPreferredLocale;
        let localeDomainRedirect;
        const localePathResult = (0, _normalizeLocalePath).normalizeLocalePath(pathname, i18n.locales);
        routeNoAssetPath = (0, _normalizeLocalePath).normalizeLocalePath(routeNoAssetPath, i18n.locales).pathname;
        if (localePathResult.detectedLocale) {
            detectedLocale = localePathResult.detectedLocale;
            req.url = (0, _url).format({
                ...parsedUrl,
                pathname: localePathResult.pathname
            });
            (0, _requestMeta).addRequestMeta(req, '__nextStrippedLocale', true);
            parsedUrl.pathname = localePathResult.pathname;
        }
        // If a detected locale is a domain specific locale and we aren't already
        // on that domain and path prefix redirect to it to prevent duplicate
        // content from multiple domains
        if (detectedDomain) {
            const localeToCheck = localePathResult.detectedLocale ? detectedLocale : acceptPreferredLocale;
            const matchedDomain = (0, _detectDomainLocale).detectDomainLocale(i18n.domains, undefined, localeToCheck);
            if (matchedDomain && matchedDomain.domain !== detectedDomain.domain) {
                localeDomainRedirect = `http${matchedDomain.http ? '' : 's'}://${matchedDomain.domain}/${localeToCheck === matchedDomain.defaultLocale ? '' : localeToCheck}`;
            }
        }
        const denormalizedPagePath = (0, _denormalizePagePath).denormalizePagePath(pathname);
        const detectedDefaultLocale = !detectedLocale || detectedLocale.toLowerCase() === defaultLocale.toLowerCase();
        const shouldStripDefaultLocale = false;
        // detectedDefaultLocale &&
        // denormalizedPagePath.toLowerCase() === \`/\${i18n.defaultLocale.toLowerCase()}\`
        const shouldAddLocalePrefix = !detectedDefaultLocale && denormalizedPagePath === '/';
        detectedLocale = detectedLocale || i18n.defaultLocale;
        if (!shouldNotRedirect && !req.headers[vercelHeader] && i18n.localeDetection !== false && (localeDomainRedirect || shouldAddLocalePrefix || shouldStripDefaultLocale)) {
            // set the NEXT_LOCALE cookie when a user visits the default locale
            // with the locale prefix so that they aren't redirected back to
            // their accept-language preferred locale
            if (shouldStripDefaultLocale && acceptPreferredLocale !== defaultLocale) {
                const previous = res.getHeader('set-cookie');
                res.setHeader('set-cookie', [
                    ...typeof previous === 'string' ? [
                        previous
                    ] : Array.isArray(previous) ? previous : [],
                    _cookie.default.serialize('NEXT_LOCALE', defaultLocale, {
                        httpOnly: true,
                        path: '/'
                    }), 
                ]);
            }
            res.setHeader('Location', (0, _url).format({
                // make sure to include any query values when redirecting
                ...parsedUrl,
                pathname: localeDomainRedirect ? localeDomainRedirect : shouldStripDefaultLocale ? basePath || '/' : `${basePath}/${detectedLocale}`
            }));
            res.statusCode = _constants.TEMPORARY_REDIRECT_STATUS;
            res.end();
            return;
        }
        detectedLocale = localePathResult.detectedLocale || detectedDomain && detectedDomain.defaultLocale || defaultLocale;
        return {
            defaultLocale,
            detectedLocale,
            routeNoAssetPath
        };
    }
    return {
        handleLocale,
        handleRewrites,
        handleBasePath,
        defaultRouteRegex,
        normalizeVercelUrl,
        dynamicRouteMatcher,
        defaultRouteMatches,
        interpolateDynamicPath,
        getParamsFromRouteMatches,
        normalizeDynamicRouteParams
    };
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 6007:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.isEqualNode = isEqualNode;
exports["default"] = initHeadManager;
exports.DOMAttributeNames = void 0;
const DOMAttributeNames = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',
    noModule: 'noModule'
};
exports.DOMAttributeNames = DOMAttributeNames;
function reactElementToDOM({ type , props  }) {
    const el = document.createElement(type);
    for(const p in props){
        if (!props.hasOwnProperty(p)) continue;
        if (p === 'children' || p === 'dangerouslySetInnerHTML') continue;
        // we don't render undefined props to the DOM
        if (props[p] === undefined) continue;
        const attr = DOMAttributeNames[p] || p.toLowerCase();
        if (type === 'script' && (attr === 'async' || attr === 'defer' || attr === 'noModule')) {
            el[attr] = !!props[p];
        } else {
            el.setAttribute(attr, props[p]);
        }
    }
    const { children , dangerouslySetInnerHTML  } = props;
    if (dangerouslySetInnerHTML) {
        el.innerHTML = dangerouslySetInnerHTML.__html || '';
    } else if (children) {
        el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
    }
    return el;
}
function isEqualNode(oldTag, newTag) {
    if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
        const nonce = newTag.getAttribute('nonce');
        // Only strip the nonce if `oldTag` has had it stripped. An element's nonce attribute will not
        // be stripped if there is no content security policy response header that includes a nonce.
        if (nonce && !oldTag.getAttribute('nonce')) {
            const cloneTag = newTag.cloneNode(true);
            cloneTag.setAttribute('nonce', '');
            cloneTag.nonce = nonce;
            return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
        }
    }
    return oldTag.isEqualNode(newTag);
}
function updateElements(type, components) {
    const headEl = document.getElementsByTagName('head')[0];
    const headCountEl = headEl.querySelector('meta[name=next-head-count]');
    if (false) {}
    const headCount = Number(headCountEl.content);
    const oldTags = [];
    for(let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j === null || j === void 0 ? void 0 : j.previousElementSibling) || null){
        var ref;
        if ((j === null || j === void 0 ? void 0 : (ref = j.tagName) === null || ref === void 0 ? void 0 : ref.toLowerCase()) === type) {
            oldTags.push(j);
        }
    }
    const newTags = components.map(reactElementToDOM).filter((newTag)=>{
        for(let k = 0, len = oldTags.length; k < len; k++){
            const oldTag = oldTags[k];
            if (isEqualNode(oldTag, newTag)) {
                oldTags.splice(k, 1);
                return false;
            }
        }
        return true;
    });
    oldTags.forEach((t)=>{
        var ref;
        return (ref = t.parentNode) === null || ref === void 0 ? void 0 : ref.removeChild(t);
    });
    newTags.forEach((t)=>headEl.insertBefore(t, headCountEl)
    );
    headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
}
function initHeadManager() {
    let updatePromise = null;
    return {
        mountedInstances: new Set(),
        updateHead: (head)=>{
            const promise = updatePromise = Promise.resolve().then(()=>{
                if (promise !== updatePromise) return;
                updatePromise = null;
                const tags = {};
                head.forEach((h)=>{
                    if (// it won't be inlined. In this case revert to the original behavior
                    h.type === 'link' && h.props['data-optimized-fonts']) {
                        if (document.querySelector(`style[data-href="${h.props['data-href']}"]`)) {
                            return;
                        } else {
                            h.props.href = h.props['data-href'];
                            h.props['data-href'] = undefined;
                        }
                    }
                    const components = tags[h.type] || [];
                    components.push(h);
                    tags[h.type] = components;
                });
                const titleComponent = tags.title ? tags.title[0] : null;
                let title = '';
                if (titleComponent) {
                    const { children  } = titleComponent.props;
                    title = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
                }
                if (title !== document.title) document.title = title;
                [
                    'meta',
                    'base',
                    'link',
                    'style',
                    'script'
                ].forEach((type)=>{
                    updateElements(type, tags[type] || []);
                });
            });
        }
    };
} //# sourceMappingURL=head-manager.js.map


/***/ }),

/***/ 9311:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;
const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
exports.requestIdleCallback = requestIdleCallback;
const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
exports.cancelIdleCallback = cancelIdleCallback; //# sourceMappingURL=request-idle-callback.js.map


/***/ }),

/***/ 699:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.initScriptLoader = initScriptLoader;
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(6689));
var _headManagerContext = __webpack_require__(2796);
var _headManager = __webpack_require__(6007);
var _requestIdleCallback = __webpack_require__(9311);
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
const ScriptCache = new Map();
const LoadCache = new Set();
const ignoreProps = [
    'onLoad',
    'dangerouslySetInnerHTML',
    'children',
    'onError',
    'strategy', 
];
const loadScript = (props)=>{
    const { src , id , onLoad =()=>{} , dangerouslySetInnerHTML , children ='' , strategy ='afterInteractive' , onError ,  } = props;
    const cacheKey = id || src;
    // Script has already loaded
    if (cacheKey && LoadCache.has(cacheKey)) {
        return;
    }
    // Contents of this script are already loading/loaded
    if (ScriptCache.has(src)) {
        LoadCache.add(cacheKey);
        // Execute onLoad since the script loading has begun
        ScriptCache.get(src).then(onLoad, onError);
        return;
    }
    const el = document.createElement('script');
    const loadPromise = new Promise((resolve, reject)=>{
        el.addEventListener('load', function(e) {
            resolve();
            if (onLoad) {
                onLoad.call(this, e);
            }
        });
        el.addEventListener('error', function(e) {
            reject(e);
        });
    }).catch(function(e) {
        if (onError) {
            onError(e);
        }
    });
    if (src) {
        ScriptCache.set(src, loadPromise);
    }
    LoadCache.add(cacheKey);
    if (dangerouslySetInnerHTML) {
        el.innerHTML = dangerouslySetInnerHTML.__html || '';
    } else if (children) {
        el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
    } else if (src) {
        el.src = src;
    }
    for (const [k, value] of Object.entries(props)){
        if (value === undefined || ignoreProps.includes(k)) {
            continue;
        }
        const attr = _headManager.DOMAttributeNames[k] || k.toLowerCase();
        el.setAttribute(attr, value);
    }
    el.setAttribute('data-nscript', strategy);
    document.body.appendChild(el);
};
function handleClientScriptLoad(props) {
    const { strategy ='afterInteractive'  } = props;
    if (strategy === 'afterInteractive') {
        loadScript(props);
    } else if (strategy === 'lazyOnload') {
        window.addEventListener('load', ()=>{
            (0, _requestIdleCallback).requestIdleCallback(()=>loadScript(props)
            );
        });
    }
}
function loadLazyScript(props) {
    if (document.readyState === 'complete') {
        (0, _requestIdleCallback).requestIdleCallback(()=>loadScript(props)
        );
    } else {
        window.addEventListener('load', ()=>{
            (0, _requestIdleCallback).requestIdleCallback(()=>loadScript(props)
            );
        });
    }
}
function initScriptLoader(scriptLoaderItems) {
    scriptLoaderItems.forEach(handleClientScriptLoad);
}
function Script(props) {
    const { src ='' , onLoad =()=>{} , dangerouslySetInnerHTML , strategy ='afterInteractive' , onError  } = props, restProps = _objectWithoutProperties(props, [
        "src",
        "onLoad",
        "dangerouslySetInnerHTML",
        "strategy",
        "onError"
    ]);
    // Context is available only during SSR
    const { updateScripts , scripts , getIsSsr  } = (0, _react).useContext(_headManagerContext.HeadManagerContext);
    (0, _react).useEffect(()=>{
        if (strategy === 'afterInteractive') {
            loadScript(props);
        } else if (strategy === 'lazyOnload') {
            loadLazyScript(props);
        }
    }, [
        props,
        strategy
    ]);
    if (strategy === 'beforeInteractive') {
        if (updateScripts) {
            scripts.beforeInteractive = (scripts.beforeInteractive || []).concat([
                _objectSpread({
                    src,
                    onLoad,
                    onError
                }, restProps), 
            ]);
            updateScripts(scripts);
        } else if (getIsSsr && getIsSsr()) {
            // Script has already loaded during SSR
            LoadCache.add(restProps.id || src);
        } else if (getIsSsr && !getIsSsr()) {
            loadScript(props);
        }
    }
    return null;
}
var _default = Script;
exports["default"] = _default; //# sourceMappingURL=script.js.map


/***/ }),

/***/ 3105:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "DocumentContext", ({
    enumerable: true,
    get: function() {
        return _utils.DocumentContext;
    }
}));
Object.defineProperty(exports, "DocumentInitialProps", ({
    enumerable: true,
    get: function() {
        return _utils.DocumentInitialProps;
    }
}));
Object.defineProperty(exports, "DocumentProps", ({
    enumerable: true,
    get: function() {
        return _utils.DocumentProps;
    }
}));
exports.Html = Html;
exports.Main = Main;
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(6689));
var _constants = __webpack_require__(6724);
var _utils = __webpack_require__(9232);
var _getPageFiles = __webpack_require__(4140);
var _utils1 = __webpack_require__(6368);
var _htmlescape = __webpack_require__(9716);
var _script = _interopRequireDefault(__webpack_require__(699));
var _isError = _interopRequireDefault(__webpack_require__(676));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
function getDocumentFiles(buildManifest, pathname, inAmpMode) {
    const sharedFiles = (0, _getPageFiles).getPageFiles(buildManifest, '/_app');
    const pageFiles = inAmpMode ? [] : (0, _getPageFiles).getPageFiles(buildManifest, pathname);
    return {
        sharedFiles,
        pageFiles,
        allFiles: [
            ...new Set([
                ...sharedFiles,
                ...pageFiles
            ])
        ]
    };
}
function getPolyfillScripts(context, props) {
    // polyfills.js has to be rendered as nomodule without async
    // It also has to be the first script to load
    const { assetPrefix , buildManifest , devOnlyCacheBusterQueryString , disableOptimizedLoading , crossOrigin ,  } = context;
    return buildManifest.polyfillFiles.filter((polyfill)=>polyfill.endsWith('.js') && !polyfill.endsWith('.module.js')
    ).map((polyfill)=>/*#__PURE__*/ _react.default.createElement("script", {
            key: polyfill,
            defer: !disableOptimizedLoading,
            nonce: props.nonce,
            crossOrigin: props.crossOrigin || crossOrigin,
            noModule: true,
            src: `${assetPrefix}/_next/${polyfill}${devOnlyCacheBusterQueryString}`
        })
    );
}
function getPreNextScripts(context, props) {
    const { scriptLoader , disableOptimizedLoading , crossOrigin  } = context;
    return (scriptLoader.beforeInteractive || []).map((file, index)=>{
        const { strategy , ...scriptProps } = file;
        return(/*#__PURE__*/ _react.default.createElement("script", Object.assign({}, scriptProps, {
            key: scriptProps.src || index,
            defer: !disableOptimizedLoading,
            nonce: props.nonce,
            "data-nscript": "beforeInteractive",
            crossOrigin: props.crossOrigin || crossOrigin
        })));
    });
}
function getDynamicChunks(context, props, files) {
    const { dynamicImports , assetPrefix , isDevelopment , devOnlyCacheBusterQueryString , disableOptimizedLoading , crossOrigin ,  } = context;
    return dynamicImports.map((file)=>{
        if (!file.endsWith('.js') || files.allFiles.includes(file)) return null;
        return(/*#__PURE__*/ _react.default.createElement("script", {
            async: !isDevelopment && disableOptimizedLoading,
            defer: !disableOptimizedLoading,
            key: file,
            src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
            nonce: props.nonce,
            crossOrigin: props.crossOrigin || crossOrigin
        }));
    });
}
function getScripts(context, props, files) {
    var ref;
    const { assetPrefix , buildManifest , isDevelopment , devOnlyCacheBusterQueryString , disableOptimizedLoading , crossOrigin ,  } = context;
    const normalScripts = files.allFiles.filter((file)=>file.endsWith('.js')
    );
    const lowPriorityScripts = (ref = buildManifest.lowPriorityFiles) === null || ref === void 0 ? void 0 : ref.filter((file)=>file.endsWith('.js')
    );
    return [
        ...normalScripts,
        ...lowPriorityScripts
    ].map((file)=>{
        return(/*#__PURE__*/ _react.default.createElement("script", {
            key: file,
            src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
            nonce: props.nonce,
            async: !isDevelopment && disableOptimizedLoading,
            defer: !disableOptimizedLoading,
            crossOrigin: props.crossOrigin || crossOrigin
        }));
    });
}
class Document extends _react.Component {
    /**
   * `getInitialProps` hook returns the context object with the addition of `renderPage`.
   * `renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers
   */ static getInitialProps(ctx) {
        return ctx.defaultGetInitialProps(ctx);
    }
    render() {
        return(/*#__PURE__*/ _react.default.createElement(Html, null, /*#__PURE__*/ _react.default.createElement(Head, null), /*#__PURE__*/ _react.default.createElement("body", null, /*#__PURE__*/ _react.default.createElement(Main, null), /*#__PURE__*/ _react.default.createElement(NextScript, null))));
    }
}
exports["default"] = Document;
function Html(props) {
    const { inAmpMode , docComponentsRendered , locale  } = (0, _react).useContext(_utils.HtmlContext);
    docComponentsRendered.Html = true;
    return(/*#__PURE__*/ _react.default.createElement("html", Object.assign({}, props, {
        lang: props.lang || locale || undefined,
        amp: inAmpMode ? '' : undefined,
        "data-ampdevmode": inAmpMode && "production" !== 'production' ? 0 : undefined
    })));
}
function AmpStyles({ styles  }) {
    if (!styles) return null;
    // try to parse styles from fragment for backwards compat
    const curStyles = Array.isArray(styles) ? styles : [];
    if (styles.props && Array.isArray(styles.props.children)) {
        const hasStyles = (el)=>{
            var ref, ref1;
            return el === null || el === void 0 ? void 0 : (ref = el.props) === null || ref === void 0 ? void 0 : (ref1 = ref.dangerouslySetInnerHTML) === null || ref1 === void 0 ? void 0 : ref1.__html;
        };
        // @ts-ignore Property 'props' does not exist on type ReactElement
        styles.props.children.forEach((child)=>{
            if (Array.isArray(child)) {
                child.forEach((el)=>hasStyles(el) && curStyles.push(el)
                );
            } else if (hasStyles(child)) {
                curStyles.push(child);
            }
        });
    }
    /* Add custom styles before AMP styles to prevent accidental overrides */ return(/*#__PURE__*/ _react.default.createElement("style", {
        "amp-custom": "",
        dangerouslySetInnerHTML: {
            __html: curStyles.map((style)=>style.props.dangerouslySetInnerHTML.__html
            ).join('').replace(/\/\*# sourceMappingURL=.*\*\//g, '').replace(/\/\*@ sourceURL=.*?\*\//g, '')
        }
    }));
}
class Head extends _react.Component {
    getCssLinks(files) {
        const { assetPrefix , devOnlyCacheBusterQueryString , dynamicImports , crossOrigin , optimizeCss , optimizeFonts ,  } = this.context;
        const cssFiles = files.allFiles.filter((f)=>f.endsWith('.css')
        );
        const sharedFiles = new Set(files.sharedFiles);
        // Unmanaged files are CSS files that will be handled directly by the
        // webpack runtime (`mini-css-extract-plugin`).
        let unmangedFiles = new Set([]);
        let dynamicCssFiles = Array.from(new Set(dynamicImports.filter((file)=>file.endsWith('.css')
        )));
        if (dynamicCssFiles.length) {
            const existing = new Set(cssFiles);
            dynamicCssFiles = dynamicCssFiles.filter((f)=>!(existing.has(f) || sharedFiles.has(f))
            );
            unmangedFiles = new Set(dynamicCssFiles);
            cssFiles.push(...dynamicCssFiles);
        }
        let cssLinkElements = [];
        cssFiles.forEach((file)=>{
            const isSharedFile = sharedFiles.has(file);
            if (!optimizeCss) {
                cssLinkElements.push(/*#__PURE__*/ _react.default.createElement("link", {
                    key: `${file}-preload`,
                    nonce: this.props.nonce,
                    rel: "preload",
                    href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
                    as: "style",
                    crossOrigin: this.props.crossOrigin || crossOrigin
                }));
            }
            const isUnmanagedFile = unmangedFiles.has(file);
            cssLinkElements.push(/*#__PURE__*/ _react.default.createElement("link", {
                key: file,
                nonce: this.props.nonce,
                rel: "stylesheet",
                href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
                crossOrigin: this.props.crossOrigin || crossOrigin,
                "data-n-g": isUnmanagedFile ? undefined : isSharedFile ? '' : undefined,
                "data-n-p": isUnmanagedFile ? undefined : isSharedFile ? undefined : ''
            }));
        });
        if ( true && optimizeFonts) {
            cssLinkElements = this.makeStylesheetInert(cssLinkElements);
        }
        return cssLinkElements.length === 0 ? null : cssLinkElements;
    }
    getPreloadDynamicChunks() {
        const { dynamicImports , assetPrefix , devOnlyCacheBusterQueryString , crossOrigin ,  } = this.context;
        return dynamicImports.map((file)=>{
            if (!file.endsWith('.js')) {
                return null;
            }
            return(/*#__PURE__*/ _react.default.createElement("link", {
                rel: "preload",
                key: file,
                href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
                as: "script",
                nonce: this.props.nonce,
                crossOrigin: this.props.crossOrigin || crossOrigin
            }));
        }) // Filter out nulled scripts
        .filter(Boolean);
    }
    getPreloadMainLinks(files) {
        const { assetPrefix , devOnlyCacheBusterQueryString , scriptLoader , crossOrigin ,  } = this.context;
        const preloadFiles = files.allFiles.filter((file)=>{
            return file.endsWith('.js');
        });
        return [
            ...(scriptLoader.beforeInteractive || []).map((file)=>/*#__PURE__*/ _react.default.createElement("link", {
                    key: file.src,
                    nonce: this.props.nonce,
                    rel: "preload",
                    href: file.src,
                    as: "script",
                    crossOrigin: this.props.crossOrigin || crossOrigin
                })
            ),
            ...preloadFiles.map((file)=>/*#__PURE__*/ _react.default.createElement("link", {
                    key: file,
                    nonce: this.props.nonce,
                    rel: "preload",
                    href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
                    as: "script",
                    crossOrigin: this.props.crossOrigin || crossOrigin
                })
            ), 
        ];
    }
    getDynamicChunks(files) {
        return getDynamicChunks(this.context, this.props, files);
    }
    getPreNextScripts() {
        return getPreNextScripts(this.context, this.props);
    }
    getScripts(files) {
        return getScripts(this.context, this.props, files);
    }
    getPolyfillScripts() {
        return getPolyfillScripts(this.context, this.props);
    }
    handleDocumentScriptLoaderItems(children) {
        const { scriptLoader  } = this.context;
        const scriptLoaderItems = [];
        const filteredChildren = [];
        _react.default.Children.forEach(children, (child)=>{
            if (child.type === _script.default) {
                if (child.props.strategy === 'beforeInteractive') {
                    scriptLoader.beforeInteractive = (scriptLoader.beforeInteractive || []).concat([
                        {
                            ...child.props
                        }, 
                    ]);
                    return;
                } else if ([
                    'lazyOnload',
                    'afterInteractive'
                ].includes(child.props.strategy)) {
                    scriptLoaderItems.push(child.props);
                    return;
                }
            }
            filteredChildren.push(child);
        });
        this.context.__NEXT_DATA__.scriptLoader = scriptLoaderItems;
        return filteredChildren;
    }
    makeStylesheetInert(node) {
        return _react.default.Children.map(node, (c)=>{
            var ref12, ref6;
            if ((c === null || c === void 0 ? void 0 : c.type) === 'link' && (c === null || c === void 0 ? void 0 : (ref12 = c.props) === null || ref12 === void 0 ? void 0 : ref12.href) && _constants.OPTIMIZED_FONT_PROVIDERS.some(({ url  })=>{
                var ref, ref10;
                return c === null || c === void 0 ? void 0 : (ref = c.props) === null || ref === void 0 ? void 0 : (ref10 = ref.href) === null || ref10 === void 0 ? void 0 : ref10.startsWith(url);
            })) {
                const newProps = {
                    ...c.props || {},
                    'data-href': c.props.href,
                    href: undefined
                };
                return(/*#__PURE__*/ _react.default.cloneElement(c, newProps));
            } else if (c === null || c === void 0 ? void 0 : (ref6 = c.props) === null || ref6 === void 0 ? void 0 : ref6.children) {
                const newProps = {
                    ...c.props || {},
                    children: this.makeStylesheetInert(c.props.children)
                };
                return(/*#__PURE__*/ _react.default.cloneElement(c, newProps));
            }
            return c;
        }).filter(Boolean);
    }
    render() {
        const { styles , ampPath , inAmpMode , hybridAmp , canonicalBase , __NEXT_DATA__ , dangerousAsPath , headTags , unstable_runtimeJS , unstable_JsPreload , disableOptimizedLoading , useMaybeDeferContent , optimizeCss , optimizeFonts , optimizeImages , concurrentFeatures ,  } = this.context;
        const disableRuntimeJS = unstable_runtimeJS === false;
        const disableJsPreload = unstable_JsPreload === false || !disableOptimizedLoading;
        this.context.docComponentsRendered.Head = true;
        let { head  } = this.context;
        let cssPreloads = [];
        let otherHeadElements = [];
        if (head) {
            head.forEach((c)=>{
                if (c && c.type === 'link' && c.props['rel'] === 'preload' && c.props['as'] === 'style') {
                    cssPreloads.push(c);
                } else {
                    c && otherHeadElements.push(c);
                }
            });
            head = cssPreloads.concat(otherHeadElements);
        }
        let children = _react.default.Children.toArray(this.props.children).filter(Boolean);
        // show a warning if Head contains <title> (only in development)
        if (false) {}
        if ( true && optimizeFonts && !inAmpMode) {
            children = this.makeStylesheetInert(children);
        }
        children = this.handleDocumentScriptLoaderItems(children);
        let hasAmphtmlRel = false;
        let hasCanonicalRel = false;
        // show warning and remove conflicting amp head tags
        head = _react.default.Children.map(head || [], (child)=>{
            if (!child) return child;
            const { type , props  } = child;
            if (inAmpMode) {
                let badProp = '';
                if (type === 'meta' && props.name === 'viewport') {
                    badProp = 'name="viewport"';
                } else if (type === 'link' && props.rel === 'canonical') {
                    hasCanonicalRel = true;
                } else if (type === 'script') {
                    // only block if
                    // 1. it has a src and isn't pointing to ampproject's CDN
                    // 2. it is using dangerouslySetInnerHTML without a type or
                    // a type of text/javascript
                    if (props.src && props.src.indexOf('ampproject') < -1 || props.dangerouslySetInnerHTML && (!props.type || props.type === 'text/javascript')) {
                        badProp = '<script';
                        Object.keys(props).forEach((prop)=>{
                            badProp += ` ${prop}="${props[prop]}"`;
                        });
                        badProp += '/>';
                    }
                }
                if (badProp) {
                    console.warn(`Found conflicting amp tag "${child.type}" with conflicting prop ${badProp} in ${__NEXT_DATA__.page}. https://nextjs.org/docs/messages/conflicting-amp-tag`);
                    return null;
                }
            } else {
                // non-amp mode
                if (type === 'link' && props.rel === 'amphtml') {
                    hasAmphtmlRel = true;
                }
            }
            return child;
        });
        const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
        // Must use nested component to allow use of a custom hook
        const DeferrableHead = ()=>{
            const getDynamicHeadContent = ()=>{
                return(/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, head, /*#__PURE__*/ _react.default.createElement("meta", {
                    name: "next-head-count",
                    content: _react.default.Children.count(head || []).toString()
                })));
            };
            const getDynamicScriptPreloads = ()=>{
                return(/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, !disableRuntimeJS && !disableJsPreload && this.getPreloadDynamicChunks(), !disableRuntimeJS && !disableJsPreload && this.getPreloadMainLinks(files)));
            };
            const getDynamicScriptContent = ()=>{
                return(/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, !disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files)));
            };
            const [isDeferred] = useMaybeDeferContent('HEAD', ()=>{
                return(/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, getDynamicHeadContent(), getDynamicScriptPreloads(), getDynamicScriptContent()));
            });
            var _nonce, _nonce1;
            return(/*#__PURE__*/ _react.default.createElement("head", Object.assign({}, this.props), !concurrentFeatures && this.context.isDevelopment && /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("style", {
                "data-next-hide-fouc": true,
                "data-ampdevmode": inAmpMode ? 'true' : undefined,
                dangerouslySetInnerHTML: {
                    __html: `body{display:none}`
                }
            }), /*#__PURE__*/ _react.default.createElement("noscript", {
                "data-next-hide-fouc": true,
                "data-ampdevmode": inAmpMode ? 'true' : undefined
            }, /*#__PURE__*/ _react.default.createElement("style", {
                dangerouslySetInnerHTML: {
                    __html: `body{display:block}`
                }
            }))), children, optimizeFonts && /*#__PURE__*/ _react.default.createElement("meta", {
                name: "next-font-preconnect"
            }), !isDeferred && getDynamicHeadContent(), inAmpMode && /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("meta", {
                name: "viewport",
                content: "width=device-width,minimum-scale=1,initial-scale=1"
            }), !hasCanonicalRel && /*#__PURE__*/ _react.default.createElement("link", {
                rel: "canonical",
                href: canonicalBase + (0, _utils1).cleanAmpPath(dangerousAsPath)
            }), /*#__PURE__*/ _react.default.createElement("link", {
                rel: "preload",
                as: "script",
                href: "https://cdn.ampproject.org/v0.js"
            }), /*#__PURE__*/ _react.default.createElement(AmpStyles, {
                styles: styles
            }), /*#__PURE__*/ _react.default.createElement("style", {
                "amp-boilerplate": "",
                dangerouslySetInnerHTML: {
                    __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`
                }
            }), /*#__PURE__*/ _react.default.createElement("noscript", null, /*#__PURE__*/ _react.default.createElement("style", {
                "amp-boilerplate": "",
                dangerouslySetInnerHTML: {
                    __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`
                }
            })), /*#__PURE__*/ _react.default.createElement("script", {
                async: true,
                src: "https://cdn.ampproject.org/v0.js"
            })), !inAmpMode && /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, !hasAmphtmlRel && hybridAmp && /*#__PURE__*/ _react.default.createElement("link", {
                rel: "amphtml",
                href: canonicalBase + getAmpPath(ampPath, dangerousAsPath)
            }), !optimizeCss && this.getCssLinks(files), !optimizeCss && /*#__PURE__*/ _react.default.createElement("noscript", {
                "data-n-css": (_nonce = this.props.nonce) !== null && _nonce !== void 0 ? _nonce : ''
            }), optimizeImages && /*#__PURE__*/ _react.default.createElement("meta", {
                name: "next-image-preload"
            }), !isDeferred && getDynamicScriptPreloads(), !disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), !isDeferred && getDynamicScriptContent(), optimizeCss && this.getCssLinks(files), optimizeCss && /*#__PURE__*/ _react.default.createElement("noscript", {
                "data-n-css": (_nonce1 = this.props.nonce) !== null && _nonce1 !== void 0 ? _nonce1 : ''
            }), this.context.isDevelopment && // ordering matches production
            // (by default, style-loader injects at the bottom of <head />)
            /*#__PURE__*/ _react.default.createElement("noscript", {
                id: "__next_css__DO_NOT_USE__"
            }), styles || null), /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, {}, ...headTags || [])));
        };
        return(/*#__PURE__*/ _react.default.createElement(DeferrableHead, null));
    }
}
exports.Head = Head;
Head.contextType = _utils.HtmlContext;
function Main() {
    const { docComponentsRendered  } = (0, _react).useContext(_utils.HtmlContext);
    docComponentsRendered.Main = true;
    // @ts-ignore
    return(/*#__PURE__*/ _react.default.createElement("next-js-internal-body-render-target", null));
}
class NextScript extends _react.Component {
    getDynamicChunks(files) {
        return getDynamicChunks(this.context, this.props, files);
    }
    getPreNextScripts() {
        return getPreNextScripts(this.context, this.props);
    }
    getScripts(files) {
        return getScripts(this.context, this.props, files);
    }
    getPolyfillScripts() {
        return getPolyfillScripts(this.context, this.props);
    }
    static getInlineScriptSource(context) {
        const { __NEXT_DATA__  } = context;
        try {
            const data = JSON.stringify(__NEXT_DATA__);
            if (false) {}
            return (0, _htmlescape).htmlEscapeJsonString(data);
        } catch (err) {
            if ((0, _isError).default(err) && err.message.indexOf('circular structure')) {
                throw new Error(`Circular structure in "getInitialProps" result of page "${__NEXT_DATA__.page}". https://nextjs.org/docs/messages/circular-structure`);
            }
            throw err;
        }
    }
    render() {
        const { assetPrefix , inAmpMode , buildManifest , unstable_runtimeJS , docComponentsRendered , devOnlyCacheBusterQueryString , disableOptimizedLoading , useMaybeDeferContent , crossOrigin ,  } = this.context;
        const disableRuntimeJS = unstable_runtimeJS === false;
        docComponentsRendered.NextScript = true;
        // Must nest component to use custom hook
        const DeferrableNextScript = ()=>{
            const [, content] = useMaybeDeferContent('NEXT_SCRIPT', ()=>{
                if (inAmpMode) {
                    const ampDevFiles = [
                        ...buildManifest.devFiles,
                        ...buildManifest.polyfillFiles,
                        ...buildManifest.ampDevFiles, 
                    ];
                    return(/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, disableRuntimeJS ? null : /*#__PURE__*/ _react.default.createElement("script", {
                        id: "__NEXT_DATA__",
                        type: "application/json",
                        nonce: this.props.nonce,
                        crossOrigin: this.props.crossOrigin || crossOrigin,
                        dangerouslySetInnerHTML: {
                            __html: NextScript.getInlineScriptSource(this.context)
                        },
                        "data-ampdevmode": true
                    }), ampDevFiles.map((file)=>/*#__PURE__*/ _react.default.createElement("script", {
                            key: file,
                            src: `${assetPrefix}/_next/${file}${devOnlyCacheBusterQueryString}`,
                            nonce: this.props.nonce,
                            crossOrigin: this.props.crossOrigin || crossOrigin,
                            "data-ampdevmode": true
                        })
                    )));
                }
                if (false) {}
                const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
                return(/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, !disableRuntimeJS && buildManifest.devFiles ? buildManifest.devFiles.map((file)=>/*#__PURE__*/ _react.default.createElement("script", {
                        key: file,
                        src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
                        nonce: this.props.nonce,
                        crossOrigin: this.props.crossOrigin || crossOrigin
                    })
                ) : null, disableRuntimeJS ? null : /*#__PURE__*/ _react.default.createElement("script", {
                    id: "__NEXT_DATA__",
                    type: "application/json",
                    nonce: this.props.nonce,
                    crossOrigin: this.props.crossOrigin || crossOrigin,
                    dangerouslySetInnerHTML: {
                        __html: NextScript.getInlineScriptSource(this.context)
                    }
                }), disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files)));
            });
            if (inAmpMode && "production" === 'production') {
                return null;
            }
            return content;
        };
        return(/*#__PURE__*/ _react.default.createElement(DeferrableNextScript, null));
    }
}
exports.NextScript = NextScript;
NextScript.contextType = _utils.HtmlContext;
NextScript.safariNomoduleFix = '!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();';
function getAmpPath(ampPath, asPath) {
    return ampPath || `${asPath}${asPath.includes('?') ? '&' : '?'}amp=1`;
} //# sourceMappingURL=_document.js.map


/***/ }),

/***/ 9185:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(6689));
var _head = _interopRequireDefault(__webpack_require__(4957));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const statusCodes = {
    400: 'Bad Request',
    404: 'This page could not be found',
    405: 'Method Not Allowed',
    500: 'Internal Server Error'
};
function _getInitialProps({ res , err  }) {
    const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
    return {
        statusCode
    };
}
class Error extends _react.default.Component {
    render() {
        const { statusCode  } = this.props;
        const title = this.props.title || statusCodes[statusCode] || 'An unexpected error has occurred';
        return(/*#__PURE__*/ _react.default.createElement("div", {
            style: styles.error
        },  true && /*#__PURE__*/ _react.default.createElement(_head.default, null, /*#__PURE__*/ _react.default.createElement("title", null, statusCode ? `${statusCode}: ${title}` : 'Application error: a client-side exception has occurred')), /*#__PURE__*/ _react.default.createElement("div", null, /*#__PURE__*/ _react.default.createElement("style", {
            dangerouslySetInnerHTML: {
                __html: 'body { margin: 0 }'
            }
        }), statusCode ? /*#__PURE__*/ _react.default.createElement("h1", {
            style: styles.h1
        }, statusCode) : null, /*#__PURE__*/ _react.default.createElement("div", {
            style: styles.desc
        }, /*#__PURE__*/ _react.default.createElement("h2", {
            style: styles.h2
        }, this.props.title || statusCode ? title : /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, "Application error: a client-side exception has occurred (see the browser console for more information)"), ".")))));
    }
}
Error.displayName = 'ErrorPage';
Error.getInitialProps = _getInitialProps;
Error.origGetInitialProps = _getInitialProps;
exports["default"] = Error;
const styles = {
    error: {
        color: '#000',
        background: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        display: 'inline-block',
        textAlign: 'left',
        lineHeight: '49px',
        height: '49px',
        verticalAlign: 'middle'
    },
    h1: {
        display: 'inline-block',
        borderRight: '1px solid rgba(0, 0, 0,.3)',
        margin: 0,
        marginRight: '20px',
        padding: '10px 23px 10px 0',
        fontSize: '24px',
        fontWeight: 500,
        verticalAlign: 'top'
    },
    h2: {
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: 'inherit',
        margin: 0,
        padding: 0
    }
}; //# sourceMappingURL=_error.js.map


/***/ }),

/***/ 5769:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(()=>{var r={598:(r,e,n)=>{var t=n(120);var a={};for(var o in t){if(t.hasOwnProperty(o)){a[t[o]]=o}}var s=r.exports={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};for(var l in s){if(s.hasOwnProperty(l)){if(!("channels"in s[l])){throw new Error("missing channels property: "+l)}if(!("labels"in s[l])){throw new Error("missing channel labels property: "+l)}if(s[l].labels.length!==s[l].channels){throw new Error("channel and label counts mismatch: "+l)}var i=s[l].channels;var c=s[l].labels;delete s[l].channels;delete s[l].labels;Object.defineProperty(s[l],"channels",{value:i});Object.defineProperty(s[l],"labels",{value:c})}}s.rgb.hsl=function(r){var e=r[0]/255;var n=r[1]/255;var t=r[2]/255;var a=Math.min(e,n,t);var o=Math.max(e,n,t);var s=o-a;var l;var i;var c;if(o===a){l=0}else if(e===o){l=(n-t)/s}else if(n===o){l=2+(t-e)/s}else if(t===o){l=4+(e-n)/s}l=Math.min(l*60,360);if(l<0){l+=360}c=(a+o)/2;if(o===a){i=0}else if(c<=.5){i=s/(o+a)}else{i=s/(2-o-a)}return[l,i*100,c*100]};s.rgb.hsv=function(r){var e;var n;var t;var a;var o;var s=r[0]/255;var l=r[1]/255;var i=r[2]/255;var c=Math.max(s,l,i);var u=c-Math.min(s,l,i);var diffc=function(r){return(c-r)/6/u+1/2};if(u===0){a=o=0}else{o=u/c;e=diffc(s);n=diffc(l);t=diffc(i);if(s===c){a=t-n}else if(l===c){a=1/3+e-t}else if(i===c){a=2/3+n-e}if(a<0){a+=1}else if(a>1){a-=1}}return[a*360,o*100,c*100]};s.rgb.hwb=function(r){var e=r[0];var n=r[1];var t=r[2];var a=s.rgb.hsl(r)[0];var o=1/255*Math.min(e,Math.min(n,t));t=1-1/255*Math.max(e,Math.max(n,t));return[a,o*100,t*100]};s.rgb.cmyk=function(r){var e=r[0]/255;var n=r[1]/255;var t=r[2]/255;var a;var o;var s;var l;l=Math.min(1-e,1-n,1-t);a=(1-e-l)/(1-l)||0;o=(1-n-l)/(1-l)||0;s=(1-t-l)/(1-l)||0;return[a*100,o*100,s*100,l*100]};function comparativeDistance(r,e){return Math.pow(r[0]-e[0],2)+Math.pow(r[1]-e[1],2)+Math.pow(r[2]-e[2],2)}s.rgb.keyword=function(r){var e=a[r];if(e){return e}var n=Infinity;var o;for(var s in t){if(t.hasOwnProperty(s)){var l=t[s];var i=comparativeDistance(r,l);if(i<n){n=i;o=s}}}return o};s.keyword.rgb=function(r){return t[r]};s.rgb.xyz=function(r){var e=r[0]/255;var n=r[1]/255;var t=r[2]/255;e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92;n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92;t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92;var a=e*.4124+n*.3576+t*.1805;var o=e*.2126+n*.7152+t*.0722;var s=e*.0193+n*.1192+t*.9505;return[a*100,o*100,s*100]};s.rgb.lab=function(r){var e=s.rgb.xyz(r);var n=e[0];var t=e[1];var a=e[2];var o;var l;var i;n/=95.047;t/=100;a/=108.883;n=n>.008856?Math.pow(n,1/3):7.787*n+16/116;t=t>.008856?Math.pow(t,1/3):7.787*t+16/116;a=a>.008856?Math.pow(a,1/3):7.787*a+16/116;o=116*t-16;l=500*(n-t);i=200*(t-a);return[o,l,i]};s.hsl.rgb=function(r){var e=r[0]/360;var n=r[1]/100;var t=r[2]/100;var a;var o;var s;var l;var i;if(n===0){i=t*255;return[i,i,i]}if(t<.5){o=t*(1+n)}else{o=t+n-t*n}a=2*t-o;l=[0,0,0];for(var c=0;c<3;c++){s=e+1/3*-(c-1);if(s<0){s++}if(s>1){s--}if(6*s<1){i=a+(o-a)*6*s}else if(2*s<1){i=o}else if(3*s<2){i=a+(o-a)*(2/3-s)*6}else{i=a}l[c]=i*255}return l};s.hsl.hsv=function(r){var e=r[0];var n=r[1]/100;var t=r[2]/100;var a=n;var o=Math.max(t,.01);var s;var l;t*=2;n*=t<=1?t:2-t;a*=o<=1?o:2-o;l=(t+n)/2;s=t===0?2*a/(o+a):2*n/(t+n);return[e,s*100,l*100]};s.hsv.rgb=function(r){var e=r[0]/60;var n=r[1]/100;var t=r[2]/100;var a=Math.floor(e)%6;var o=e-Math.floor(e);var s=255*t*(1-n);var l=255*t*(1-n*o);var i=255*t*(1-n*(1-o));t*=255;switch(a){case 0:return[t,i,s];case 1:return[l,t,s];case 2:return[s,t,i];case 3:return[s,l,t];case 4:return[i,s,t];case 5:return[t,s,l]}};s.hsv.hsl=function(r){var e=r[0];var n=r[1]/100;var t=r[2]/100;var a=Math.max(t,.01);var o;var s;var l;l=(2-n)*t;o=(2-n)*a;s=n*a;s/=o<=1?o:2-o;s=s||0;l/=2;return[e,s*100,l*100]};s.hwb.rgb=function(r){var e=r[0]/360;var n=r[1]/100;var t=r[2]/100;var a=n+t;var o;var s;var l;var i;if(a>1){n/=a;t/=a}o=Math.floor(6*e);s=1-t;l=6*e-o;if((o&1)!==0){l=1-l}i=n+l*(s-n);var c;var u;var v;switch(o){default:case 6:case 0:c=s;u=i;v=n;break;case 1:c=i;u=s;v=n;break;case 2:c=n;u=s;v=i;break;case 3:c=n;u=i;v=s;break;case 4:c=i;u=n;v=s;break;case 5:c=s;u=n;v=i;break}return[c*255,u*255,v*255]};s.cmyk.rgb=function(r){var e=r[0]/100;var n=r[1]/100;var t=r[2]/100;var a=r[3]/100;var o;var s;var l;o=1-Math.min(1,e*(1-a)+a);s=1-Math.min(1,n*(1-a)+a);l=1-Math.min(1,t*(1-a)+a);return[o*255,s*255,l*255]};s.xyz.rgb=function(r){var e=r[0]/100;var n=r[1]/100;var t=r[2]/100;var a;var o;var s;a=e*3.2406+n*-1.5372+t*-.4986;o=e*-.9689+n*1.8758+t*.0415;s=e*.0557+n*-.204+t*1.057;a=a>.0031308?1.055*Math.pow(a,1/2.4)-.055:a*12.92;o=o>.0031308?1.055*Math.pow(o,1/2.4)-.055:o*12.92;s=s>.0031308?1.055*Math.pow(s,1/2.4)-.055:s*12.92;a=Math.min(Math.max(0,a),1);o=Math.min(Math.max(0,o),1);s=Math.min(Math.max(0,s),1);return[a*255,o*255,s*255]};s.xyz.lab=function(r){var e=r[0];var n=r[1];var t=r[2];var a;var o;var s;e/=95.047;n/=100;t/=108.883;e=e>.008856?Math.pow(e,1/3):7.787*e+16/116;n=n>.008856?Math.pow(n,1/3):7.787*n+16/116;t=t>.008856?Math.pow(t,1/3):7.787*t+16/116;a=116*n-16;o=500*(e-n);s=200*(n-t);return[a,o,s]};s.lab.xyz=function(r){var e=r[0];var n=r[1];var t=r[2];var a;var o;var s;o=(e+16)/116;a=n/500+o;s=o-t/200;var l=Math.pow(o,3);var i=Math.pow(a,3);var c=Math.pow(s,3);o=l>.008856?l:(o-16/116)/7.787;a=i>.008856?i:(a-16/116)/7.787;s=c>.008856?c:(s-16/116)/7.787;a*=95.047;o*=100;s*=108.883;return[a,o,s]};s.lab.lch=function(r){var e=r[0];var n=r[1];var t=r[2];var a;var o;var s;a=Math.atan2(t,n);o=a*360/2/Math.PI;if(o<0){o+=360}s=Math.sqrt(n*n+t*t);return[e,s,o]};s.lch.lab=function(r){var e=r[0];var n=r[1];var t=r[2];var a;var o;var s;s=t/360*2*Math.PI;a=n*Math.cos(s);o=n*Math.sin(s);return[e,a,o]};s.rgb.ansi16=function(r){var e=r[0];var n=r[1];var t=r[2];var a=1 in arguments?arguments[1]:s.rgb.hsv(r)[2];a=Math.round(a/50);if(a===0){return 30}var o=30+(Math.round(t/255)<<2|Math.round(n/255)<<1|Math.round(e/255));if(a===2){o+=60}return o};s.hsv.ansi16=function(r){return s.rgb.ansi16(s.hsv.rgb(r),r[2])};s.rgb.ansi256=function(r){var e=r[0];var n=r[1];var t=r[2];if(e===n&&n===t){if(e<8){return 16}if(e>248){return 231}return Math.round((e-8)/247*24)+232}var a=16+36*Math.round(e/255*5)+6*Math.round(n/255*5)+Math.round(t/255*5);return a};s.ansi16.rgb=function(r){var e=r%10;if(e===0||e===7){if(r>50){e+=3.5}e=e/10.5*255;return[e,e,e]}var n=(~~(r>50)+1)*.5;var t=(e&1)*n*255;var a=(e>>1&1)*n*255;var o=(e>>2&1)*n*255;return[t,a,o]};s.ansi256.rgb=function(r){if(r>=232){var e=(r-232)*10+8;return[e,e,e]}r-=16;var n;var t=Math.floor(r/36)/5*255;var a=Math.floor((n=r%36)/6)/5*255;var o=n%6/5*255;return[t,a,o]};s.rgb.hex=function(r){var e=((Math.round(r[0])&255)<<16)+((Math.round(r[1])&255)<<8)+(Math.round(r[2])&255);var n=e.toString(16).toUpperCase();return"000000".substring(n.length)+n};s.hex.rgb=function(r){var e=r.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e){return[0,0,0]}var n=e[0];if(e[0].length===3){n=n.split("").map((function(r){return r+r})).join("")}var t=parseInt(n,16);var a=t>>16&255;var o=t>>8&255;var s=t&255;return[a,o,s]};s.rgb.hcg=function(r){var e=r[0]/255;var n=r[1]/255;var t=r[2]/255;var a=Math.max(Math.max(e,n),t);var o=Math.min(Math.min(e,n),t);var s=a-o;var l;var i;if(s<1){l=o/(1-s)}else{l=0}if(s<=0){i=0}else if(a===e){i=(n-t)/s%6}else if(a===n){i=2+(t-e)/s}else{i=4+(e-n)/s+4}i/=6;i%=1;return[i*360,s*100,l*100]};s.hsl.hcg=function(r){var e=r[1]/100;var n=r[2]/100;var t=1;var a=0;if(n<.5){t=2*e*n}else{t=2*e*(1-n)}if(t<1){a=(n-.5*t)/(1-t)}return[r[0],t*100,a*100]};s.hsv.hcg=function(r){var e=r[1]/100;var n=r[2]/100;var t=e*n;var a=0;if(t<1){a=(n-t)/(1-t)}return[r[0],t*100,a*100]};s.hcg.rgb=function(r){var e=r[0]/360;var n=r[1]/100;var t=r[2]/100;if(n===0){return[t*255,t*255,t*255]}var a=[0,0,0];var o=e%1*6;var s=o%1;var l=1-s;var i=0;switch(Math.floor(o)){case 0:a[0]=1;a[1]=s;a[2]=0;break;case 1:a[0]=l;a[1]=1;a[2]=0;break;case 2:a[0]=0;a[1]=1;a[2]=s;break;case 3:a[0]=0;a[1]=l;a[2]=1;break;case 4:a[0]=s;a[1]=0;a[2]=1;break;default:a[0]=1;a[1]=0;a[2]=l}i=(1-n)*t;return[(n*a[0]+i)*255,(n*a[1]+i)*255,(n*a[2]+i)*255]};s.hcg.hsv=function(r){var e=r[1]/100;var n=r[2]/100;var t=e+n*(1-e);var a=0;if(t>0){a=e/t}return[r[0],a*100,t*100]};s.hcg.hsl=function(r){var e=r[1]/100;var n=r[2]/100;var t=n*(1-e)+.5*e;var a=0;if(t>0&&t<.5){a=e/(2*t)}else if(t>=.5&&t<1){a=e/(2*(1-t))}return[r[0],a*100,t*100]};s.hcg.hwb=function(r){var e=r[1]/100;var n=r[2]/100;var t=e+n*(1-e);return[r[0],(t-e)*100,(1-t)*100]};s.hwb.hcg=function(r){var e=r[1]/100;var n=r[2]/100;var t=1-n;var a=t-e;var o=0;if(a<1){o=(t-a)/(1-a)}return[r[0],a*100,o*100]};s.apple.rgb=function(r){return[r[0]/65535*255,r[1]/65535*255,r[2]/65535*255]};s.rgb.apple=function(r){return[r[0]/255*65535,r[1]/255*65535,r[2]/255*65535]};s.gray.rgb=function(r){return[r[0]/100*255,r[0]/100*255,r[0]/100*255]};s.gray.hsl=s.gray.hsv=function(r){return[0,0,r[0]]};s.gray.hwb=function(r){return[0,100,r[0]]};s.gray.cmyk=function(r){return[0,0,0,r[0]]};s.gray.lab=function(r){return[r[0],0,0]};s.gray.hex=function(r){var e=Math.round(r[0]/100*255)&255;var n=(e<<16)+(e<<8)+e;var t=n.toString(16).toUpperCase();return"000000".substring(t.length)+t};s.rgb.gray=function(r){var e=(r[0]+r[1]+r[2])/3;return[e/255*100]}},830:(r,e,n)=>{var t=n(598);var a=n(180);var o={};var s=Object.keys(t);function wrapRaw(r){var wrappedFn=function(e){if(e===undefined||e===null){return e}if(arguments.length>1){e=Array.prototype.slice.call(arguments)}return r(e)};if("conversion"in r){wrappedFn.conversion=r.conversion}return wrappedFn}function wrapRounded(r){var wrappedFn=function(e){if(e===undefined||e===null){return e}if(arguments.length>1){e=Array.prototype.slice.call(arguments)}var n=r(e);if(typeof n==="object"){for(var t=n.length,a=0;a<t;a++){n[a]=Math.round(n[a])}}return n};if("conversion"in r){wrappedFn.conversion=r.conversion}return wrappedFn}s.forEach((function(r){o[r]={};Object.defineProperty(o[r],"channels",{value:t[r].channels});Object.defineProperty(o[r],"labels",{value:t[r].labels});var e=a(r);var n=Object.keys(e);n.forEach((function(n){var t=e[n];o[r][n]=wrapRounded(t);o[r][n].raw=wrapRaw(t)}))}));r.exports=o},120:r=>{"use strict";r.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},180:(r,e,n)=>{var t=n(598);function buildGraph(){var r={};var e=Object.keys(t);for(var n=e.length,a=0;a<n;a++){r[e[a]]={distance:-1,parent:null}}return r}function deriveBFS(r){var e=buildGraph();var n=[r];e[r].distance=0;while(n.length){var a=n.pop();var o=Object.keys(t[a]);for(var s=o.length,l=0;l<s;l++){var i=o[l];var c=e[i];if(c.distance===-1){c.distance=e[a].distance+1;c.parent=a;n.unshift(i)}}}return e}function link(r,e){return function(n){return e(r(n))}}function wrapConversion(r,e){var n=[e[r].parent,r];var a=t[e[r].parent][r];var o=e[r].parent;while(e[o].parent){n.unshift(e[o].parent);a=link(t[e[o].parent][o],a);o=e[o].parent}a.conversion=n;return a}r.exports=function(r){var e=deriveBFS(r);var n={};var t=Object.keys(e);for(var a=t.length,o=0;o<a;o++){var s=t[o];var l=e[s];if(l.parent===null){continue}n[s]=wrapConversion(s,e)}return n}},694:(r,e,n)=>{"use strict";r=n.nmd(r);const t=n(830);const wrapAnsi16=(r,e)=>function(){const n=r.apply(t,arguments);return`[${n+e}m`};const wrapAnsi256=(r,e)=>function(){const n=r.apply(t,arguments);return`[${38+e};5;${n}m`};const wrapAnsi16m=(r,e)=>function(){const n=r.apply(t,arguments);return`[${38+e};2;${n[0]};${n[1]};${n[2]}m`};function assembleStyles(){const r=new Map;const e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.grey=e.color.gray;for(const n of Object.keys(e)){const t=e[n];for(const n of Object.keys(t)){const a=t[n];e[n]={open:`[${a[0]}m`,close:`[${a[1]}m`};t[n]=e[n];r.set(a[0],a[1])}Object.defineProperty(e,n,{value:t,enumerable:false});Object.defineProperty(e,"codes",{value:r,enumerable:false})}const ansi2ansi=r=>r;const rgb2rgb=(r,e,n)=>[r,e,n];e.color.close="[39m";e.bgColor.close="[49m";e.color.ansi={ansi:wrapAnsi16(ansi2ansi,0)};e.color.ansi256={ansi256:wrapAnsi256(ansi2ansi,0)};e.color.ansi16m={rgb:wrapAnsi16m(rgb2rgb,0)};e.bgColor.ansi={ansi:wrapAnsi16(ansi2ansi,10)};e.bgColor.ansi256={ansi256:wrapAnsi256(ansi2ansi,10)};e.bgColor.ansi16m={rgb:wrapAnsi16m(rgb2rgb,10)};for(let r of Object.keys(t)){if(typeof t[r]!=="object"){continue}const n=t[r];if(r==="ansi16"){r="ansi"}if("ansi16"in n){e.color.ansi[r]=wrapAnsi16(n.ansi16,0);e.bgColor.ansi[r]=wrapAnsi16(n.ansi16,10)}if("ansi256"in n){e.color.ansi256[r]=wrapAnsi256(n.ansi256,0);e.bgColor.ansi256[r]=wrapAnsi256(n.ansi256,10)}if("rgb"in n){e.color.ansi16m[r]=wrapAnsi16m(n.rgb,0);e.bgColor.ansi16m[r]=wrapAnsi16m(n.rgb,10)}}return e}Object.defineProperty(r,"exports",{enumerable:true,get:assembleStyles})},437:(r,e,n)=>{"use strict";const t=n(426);const a=n(694);const o=n(937).stdout;const s=n(900);const l=process.platform==="win32"&&!(process.env.TERM||"").toLowerCase().startsWith("xterm");const i=["ansi","ansi","ansi256","ansi16m"];const c=new Set(["gray"]);const u=Object.create(null);function applyOptions(r,e){e=e||{};const n=o?o.level:0;r.level=e.level===undefined?n:e.level;r.enabled="enabled"in e?e.enabled:r.level>0}function Chalk(r){if(!this||!(this instanceof Chalk)||this.template){const e={};applyOptions(e,r);e.template=function(){const r=[].slice.call(arguments);return chalkTag.apply(null,[e.template].concat(r))};Object.setPrototypeOf(e,Chalk.prototype);Object.setPrototypeOf(e.template,e);e.template.constructor=Chalk;return e.template}applyOptions(this,r)}if(l){a.blue.open="[94m"}for(const r of Object.keys(a)){a[r].closeRe=new RegExp(t(a[r].close),"g");u[r]={get(){const e=a[r];return build.call(this,this._styles?this._styles.concat(e):[e],this._empty,r)}}}u.visible={get(){return build.call(this,this._styles||[],true,"visible")}};a.color.closeRe=new RegExp(t(a.color.close),"g");for(const r of Object.keys(a.color.ansi)){if(c.has(r)){continue}u[r]={get(){const e=this.level;return function(){const n=a.color[i[e]][r].apply(null,arguments);const t={open:n,close:a.color.close,closeRe:a.color.closeRe};return build.call(this,this._styles?this._styles.concat(t):[t],this._empty,r)}}}}a.bgColor.closeRe=new RegExp(t(a.bgColor.close),"g");for(const r of Object.keys(a.bgColor.ansi)){if(c.has(r)){continue}const e="bg"+r[0].toUpperCase()+r.slice(1);u[e]={get(){const e=this.level;return function(){const n=a.bgColor[i[e]][r].apply(null,arguments);const t={open:n,close:a.bgColor.close,closeRe:a.bgColor.closeRe};return build.call(this,this._styles?this._styles.concat(t):[t],this._empty,r)}}}}const v=Object.defineProperties((()=>{}),u);function build(r,e,n){const builder=function(){return applyStyle.apply(builder,arguments)};builder._styles=r;builder._empty=e;const t=this;Object.defineProperty(builder,"level",{enumerable:true,get(){return t.level},set(r){t.level=r}});Object.defineProperty(builder,"enabled",{enumerable:true,get(){return t.enabled},set(r){t.enabled=r}});builder.hasGrey=this.hasGrey||n==="gray"||n==="grey";builder.__proto__=v;return builder}function applyStyle(){const r=arguments;const e=r.length;let n=String(arguments[0]);if(e===0){return""}if(e>1){for(let t=1;t<e;t++){n+=" "+r[t]}}if(!this.enabled||this.level<=0||!n){return this._empty?"":n}const t=a.dim.open;if(l&&this.hasGrey){a.dim.open=""}for(const r of this._styles.slice().reverse()){n=r.open+n.replace(r.closeRe,r.open)+r.close;n=n.replace(/\r?\n/g,`${r.close}$&${r.open}`)}a.dim.open=t;return n}function chalkTag(r,e){if(!Array.isArray(e)){return[].slice.call(arguments,1).join(" ")}const n=[].slice.call(arguments,2);const t=[e.raw[0]];for(let r=1;r<e.length;r++){t.push(String(n[r-1]).replace(/[{}\\]/g,"\\$&"));t.push(String(e.raw[r]))}return s(r,t.join(""))}Object.defineProperties(Chalk.prototype,u);r.exports=Chalk();r.exports.supportsColor=o;r.exports["default"]=r.exports},900:r=>{"use strict";const e=/(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;const n=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;const t=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;const a=/\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;const o=new Map([["n","\n"],["r","\r"],["t","\t"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e",""],["a",""]]);function unescape(r){if(r[0]==="u"&&r.length===5||r[0]==="x"&&r.length===3){return String.fromCharCode(parseInt(r.slice(1),16))}return o.get(r)||r}function parseArguments(r,e){const n=[];const o=e.trim().split(/\s*,\s*/g);let s;for(const e of o){if(!isNaN(e)){n.push(Number(e))}else if(s=e.match(t)){n.push(s[2].replace(a,((r,e,n)=>e?unescape(e):n)))}else{throw new Error(`Invalid Chalk template style argument: ${e} (in style '${r}')`)}}return n}function parseStyle(r){n.lastIndex=0;const e=[];let t;while((t=n.exec(r))!==null){const r=t[1];if(t[2]){const n=parseArguments(r,t[2]);e.push([r].concat(n))}else{e.push([r])}}return e}function buildStyle(r,e){const n={};for(const r of e){for(const e of r.styles){n[e[0]]=r.inverse?null:e.slice(1)}}let t=r;for(const r of Object.keys(n)){if(Array.isArray(n[r])){if(!(r in t)){throw new Error(`Unknown Chalk style: ${r}`)}if(n[r].length>0){t=t[r].apply(t,n[r])}else{t=t[r]}}}return t}r.exports=(r,n)=>{const t=[];const a=[];let o=[];n.replace(e,((e,n,s,l,i,c)=>{if(n){o.push(unescape(n))}else if(l){const e=o.join("");o=[];a.push(t.length===0?e:buildStyle(r,t)(e));t.push({inverse:s,styles:parseStyle(l)})}else if(i){if(t.length===0){throw new Error("Found extraneous } in Chalk template literal")}a.push(buildStyle(r,t)(o.join("")));o=[];t.pop()}else{o.push(c)}}));a.push(o.join(""));if(t.length>0){const r=`Chalk template literal is missing ${t.length} closing bracket${t.length===1?"":"s"} (\`}\`)`;throw new Error(r)}return a.join("")}},426:r=>{"use strict";var e=/[|\\{}()[\]^$+*?.]/g;r.exports=function(r){if(typeof r!=="string"){throw new TypeError("Expected a string")}return r.replace(e,"\\$&")}},135:r=>{"use strict";r.exports=(r,e)=>{e=e||process.argv;const n=r.startsWith("-")?"":r.length===1?"-":"--";const t=e.indexOf(n+r);const a=e.indexOf("--");return t!==-1&&(a===-1?true:t<a)}},937:(r,e,n)=>{"use strict";const t=n(37);const a=n(135);const o=process.env;let s;if(a("no-color")||a("no-colors")||a("color=false")){s=false}else if(a("color")||a("colors")||a("color=true")||a("color=always")){s=true}if("FORCE_COLOR"in o){s=o.FORCE_COLOR.length===0||parseInt(o.FORCE_COLOR,10)!==0}function translateLevel(r){if(r===0){return false}return{level:r,hasBasic:true,has256:r>=2,has16m:r>=3}}function supportsColor(r){if(s===false){return 0}if(a("color=16m")||a("color=full")||a("color=truecolor")){return 3}if(a("color=256")){return 2}if(r&&!r.isTTY&&s!==true){return 0}const e=s?1:0;if(process.platform==="win32"){const r=t.release().split(".");if(Number(process.versions.node.split(".")[0])>=8&&Number(r[0])>=10&&Number(r[2])>=10586){return Number(r[2])>=14931?3:2}return 1}if("CI"in o){if(["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI"].some((r=>r in o))||o.CI_NAME==="codeship"){return 1}return e}if("TEAMCITY_VERSION"in o){return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION)?1:0}if(o.COLORTERM==="truecolor"){return 3}if("TERM_PROGRAM"in o){const r=parseInt((o.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(o.TERM_PROGRAM){case"iTerm.app":return r>=3?3:2;case"Apple_Terminal":return 2}}if(/-256(color)?$/i.test(o.TERM)){return 2}if(/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(o.TERM)){return 1}if("COLORTERM"in o){return 1}if(o.TERM==="dumb"){return e}return e}function getSupportLevel(r){const e=supportsColor(r);return translateLevel(e)}r.exports={supportsColor:getSupportLevel,stdout:getSupportLevel(process.stdout),stderr:getSupportLevel(process.stderr)}},37:r=>{"use strict";r.exports=__webpack_require__(2037)}};var e={};function __nccwpck_require__(n){var t=e[n];if(t!==undefined){return t.exports}var a=e[n]={id:n,loaded:false,exports:{}};var o=true;try{r[n](a,a.exports,__nccwpck_require__);o=false}finally{if(o)delete e[n]}a.loaded=true;return a.exports}(()=>{__nccwpck_require__.nmd=r=>{r.paths=[];if(!r.children)r.children=[];return r}})();if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n=__nccwpck_require__(437);module.exports=n})();

/***/ }),

/***/ 738:
/***/ ((module) => {

(()=>{"use strict";if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var e={};(()=>{var r=e;
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */r.parse=parse;r.serialize=serialize;var i=decodeURIComponent;var t=encodeURIComponent;var a=/; */;var n=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function parse(e,r){if(typeof e!=="string"){throw new TypeError("argument str must be a string")}var t={};var n=r||{};var o=e.split(a);var s=n.decode||i;for(var p=0;p<o.length;p++){var f=o[p];var u=f.indexOf("=");if(u<0){continue}var v=f.substr(0,u).trim();var c=f.substr(++u,f.length).trim();if('"'==c[0]){c=c.slice(1,-1)}if(undefined==t[v]){t[v]=tryDecode(c,s)}}return t}function serialize(e,r,i){var a=i||{};var o=a.encode||t;if(typeof o!=="function"){throw new TypeError("option encode is invalid")}if(!n.test(e)){throw new TypeError("argument name is invalid")}var s=o(r);if(s&&!n.test(s)){throw new TypeError("argument val is invalid")}var p=e+"="+s;if(null!=a.maxAge){var f=a.maxAge-0;if(isNaN(f)||!isFinite(f)){throw new TypeError("option maxAge is invalid")}p+="; Max-Age="+Math.floor(f)}if(a.domain){if(!n.test(a.domain)){throw new TypeError("option domain is invalid")}p+="; Domain="+a.domain}if(a.path){if(!n.test(a.path)){throw new TypeError("option path is invalid")}p+="; Path="+a.path}if(a.expires){if(typeof a.expires.toUTCString!=="function"){throw new TypeError("option expires is invalid")}p+="; Expires="+a.expires.toUTCString()}if(a.httpOnly){p+="; HttpOnly"}if(a.secure){p+="; Secure"}if(a.sameSite){var u=typeof a.sameSite==="string"?a.sameSite.toLowerCase():a.sameSite;switch(u){case true:p+="; SameSite=Strict";break;case"lax":p+="; SameSite=Lax";break;case"strict":p+="; SameSite=Strict";break;case"none":p+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return p}function tryDecode(e,r){try{return r(e)}catch(r){return e}}})();module.exports=e})();

/***/ }),

/***/ 4329:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at " + i);
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at " + j);
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at " + j);
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at " + i);
            if (!pattern)
                throw new TypeError("Missing pattern at " + i);
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function () {
        var result = "";
        var value;
        // tslint:disable-next-line
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
exports.parse = parse;
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
exports.compile = compile;
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"" + token.name + "\" to not be empty");
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
        }
        return path;
    };
}
exports.tokensToFunction = tokensToFunction;
/**
 * Create path match function from `path-to-regexp` spec.
 */
function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
}
exports.match = match;
/**
 * Create a path match function from `path-to-regexp` output.
 */
function regexpToFunction(re, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.decode, decode = _a === void 0 ? function (x) { return x; } : _a;
    return function (pathname) {
        var m = re.exec(pathname);
        if (!m)
            return false;
        var path = m[0], index = m.index;
        var params = Object.create(null);
        var _loop_1 = function (i) {
            // tslint:disable-next-line
            if (m[i] === undefined)
                return "continue";
            var key = keys[i - 1];
            if (key.modifier === "*" || key.modifier === "+") {
                params[key.name] = m[i].split(key.prefix + key.suffix).map(function (value) {
                    return decode(value, key);
                });
            }
            else {
                params[key.name] = decode(m[i], key);
            }
        };
        for (var i = 1; i < m.length; i++) {
            _loop_1(i);
        }
        return { path: path, index: index, params: params };
    };
}
exports.regexpToFunction = regexpToFunction;
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */
function regexpToRegexp(path, keys) {
    if (!keys)
        return path;
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
        for (var i = 0; i < groups.length; i++) {
            keys.push({
                name: i,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: ""
            });
        }
    }
    return path;
}
/**
 * Transform an array into a regexp.
 */
function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function (path) { return pathToRegexp(path, keys, options).source; });
    return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
/**
 * Create a path regexp from string input.
 */
function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */
function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function (x) { return x; } : _d;
    var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
    var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
    var route = start ? "^" : "";
    // Iterate over the tokens and create our regexp string.
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += escapeString(encode(token));
        }
        else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
                if (keys)
                    keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                    }
                    else {
                        route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                    }
                }
                else {
                    route += "(" + token.pattern + ")" + token.modifier;
                }
            }
            else {
                route += "(?:" + prefix + suffix + ")" + token.modifier;
            }
        }
    }
    if (end) {
        if (!strict)
            route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
    }
    else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string"
            ? delimiter.indexOf(endToken[endToken.length - 1]) > -1
            : // tslint:disable-next-line
                endToken === undefined;
        if (!strict) {
            route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
            route += "(?=" + delimiter + "|" + endsWith + ")";
        }
    }
    return new RegExp(route, flags(options));
}
exports.tokensToRegexp = tokensToRegexp;
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */
function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
    if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
}
exports.pathToRegexp = pathToRegexp;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 676:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = isError;
exports.getProperError = getProperError;
var _isPlainObject = __webpack_require__(2288);
function isError(err) {
    return typeof err === 'object' && err !== null && 'name' in err && 'message' in err;
}
function getProperError(err) {
    if (isError(err)) {
        return err;
    }
    if (false) {}
    return new Error((0, _isPlainObject).isPlainObject(err) ? JSON.stringify(err) : err + '');
}

//# sourceMappingURL=is-error.js.map

/***/ }),

/***/ 2288:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getObjectClassLabel = getObjectClassLabel;
exports.isPlainObject = isPlainObject;
function getObjectClassLabel(value) {
    return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
    if (getObjectClassLabel(value) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
}

//# sourceMappingURL=is-plain-object.js.map

/***/ }),

/***/ 3997:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getRedirectStatus = getRedirectStatus;
exports.normalizeRouteRegex = normalizeRouteRegex;
exports.modifyRouteRegex = modifyRouteRegex;
exports["default"] = loadCustomRoutes;
exports.allowedStatusCodes = void 0;
var _chalk = _interopRequireDefault(__webpack_require__(5769));
var _url = __webpack_require__(4269);
var pathToRegexp = _interopRequireWildcard(__webpack_require__(4329));
var _escapeRegexp = __webpack_require__(7664);
var _constants = __webpack_require__(6724);
var _isError = _interopRequireDefault(__webpack_require__(676));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {
        };
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {
                    };
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
const allowedStatusCodes = new Set([
    301,
    302,
    303,
    307,
    308
]);
exports.allowedStatusCodes = allowedStatusCodes;
const allowedHasTypes = new Set([
    'header',
    'cookie',
    'query',
    'host'
]);
const namedGroupsRegex = /\(\?<([a-zA-Z][a-zA-Z0-9]*)>/g;
function getRedirectStatus(route) {
    return route.statusCode || (route.permanent ? _constants.PERMANENT_REDIRECT_STATUS : _constants.TEMPORARY_REDIRECT_STATUS);
}
function normalizeRouteRegex(regex) {
    // clean up un-necessary escaping from regex.source which turns / into \\/
    return regex.replace(/\\\//g, '/');
}
function modifyRouteRegex(regex, restrictedPaths) {
    if (restrictedPaths) {
        regex = regex.replace(/\^/, `^(?!${restrictedPaths.map((path)=>path.replace(/\//g, '\\/')
        ).join('|')})`);
    }
    regex = regex.replace(/\$$/, '(?:\\/)?$');
    return regex;
}
function checkRedirect(route) {
    const invalidParts = [];
    let hadInvalidStatus = false;
    if (route.statusCode && !allowedStatusCodes.has(route.statusCode)) {
        hadInvalidStatus = true;
        invalidParts.push(`\`statusCode\` is not undefined or valid statusCode`);
    }
    if (typeof route.permanent !== 'boolean' && !route.statusCode) {
        invalidParts.push(`\`permanent\` is not set to \`true\` or \`false\``);
    }
    return {
        invalidParts,
        hadInvalidStatus
    };
}
function checkHeader(route) {
    const invalidParts = [];
    if (!Array.isArray(route.headers)) {
        invalidParts.push('`headers` field must be an array');
    } else if (route.headers.length === 0) {
        invalidParts.push('`headers` field cannot be empty');
    } else {
        for (const header of route.headers){
            if (!header || typeof header !== 'object') {
                invalidParts.push("`headers` items must be object with { key: '', value: '' }");
                break;
            }
            if (typeof header.key !== 'string') {
                invalidParts.push('`key` in header item must be string');
                break;
            }
            if (typeof header.value !== 'string') {
                invalidParts.push('`value` in header item must be string');
                break;
            }
        }
    }
    return invalidParts;
}
function tryParsePath(route, handleUrl) {
    const result = {
    };
    let routePath = route;
    try {
        if (handleUrl) {
            const parsedDestination = (0, _url).parse(route, true);
            routePath = `${parsedDestination.pathname}${parsedDestination.hash || ''}`;
        }
        // Make sure we can parse the source properly
        result.tokens = pathToRegexp.parse(routePath);
        const regex = pathToRegexp.tokensToRegexp(result.tokens);
        result.regexStr = regex.source;
    } catch (err) {
        // If there is an error show our error link but still show original error or a formatted one if we can
        let errMatches;
        if ((0, _isError).default(err) && (errMatches = err.message.match(/at (\d{0,})/))) {
            const position = parseInt(errMatches[1], 10);
            console.error(`\nError parsing \`${route}\` ` + `https://nextjs.org/docs/messages/invalid-route-source\n` + `Reason: ${err.message}\n\n` + `  ${routePath}\n` + `  ${new Array(position).fill(' ').join('')}^\n`);
        } else {
            console.error(`\nError parsing ${route} https://nextjs.org/docs/messages/invalid-route-source`, err);
        }
        result.error = true;
    }
    return result;
}
function checkCustomRoutes(routes, type) {
    if (!Array.isArray(routes)) {
        console.error(`Error: ${type}s must return an array, received ${typeof routes}.\n` + `See here for more info: https://nextjs.org/docs/messages/routes-must-be-array`);
        process.exit(1);
    }
    let numInvalidRoutes = 0;
    let hadInvalidStatus = false;
    let hadInvalidHas = false;
    const allowedKeys = new Set([
        'source',
        'basePath',
        'locale',
        'has'
    ]);
    if (type === 'rewrite') {
        allowedKeys.add('destination');
    }
    if (type === 'redirect') {
        allowedKeys.add('statusCode');
        allowedKeys.add('permanent');
        allowedKeys.add('destination');
    }
    if (type === 'header') {
        allowedKeys.add('headers');
    }
    for (const route of routes){
        if (!route || typeof route !== 'object') {
            console.error(`The route ${JSON.stringify(route)} is not a valid object with \`source\` and \`${type === 'header' ? 'headers' : 'destination'}\``);
            numInvalidRoutes++;
            continue;
        }
        if (type === 'rewrite' && route.basePath === false && !(route.destination.startsWith('http://') || route.destination.startsWith('https://'))) {
            console.error(`The route ${route.source} rewrites urls outside of the basePath. Please use a destination that starts with \`http://\` or \`https://\` https://nextjs.org/docs/messages/invalid-external-rewrite`);
            numInvalidRoutes++;
            continue;
        }
        const keys = Object.keys(route);
        const invalidKeys = keys.filter((key)=>!allowedKeys.has(key)
        );
        const invalidParts = [];
        if (typeof route.basePath !== 'undefined' && route.basePath !== false) {
            invalidParts.push('`basePath` must be undefined or false');
        }
        if (typeof route.locale !== 'undefined' && route.locale !== false) {
            invalidParts.push('`locale` must be undefined or false');
        }
        if (typeof route.has !== 'undefined' && !Array.isArray(route.has)) {
            invalidParts.push('`has` must be undefined or valid has object');
            hadInvalidHas = true;
        } else if (route.has) {
            const invalidHasItems = [];
            for (const hasItem of route.has){
                let invalidHasParts = [];
                if (!allowedHasTypes.has(hasItem.type)) {
                    invalidHasParts.push(`invalid type "${hasItem.type}"`);
                }
                if (typeof hasItem.key !== 'string' && hasItem.type !== 'host') {
                    invalidHasParts.push(`invalid key "${hasItem.key}"`);
                }
                if (typeof hasItem.value !== 'undefined' && typeof hasItem.value !== 'string') {
                    invalidHasParts.push(`invalid value "${hasItem.value}"`);
                }
                if (typeof hasItem.value === 'undefined' && hasItem.type === 'host') {
                    invalidHasParts.push(`value is required for "host" type`);
                }
                if (invalidHasParts.length > 0) {
                    invalidHasItems.push(`${invalidHasParts.join(', ')} for ${JSON.stringify(hasItem)}`);
                }
            }
            if (invalidHasItems.length > 0) {
                hadInvalidHas = true;
                const itemStr = `item${invalidHasItems.length === 1 ? '' : 's'}`;
                console.error(`Invalid \`has\` ${itemStr}:\n` + invalidHasItems.join('\n'));
                console.error();
                invalidParts.push(`invalid \`has\` ${itemStr} found`);
            }
        }
        if (!route.source) {
            invalidParts.push('`source` is missing');
        } else if (typeof route.source !== 'string') {
            invalidParts.push('`source` is not a string');
        } else if (!route.source.startsWith('/')) {
            invalidParts.push('`source` does not start with /');
        }
        if (type === 'header') {
            invalidParts.push(...checkHeader(route));
        } else {
            let _route = route;
            if (!_route.destination) {
                invalidParts.push('`destination` is missing');
            } else if (typeof _route.destination !== 'string') {
                invalidParts.push('`destination` is not a string');
            } else if (type === 'rewrite' && !_route.destination.match(/^(\/|https:\/\/|http:\/\/)/)) {
                invalidParts.push('`destination` does not start with `/`, `http://`, or `https://`');
            }
        }
        if (type === 'redirect') {
            const result = checkRedirect(route);
            hadInvalidStatus = hadInvalidStatus || result.hadInvalidStatus;
            invalidParts.push(...result.invalidParts);
        }
        let sourceTokens;
        if (typeof route.source === 'string' && route.source.startsWith('/')) {
            // only show parse error if we didn't already show error
            // for not being a string
            const { tokens , error , regexStr  } = tryParsePath(route.source);
            if (error) {
                invalidParts.push('`source` parse failed');
            }
            if (regexStr && regexStr.length > 4096) {
                invalidParts.push('`source` exceeds max built length of 4096');
            }
            sourceTokens = tokens;
        }
        const hasSegments = new Set();
        if (route.has) {
            for (const hasItem of route.has){
                if (!hasItem.value && hasItem.key) {
                    hasSegments.add(hasItem.key);
                }
                if (hasItem.value) {
                    for (const match of hasItem.value.matchAll(namedGroupsRegex)){
                        if (match[1]) {
                            hasSegments.add(match[1]);
                        }
                    }
                    if (hasItem.type === 'host') {
                        hasSegments.add('host');
                    }
                }
            }
        }
        // make sure no unnamed patterns are attempted to be used in the
        // destination as this can cause confusion and is not allowed
        if (typeof route.destination === 'string') {
            if (route.destination.startsWith('/') && Array.isArray(sourceTokens)) {
                const unnamedInDest = new Set();
                for (const token of sourceTokens){
                    if (typeof token === 'object' && typeof token.name === 'number') {
                        const unnamedIndex = new RegExp(`:${token.name}(?!\\d)`);
                        if (route.destination.match(unnamedIndex)) {
                            unnamedInDest.add(`:${token.name}`);
                        }
                    }
                }
                if (unnamedInDest.size > 0) {
                    invalidParts.push(`\`destination\` has unnamed params ${[
                        ...unnamedInDest
                    ].join(', ')}`);
                } else {
                    const { tokens: destTokens , regexStr: destRegexStr , error: destinationParseFailed ,  } = tryParsePath(route.destination, true);
                    if (destRegexStr && destRegexStr.length > 4096) {
                        invalidParts.push('`destination` exceeds max built length of 4096');
                    }
                    if (destinationParseFailed) {
                        invalidParts.push('`destination` parse failed');
                    } else {
                        const sourceSegments = new Set(sourceTokens.map((item)=>typeof item === 'object' && item.name
                        ).filter(Boolean));
                        const invalidDestSegments = new Set();
                        for (const token of destTokens){
                            if (typeof token === 'object' && !sourceSegments.has(token.name) && !hasSegments.has(token.name)) {
                                invalidDestSegments.add(token.name);
                            }
                        }
                        if (invalidDestSegments.size) {
                            invalidParts.push(`\`destination\` has segments not in \`source\` or \`has\` (${[
                                ...invalidDestSegments, 
                            ].join(', ')})`);
                        }
                    }
                }
            }
        }
        const hasInvalidKeys = invalidKeys.length > 0;
        const hasInvalidParts = invalidParts.length > 0;
        if (hasInvalidKeys || hasInvalidParts) {
            console.error(`${invalidParts.join(', ')}${invalidKeys.length ? (hasInvalidParts ? ',' : '') + ` invalid field${invalidKeys.length === 1 ? '' : 's'}: ` + invalidKeys.join(',') : ''} for route ${JSON.stringify(route)}`);
            console.error();
            numInvalidRoutes++;
        }
    }
    if (numInvalidRoutes > 0) {
        if (hadInvalidStatus) {
            console.error(`\nValid redirect statusCode values are ${[
                ...allowedStatusCodes
            ].join(', ')}`);
        }
        if (hadInvalidHas) {
            console.error(`\nValid \`has\` object shape is ${JSON.stringify({
                type: [
                    ...allowedHasTypes
                ].join(', '),
                key: 'the key to check for',
                value: 'undefined or a value string to match against'
            }, null, 2)}`);
        }
        console.error();
        console.error(`Error: Invalid ${type}${numInvalidRoutes === 1 ? '' : 's'} found`);
        process.exit(1);
    }
}
function processRoutes(routes, config, type) {
    const _routes = routes;
    const newRoutes = [];
    const defaultLocales = [];
    if (config.i18n && type === 'redirect') {
        var ref;
        for (const item of ((ref = config.i18n) === null || ref === void 0 ? void 0 : ref.domains) || []){
            defaultLocales.push({
                locale: item.defaultLocale,
                base: `http${item.http ? '' : 's'}://${item.domain}`
            });
        }
        defaultLocales.push({
            locale: config.i18n.defaultLocale,
            base: ''
        });
    }
    for (const r of _routes){
        var ref;
        const srcBasePath = config.basePath && r.basePath !== false ? config.basePath : '';
        const isExternal = !((ref = r.destination) === null || ref === void 0 ? void 0 : ref.startsWith('/'));
        const destBasePath = srcBasePath && !isExternal ? srcBasePath : '';
        if (config.i18n && r.locale !== false) {
            var ref1;
            if (!isExternal) {
                defaultLocales.forEach((item)=>{
                    let destination;
                    if (r.destination) {
                        destination = item.base ? `${item.base}${destBasePath}${r.destination}` : `${destBasePath}${r.destination}`;
                    }
                    newRoutes.push({
                        ...r,
                        destination,
                        source: `${srcBasePath}/${item.locale}${r.source}`
                    });
                });
            }
            r.source = `/:nextInternalLocale(${config.i18n.locales.map((locale)=>(0, _escapeRegexp).escapeStringRegexp(locale)
            ).join('|')})${r.source === '/' && !config.trailingSlash ? '' : r.source}`;
            if (r.destination && ((ref1 = r.destination) === null || ref1 === void 0 ? void 0 : ref1.startsWith('/'))) {
                r.destination = `/:nextInternalLocale${r.destination === '/' && !config.trailingSlash ? '' : r.destination}`;
            }
        }
        r.source = `${srcBasePath}${r.source === '/' && srcBasePath ? '' : r.source}`;
        if (r.destination) {
            r.destination = `${destBasePath}${r.destination === '/' && destBasePath ? '' : r.destination}`;
        }
        newRoutes.push(r);
    }
    return newRoutes;
}
async function loadRedirects(config) {
    if (typeof config.redirects !== 'function') {
        return [];
    }
    let redirects = await config.redirects();
    // check before we process the routes and after to ensure
    // they are still valid
    checkCustomRoutes(redirects, 'redirect');
    redirects = processRoutes(redirects, config, 'redirect');
    checkCustomRoutes(redirects, 'redirect');
    return redirects;
}
async function loadRewrites(config) {
    if (typeof config.rewrites !== 'function') {
        return {
            beforeFiles: [],
            afterFiles: [],
            fallback: []
        };
    }
    const _rewrites = await config.rewrites();
    let beforeFiles = [];
    let afterFiles = [];
    let fallback = [];
    if (!Array.isArray(_rewrites) && typeof _rewrites === 'object' && Object.keys(_rewrites).every((key)=>key === 'beforeFiles' || key === 'afterFiles' || key === 'fallback'
    )) {
        beforeFiles = _rewrites.beforeFiles || [];
        afterFiles = _rewrites.afterFiles || [];
        fallback = _rewrites.fallback || [];
    } else {
        afterFiles = _rewrites;
    }
    // check before we process the routes and after to ensure
    // they are still valid
    checkCustomRoutes(beforeFiles, 'rewrite');
    checkCustomRoutes(afterFiles, 'rewrite');
    checkCustomRoutes(fallback, 'rewrite');
    beforeFiles = processRoutes(beforeFiles, config, 'rewrite');
    afterFiles = processRoutes(afterFiles, config, 'rewrite');
    fallback = processRoutes(fallback, config, 'rewrite');
    checkCustomRoutes(beforeFiles, 'rewrite');
    checkCustomRoutes(afterFiles, 'rewrite');
    checkCustomRoutes(fallback, 'rewrite');
    return {
        beforeFiles,
        afterFiles,
        fallback
    };
}
async function loadHeaders(config) {
    if (typeof config.headers !== 'function') {
        return [];
    }
    let headers = await config.headers();
    // check before we process the routes and after to ensure
    // they are still valid
    checkCustomRoutes(headers, 'header');
    headers = processRoutes(headers, config, 'header');
    checkCustomRoutes(headers, 'header');
    return headers;
}
async function loadCustomRoutes(config) {
    const [headers, rewrites, redirects] = await Promise.all([
        loadHeaders(config),
        loadRewrites(config),
        loadRedirects(config), 
    ]);
    const totalRewrites = rewrites.beforeFiles.length + rewrites.afterFiles.length + rewrites.fallback.length;
    const totalRoutes = headers.length + redirects.length + totalRewrites;
    if (totalRoutes > 1000) {
        console.warn(_chalk.default.bold.yellow(`Warning: `) + `total number of custom routes exceeds 1000, this can reduce performance. Route counts:\n` + `headers: ${headers.length}\n` + `rewrites: ${totalRewrites}\n` + `redirects: ${redirects.length}\n` + `See more info: https://nextjs.org/docs/messages/max-custom-routes-reached`);
    }
    if (config.trailingSlash) {
        redirects.unshift({
            source: '/:file((?!\\.well-known(?:/.*)?)(?:[^/]+/)*[^/]+\\.\\w+)/',
            destination: '/:file',
            permanent: true,
            locale: config.i18n ? false : undefined,
            internal: true
        }, {
            source: '/:notfile((?!\\.well-known(?:/.*)?)(?:[^/]+/)*[^/\\.]+)',
            destination: '/:notfile/',
            permanent: true,
            locale: config.i18n ? false : undefined,
            internal: true
        });
        if (config.basePath) {
            redirects.unshift({
                source: config.basePath,
                destination: config.basePath + '/',
                permanent: true,
                basePath: false,
                locale: config.i18n ? false : undefined,
                internal: true
            });
        }
    } else {
        redirects.unshift({
            source: '/:path+/',
            destination: '/:path+',
            permanent: true,
            locale: config.i18n ? false : undefined,
            internal: true
        });
        if (config.basePath) {
            redirects.unshift({
                source: config.basePath + '/',
                destination: config.basePath,
                permanent: true,
                basePath: false,
                locale: config.i18n ? false : undefined,
                internal: true
            });
        }
    }
    return {
        headers,
        rewrites,
        redirects
    };
}

//# sourceMappingURL=load-custom-routes.js.map

/***/ }),

/***/ 607:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var _nodeFetch = _interopRequireWildcard(__webpack_require__(4809));
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {
        };
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {
                    };
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
// Polyfill fetch() in the Node.js environment
if (!global.fetch) {
    const agent = ({ protocol  })=>protocol === 'http:' ? global.__NEXT_HTTP_AGENT : global.__NEXT_HTTPS_AGENT
    ;
    const fetchWithAgent = (url, opts, ...rest)=>{
        if (!opts) {
            opts = {
                agent
            };
        } else if (!opts.agent) {
            opts.agent = agent;
        }
        return (0, _nodeFetch).default(url, opts, ...rest);
    };
    global.fetch = fetchWithAgent;
    global.Headers = _nodeFetch.Headers;
    global.Request = _nodeFetch.Request;
    global.Response = _nodeFetch.Response;
}

//# sourceMappingURL=node-polyfill-fetch.js.map

/***/ })

};
;