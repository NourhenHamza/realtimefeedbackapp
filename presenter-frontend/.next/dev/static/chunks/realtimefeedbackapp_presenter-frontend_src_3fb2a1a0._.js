(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/realtimefeedbackapp/presenter-frontend/src/components/ConnectionStatus.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConnectionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
'use client';
;
;
function ConnectionStatus(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
    if ($[0] !== "fcd1ffa3773537fe8729595791d3e33a4484c27109867190fa8b59523d9ce3b3") {
        for(let $i = 0; $i < 25; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fcd1ffa3773537fe8729595791d3e33a4484c27109867190fa8b59523d9ce3b3";
    }
    const { status, onReconnect } = t0;
    let t1;
    if ($[1] !== status) {
        const getStatusConfig = {
            "ConnectionStatus[getStatusConfig]": ()=>{
                switch(status){
                    case "connected":
                        {
                            return {
                                color: "bg-green-500",
                                text: "Connected",
                                textColor: "text-green-700",
                                bgColor: "bg-green-50",
                                icon: "\u2713"
                            };
                        }
                    case "connecting":
                        {
                            return {
                                color: "bg-yellow-500",
                                text: "Connecting...",
                                textColor: "text-yellow-700",
                                bgColor: "bg-yellow-50",
                                icon: "\u27F3"
                            };
                        }
                    case "disconnected":
                        {
                            return {
                                color: "bg-gray-500",
                                text: "Disconnected",
                                textColor: "text-gray-700",
                                bgColor: "bg-gray-50",
                                icon: "\u25CB"
                            };
                        }
                    case "error":
                        {
                            return {
                                color: "bg-red-500",
                                text: "Connection Error",
                                textColor: "text-red-700",
                                bgColor: "bg-red-50",
                                icon: "\u2715"
                            };
                        }
                }
            }
        }["ConnectionStatus[getStatusConfig]"];
        t1 = getStatusConfig();
        $[1] = status;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const config = t1;
    const t2 = `${config.bgColor} rounded-lg px-4 py-2 flex items-center justify-between`;
    const t3 = `${config.color} w-3 h-3 rounded-full`;
    let t4;
    if ($[3] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t3
        }, void 0, false, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ConnectionStatus.tsx",
            lineNumber: 80,
            columnNumber: 10
        }, this);
        $[3] = t3;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] !== config.color || $[6] !== status) {
        t5 = status === "connecting" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `${config.color} absolute w-3 h-3 rounded-full animate-ping opacity-75`
        }, void 0, false, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ConnectionStatus.tsx",
            lineNumber: 88,
            columnNumber: 37
        }, this);
        $[5] = config.color;
        $[6] = status;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t4 || $[9] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex items-center",
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ConnectionStatus.tsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        $[8] = t4;
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    const t7 = `font-medium text-sm ${config.textColor}`;
    let t8;
    if ($[11] !== config.icon || $[12] !== config.text || $[13] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t7,
            children: [
                config.icon,
                " ",
                config.text
            ]
        }, void 0, true, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ConnectionStatus.tsx",
            lineNumber: 107,
            columnNumber: 10
        }, this);
        $[11] = config.icon;
        $[12] = config.text;
        $[13] = t7;
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    let t9;
    if ($[15] !== t6 || $[16] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center space-x-3",
            children: [
                t6,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ConnectionStatus.tsx",
            lineNumber: 117,
            columnNumber: 10
        }, this);
        $[15] = t6;
        $[16] = t8;
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    let t10;
    if ($[18] !== onReconnect || $[19] !== status) {
        t10 = (status === "disconnected" || status === "error") && onReconnect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onReconnect,
            className: "text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200",
            children: "Reconnect"
        }, void 0, false, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ConnectionStatus.tsx",
            lineNumber: 126,
            columnNumber: 79
        }, this);
        $[18] = onReconnect;
        $[19] = status;
        $[20] = t10;
    } else {
        t10 = $[20];
    }
    let t11;
    if ($[21] !== t10 || $[22] !== t2 || $[23] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: [
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ConnectionStatus.tsx",
            lineNumber: 135,
            columnNumber: 11
        }, this);
        $[21] = t10;
        $[22] = t2;
        $[23] = t9;
        $[24] = t11;
    } else {
        t11 = $[24];
    }
    return t11;
}
_c = ConnectionStatus;
var _c;
__turbopack_context__.k.register(_c, "ConnectionStatus");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuestionFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
'use client';
;
;
function QuestionFeed(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(17);
    if ($[0] !== "8a38a7313c2b29cce8dd322178cbe0ae7d4148425e457d6a5001bc418d6b0f09") {
        for(let $i = 0; $i < 17; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8a38a7313c2b29cce8dd322178cbe0ae7d4148425e457d6a5001bc418d6b0f09";
    }
    const { questions } = t0;
    let t1;
    let t2;
    let t3;
    let t4;
    if ($[1] !== questions) {
        const sortedQuestions = [
            ...questions
        ].sort(_QuestionFeedAnonymous);
        const formatTime = _QuestionFeedFormatTime;
        const getTimeAgo = _QuestionFeedGetTimeAgo;
        const getInitials = _QuestionFeedGetInitials;
        t3 = "space-y-4";
        let t5;
        if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold text-gray-800 dark:text-white",
                children: "Questions"
            }, void 0, false, {
                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                lineNumber: 31,
                columnNumber: 12
            }, this);
            $[6] = t5;
        } else {
            t5 = $[6];
        }
        const t6 = questions.length === 1 ? "question" : "questions";
        if ($[7] !== questions.length || $[8] !== t6) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    t5,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-medium text-gray-600 dark:text-gray-400",
                        children: [
                            questions.length,
                            " ",
                            t6
                        ]
                    }, void 0, true, {
                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                        lineNumber: 38,
                        columnNumber: 67
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                lineNumber: 38,
                columnNumber: 12
            }, this);
            $[7] = questions.length;
            $[8] = t6;
            $[9] = t4;
        } else {
            t4 = $[9];
        }
        t1 = "space-y-3 max-h-[600px] overflow-y-auto pr-2";
        t2 = sortedQuestions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-4xl mb-3",
                    children: "💬"
                }, void 0, false, {
                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                    lineNumber: 46,
                    columnNumber: 113
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "No questions yet. They'll appear here in real-time."
                }, void 0, false, {
                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                    lineNumber: 46,
                    columnNumber: 152
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
            lineNumber: 46,
            columnNumber: 41
        }, this) : sortedQuestions.map({
            "QuestionFeed[sortedQuestions.map()]": (question, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 pulse-once border-l-4 border-blue-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white text-sm font-bold",
                                                children: getInitials(question.user_name)
                                            }, void 0, false, {
                                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                                                lineNumber: 47,
                                                columnNumber: 492
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                                            lineNumber: 47,
                                            columnNumber: 359
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col",
                                            children: [
                                                question.user_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-semibold text-gray-800 dark:text-gray-200",
                                                    children: question.user_name
                                                }, void 0, false, {
                                                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 639
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-500 dark:text-gray-400",
                                                    children: getTimeAgo(question.timestamp)
                                                }, void 0, false, {
                                                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 740
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                                            lineNumber: 47,
                                            columnNumber: 585
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                                    lineNumber: 47,
                                    columnNumber: 314
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400 dark:text-gray-500",
                                    children: formatTime(question.timestamp)
                                }, void 0, false, {
                                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                                    lineNumber: 47,
                                    columnNumber: 850
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                            lineNumber: 47,
                            columnNumber: 259
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-800 dark:text-gray-200 leading-relaxed pl-13",
                            children: question.question_text
                        }, void 0, false, {
                            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                            lineNumber: 47,
                            columnNumber: 954
                        }, this)
                    ]
                }, `${question.timestamp}-${index}`, true, {
                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
                    lineNumber: 47,
                    columnNumber: 67
                }, this)
        }["QuestionFeed[sortedQuestions.map()]"]);
        $[1] = questions;
        $[2] = t1;
        $[3] = t2;
        $[4] = t3;
        $[5] = t4;
    } else {
        t1 = $[2];
        t2 = $[3];
        t3 = $[4];
        t4 = $[5];
    }
    let t5;
    if ($[10] !== t1 || $[11] !== t2) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[10] = t1;
        $[11] = t2;
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    let t6;
    if ($[13] !== t3 || $[14] !== t4 || $[15] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, this);
        $[13] = t3;
        $[14] = t4;
        $[15] = t5;
        $[16] = t6;
    } else {
        t6 = $[16];
    }
    return t6;
}
_c = QuestionFeed;
function _QuestionFeedGetInitials(name) {
    if (!name) {
        return "?";
    }
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
        return parts[0][0].toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function _QuestionFeedGetTimeAgo(timestamp_0) {
    const now = new Date().getTime();
    const time = new Date(timestamp_0).getTime();
    const diff = Math.floor((now - time) / 1000);
    if (diff < 60) {
        return "Just now";
    }
    if (diff < 3600) {
        return `${Math.floor(diff / 60)}m ago`;
    }
    if (diff < 86400) {
        return `${Math.floor(diff / 3600)}h ago`;
    }
    return `${Math.floor(diff / 86400)}d ago`;
}
function _QuestionFeedFormatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}
function _QuestionFeedAnonymous(a, b) {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
}
var _c;
__turbopack_context__.k.register(_c, "QuestionFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReactionDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
'use client';
;
;
const reactionConfig = {
    SPEED_UP: {
        label: 'Speed Up',
        icon: '⚡',
        color: 'text-green-700',
        bgColor: 'bg-green-100'
    },
    SLOW_DOWN: {
        label: 'Slow Down',
        icon: '🐌',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100'
    },
    SHOW_CODE: {
        label: 'Show Code',
        icon: '💻',
        color: 'text-blue-700',
        bgColor: 'bg-blue-100'
    },
    IM_LOST: {
        label: "I'm Lost",
        icon: '😵',
        color: 'text-red-700',
        bgColor: 'bg-red-100'
    }
};
function ReactionDisplay(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(21);
    if ($[0] !== "e789d17f11905aa97b1ec40c57c448380a3f7131427d29fcc520e54e40e8ad11") {
        for(let $i = 0; $i < 21; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e789d17f11905aa97b1ec40c57c448380a3f7131427d29fcc520e54e40e8ad11";
    }
    const { reactions } = t0;
    let counts;
    if ($[1] !== reactions) {
        counts = {
            SPEED_UP: 0,
            SLOW_DOWN: 0,
            SHOW_CODE: 0,
            IM_LOST: 0
        };
        reactions.forEach({
            "ReactionDisplay[reactions.forEach()]": (reaction)=>{
                counts[reaction.reaction_type] = (counts[reaction.reaction_type] || 0) + 1;
            }
        }["ReactionDisplay[reactions.forEach()]"]);
        $[1] = reactions;
        $[2] = counts;
    } else {
        counts = $[2];
    }
    const reactionCounts = counts;
    let t1;
    if ($[3] !== reactionCounts) {
        t1 = Object.values(reactionCounts).reduce(_ReactionDisplayAnonymous, 0);
        $[3] = reactionCounts;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const totalReactions = t1;
    let t2;
    if ($[5] !== totalReactions) {
        t2 = ({
            "ReactionDisplay[getPercentage]": (count_0)=>{
                if (totalReactions === 0) {
                    return 0;
                }
                return Math.round(count_0 / totalReactions * 100);
            }
        })["ReactionDisplay[getPercentage]"];
        $[5] = totalReactions;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    const getPercentage = t2;
    let t3;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-bold text-gray-800 dark:text-white",
            children: "Live Reactions"
        }, void 0, false, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== totalReactions) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-medium text-gray-600 dark:text-gray-400",
                    children: [
                        "Total: ",
                        totalReactions
                    ]
                }, void 0, true, {
                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                    lineNumber: 104,
                    columnNumber: 65
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
            lineNumber: 104,
            columnNumber: 10
        }, this);
        $[8] = totalReactions;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = Object.keys(reactionConfig);
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== getPercentage || $[12] !== reactionCounts) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: t5.map({
                "ReactionDisplay[(anonymous)()]": (type)=>{
                    const config = reactionConfig[type];
                    const count_1 = reactionCounts[type];
                    const percentage = getPercentage(count_1);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${config.bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-4xl",
                                                role: "img",
                                                "aria-label": config.label,
                                                children: config.icon
                                            }, void 0, false, {
                                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                                                lineNumber: 124,
                                                columnNumber: 226
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-semibold ${config.color}`,
                                                children: config.label
                                            }, void 0, false, {
                                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                                                lineNumber: 124,
                                                columnNumber: 310
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                                        lineNumber: 124,
                                        columnNumber: 181
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-3xl font-bold ${config.color}`,
                                        children: count_1
                                    }, void 0, false, {
                                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                                        lineNumber: 124,
                                        columnNumber: 387
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                                lineNumber: 124,
                                columnNumber: 125
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-white dark:bg-gray-700 rounded-full h-2 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-full ${config.color.replace("text-", "bg-")} transition-all duration-500`,
                                    style: {
                                        width: `${percentage}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                                    lineNumber: 124,
                                    columnNumber: 547
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                                lineNumber: 124,
                                columnNumber: 464
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-right text-sm mt-1 ${config.color} font-medium`,
                                children: [
                                    percentage,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                                lineNumber: 126,
                                columnNumber: 26
                            }, this)
                        ]
                    }, type, true, {
                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 124,
                        columnNumber: 18
                    }, this);
                }
            }["ReactionDisplay[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
            lineNumber: 119,
            columnNumber: 10
        }, this);
        $[11] = getPercentage;
        $[12] = reactionCounts;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    let t7;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-lg font-semibold text-gray-800 dark:text-white mb-4",
            children: "Recent Activity"
        }, void 0, false, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
            lineNumber: 137,
            columnNumber: 10
        }, this);
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== reactions) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto",
                    children: reactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 dark:text-gray-400 text-center py-4",
                        children: "No reactions yet"
                    }, void 0, false, {
                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 144,
                        columnNumber: 147
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: reactions.slice(0, 10).map(_ReactionDisplayAnonymous2)
                    }, void 0, false, {
                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 144,
                        columnNumber: 235
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                    lineNumber: 144,
                    columnNumber: 36
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
            lineNumber: 144,
            columnNumber: 10
        }, this);
        $[15] = reactions;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== t4 || $[18] !== t6 || $[19] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t4,
                t6,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
            lineNumber: 152,
            columnNumber: 10
        }, this);
        $[17] = t4;
        $[18] = t6;
        $[19] = t8;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    return t9;
}
_c = ReactionDisplay;
function _ReactionDisplayAnonymous2(reaction_0, index) {
    const config_0 = reactionConfig[reaction_0.reaction_type];
    const time = new Date(reaction_0.timestamp).toLocaleTimeString();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-sm bg-white dark:bg-gray-600 rounded-lg px-3 py-2 pulse-once",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xl",
                        children: config_0.icon
                    }, void 0, false, {
                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 165,
                        columnNumber: 213
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-gray-700 dark:text-gray-200",
                        children: config_0.label
                    }, void 0, false, {
                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 165,
                        columnNumber: 261
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                lineNumber: 165,
                columnNumber: 168
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-500 dark:text-gray-400 text-xs",
                children: time
            }, void 0, false, {
                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
                lineNumber: 165,
                columnNumber: 353
            }, this)
        ]
    }, `${reaction_0.timestamp}-${index}`, true, {
        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx",
        lineNumber: 165,
        columnNumber: 10
    }, this);
}
function _ReactionDisplayAnonymous(sum, count) {
    return sum + count;
}
var _c;
__turbopack_context__.k.register(_c, "ReactionDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/realtimefeedbackapp/presenter-frontend/src/hooks/useWebSocket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWebSocket",
    ()=>useWebSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useWebSocket({ url, onMessage, reconnectInterval = 3000, maxReconnectAttempts = 5 }) {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('disconnected');
    const wsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectAttemptsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const reconnectTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[connect]": ()=>{
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                return;
            }
            setStatus('connecting');
            try {
                const ws = new WebSocket(url);
                ws.onopen = ({
                    "useWebSocket.useCallback[connect]": ()=>{
                        console.log('WebSocket connected');
                        setStatus('connected');
                        reconnectAttemptsRef.current = 0;
                    }
                })["useWebSocket.useCallback[connect]"];
                ws.onmessage = ({
                    "useWebSocket.useCallback[connect]": (event)=>{
                        try {
                            const data = JSON.parse(event.data);
                            onMessage?.(data);
                        } catch (error_0) {
                            console.error('Error parsing WebSocket message:', error_0);
                        }
                    }
                })["useWebSocket.useCallback[connect]"];
                ws.onerror = ({
                    "useWebSocket.useCallback[connect]": (error_1)=>{
                        console.error('WebSocket error:', error_1);
                        setStatus('error');
                    }
                })["useWebSocket.useCallback[connect]"];
                ws.onclose = ({
                    "useWebSocket.useCallback[connect]": ()=>{
                        console.log('WebSocket disconnected');
                        setStatus('disconnected');
                        wsRef.current = null;
                        // Attempt to reconnect
                        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
                            reconnectAttemptsRef.current += 1;
                            console.log(`Reconnecting... (Attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts})`);
                            reconnectTimeoutRef.current = setTimeout({
                                "useWebSocket.useCallback[connect]": ()=>{
                                    connect();
                                }
                            }["useWebSocket.useCallback[connect]"], reconnectInterval);
                        } else {
                            console.log('Max reconnection attempts reached');
                        }
                    }
                })["useWebSocket.useCallback[connect]"];
                wsRef.current = ws;
            } catch (error) {
                console.error('Error creating WebSocket:', error);
                setStatus('error');
            }
        }
    }["useWebSocket.useCallback[connect]"], [
        url,
        onMessage,
        reconnectInterval,
        maxReconnectAttempts
    ]);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[disconnect]": ()=>{
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
            setStatus('disconnected');
        }
    }["useWebSocket.useCallback[disconnect]"], []);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[sendMessage]": (data_0)=>{
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify(data_0));
            } else {
                console.warn('WebSocket is not connected. Cannot send message.');
            }
        }
    }["useWebSocket.useCallback[sendMessage]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWebSocket.useEffect": ()=>{
            connect();
            return ({
                "useWebSocket.useEffect": ()=>{
                    disconnect();
                }
            })["useWebSocket.useEffect"];
        }
    }["useWebSocket.useEffect"], [
        connect,
        disconnect
    ]);
    return {
        status,
        sendMessage,
        reconnect: connect,
        disconnect
    };
}
_s(useWebSocket, "Uqh14ScsF7RDZCpGbA6bDW5afmc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/realtimefeedbackapp/presenter-frontend/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_PRESENTER_BACKEND_URL || 'http://localhost:8000';
const api = {
    /**
   * Fetch recent reactions
   */ async getReactions (sessionId, limit = 50) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE_URL}/api/presenter/reactions`, {
                params: {
                    session_id: sessionId,
                    limit
                },
                timeout: 5000
            });
            return response.data.reactions || [];
        } catch (error) {
            console.error('Error fetching reactions:', error);
            return [];
        }
    },
    /**
   * Fetch questions
   */ async getQuestions (sessionId) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE_URL}/api/presenter/questions`, {
                params: {
                    session_id: sessionId
                },
                timeout: 5000
            });
            return response.data.questions || [];
        } catch (error) {
            console.error('Error fetching questions:', error);
            return [];
        }
    },
    /**
   * Health check
   */ async healthCheck () {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE_URL}/health`);
            return response.status === 200;
        } catch (error) {
            console.error('Health check failed:', error);
            return false;
        }
    },
    /**
   * Get WebSocket URL
   */ getWebSocketUrl (sessionId) {
        const wsProtocol = API_BASE_URL.startsWith('https') ? 'wss' : 'ws';
        const baseUrl = API_BASE_URL.replace(/^https?:\/\//, '');
        return `${wsProtocol}://${baseUrl}/ws/presenter/${sessionId}`;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresenterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$components$2f$ConnectionStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/src/components/ConnectionStatus.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$components$2f$QuestionFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/src/components/QuestionFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$components$2f$ReactionDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/src/components/ReactionDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/src/hooks/useWebSocket.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/realtimefeedbackapp/presenter-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function PresenterPage() {
    _s();
    const [sessionId, setSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSessionActive, setIsSessionActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reactions, setReactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Handle WebSocket messages
    const handleWebSocketMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PresenterPage.useCallback[handleWebSocketMessage]": (data)=>{
            console.log('WebSocket message received:', data);
            if (data.type === 'reaction') {
                setReactions({
                    "PresenterPage.useCallback[handleWebSocketMessage]": (prev)=>[
                            data.data,
                            ...prev
                        ].slice(0, 100)
                }["PresenterPage.useCallback[handleWebSocketMessage]"]);
            } else if (data.type === 'question') {
                setQuestions({
                    "PresenterPage.useCallback[handleWebSocketMessage]": (prev_0)=>[
                            data.data,
                            ...prev_0
                        ]
                }["PresenterPage.useCallback[handleWebSocketMessage]"]);
            }
        }
    }["PresenterPage.useCallback[handleWebSocketMessage]"], []);
    // WebSocket connection
    const { status, reconnect, sendMessage, disconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebSocket"])({
        url: isSessionActive ? __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getWebSocketUrl(sessionId) : '',
        onMessage: handleWebSocketMessage
    });
    // Load initial data when session starts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PresenterPage.useEffect": ()=>{
            if (isSessionActive && sessionId) {
                const loadInitialData = {
                    "PresenterPage.useEffect.loadInitialData": async ()=>{
                        const [reactionsData, questionsData] = await Promise.all([
                            __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getReactions(sessionId, 50),
                            __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getQuestions(sessionId)
                        ]);
                        setReactions(reactionsData);
                        setQuestions(questionsData);
                    }
                }["PresenterPage.useEffect.loadInitialData"];
                loadInitialData();
            }
        }
    }["PresenterPage.useEffect"], [
        isSessionActive,
        sessionId
    ]);
    // Session management from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PresenterPage.useEffect": ()=>{
            const storedSessionId = localStorage.getItem('presenter_session_id');
            if (storedSessionId) {
                setSessionId(storedSessionId);
                setIsSessionActive(true);
            }
        }
    }["PresenterPage.useEffect"], []);
    const handleStartSession = async (e)=>{
        e.preventDefault();
        if (sessionId.trim()) {
            try {
                // Create session on backend
                const response = await fetch('http://localhost:8000/api/session/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        session_id: sessionId
                    })
                });
                const result = await response.json();
                if (response.ok) {
                    localStorage.setItem('presenter_session_id', sessionId);
                    setIsSessionActive(true);
                } else {
                    alert(`Failed to create session: ${result.detail || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error creating session:', error);
                alert('Failed to create session. Is the backend running?');
            }
        }
    };
    const handleEndSession = async ()=>{
        if (!window.confirm('Are you sure you want to end this session? All data will be deleted.')) {
            return;
        }
        try {
            // Send end_session message via WebSocket first
            sendMessage({
                type: 'end_session'
            });
            // Wait a bit for WebSocket message to be sent
            await new Promise((resolve)=>setTimeout(resolve, 100));
            // Disconnect WebSocket
            disconnect();
            // Call API to end the session
            const response_0 = await fetch(`http://localhost:8000/api/session/${sessionId}`, {
                method: 'DELETE'
            });
            if (response_0.ok) {
                localStorage.removeItem('presenter_session_id');
                setSessionId('');
                setIsSessionActive(false);
                setReactions([]);
                setQuestions([]);
            } else {
                const result_0 = await response_0.json();
                alert(`Failed to end session: ${result_0.detail || 'Unknown error'}`);
            }
        } catch (error_0) {
            console.error('Error ending session:', error_0);
            // Still cleanup locally even if API call fails
            localStorage.removeItem('presenter_session_id');
            setSessionId('');
            setIsSessionActive(false);
            setReactions([]);
            setQuestions([]);
        }
    };
    if (!isSessionActive) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mb-4",
                                children: "🎤"
                            }, void 0, false, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold text-gray-800 dark:text-white mb-2",
                                children: "Presenter Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 dark:text-gray-300",
                                children: "Create a session to start"
                            }, void 0, false, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleStartSession,
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "sessionId",
                                        className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                                        children: "Session ID"
                                    }, void 0, false, {
                                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "sessionId",
                                        value: sessionId,
                                        onChange: (e_0)=>setSessionId(e_0.target.value),
                                        placeholder: "e.g., session-123",
                                        className: "w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs text-gray-500 dark:text-gray-400",
                                        children: "Share this ID with your audience to let them join"
                                    }, void 0, false, {
                                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform active:scale-95 shadow-md hover:shadow-lg",
                                children: "Start Session"
                            }, void 0, false, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
            lineNumber: 124,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4 lg:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-gray-800 dark:text-white mb-2",
                                        children: "Presenter Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 dark:text-gray-300",
                                                children: [
                                                    "Session: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono font-semibold",
                                                        children: sessionId
                                                    }, void 0, false, {
                                                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 28
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                                lineNumber: 164,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    navigator.clipboard.writeText(sessionId);
                                                    alert('Session ID copied to clipboard!');
                                                },
                                                className: "text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-200",
                                                children: "Copy ID"
                                            }, void 0, false, {
                                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$components$2f$ConnectionStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        status: status,
                                        onReconnect: reconnect
                                    }, void 0, false, {
                                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleEndSession,
                                        className: "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200",
                                        children: "End Session"
                                    }, void 0, false, {
                                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$components$2f$ReactionDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                reactions: reactions
                            }, void 0, false, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$components$2f$QuestionFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                questions: questions
                            }, void 0, false, {
                                fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 text-center text-gray-600 dark:text-gray-400 text-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Updates appear in real-time • Audience joins at localhost:3000"
                    }, void 0, false, {
                        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
            lineNumber: 155,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/realtimefeedbackapp/presenter-frontend/src/app/page.tsx",
        lineNumber: 154,
        columnNumber: 10
    }, this);
}
_s(PresenterPage, "2Kc957Qg4rDRxH4fcwIrHsVL1w8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$realtimefeedbackapp$2f$presenter$2d$frontend$2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebSocket"]
    ];
});
_c = PresenterPage;
var _c;
__turbopack_context__.k.register(_c, "PresenterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=realtimefeedbackapp_presenter-frontend_src_3fb2a1a0._.js.map