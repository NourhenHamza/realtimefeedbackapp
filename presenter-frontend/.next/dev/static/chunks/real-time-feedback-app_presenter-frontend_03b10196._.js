(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConnectionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
'use client';
;
;
function ConnectionStatus(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
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
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t3
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
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
        t5 = status === "connecting" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `${config.color} absolute w-3 h-3 rounded-full animate-ping opacity-75`
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
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
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex items-center",
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
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
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t7,
            children: [
                config.icon,
                " ",
                config.text
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
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
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center space-x-3",
            children: [
                t6,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
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
        t10 = (status === "disconnected" || status === "error") && onReconnect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onReconnect,
            className: "text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200",
            children: "Reconnect"
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
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
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: [
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
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
"[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuestionFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
'use client';
;
;
function QuestionFeed(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(17);
    if ($[0] !== "e50ffe579673ea5c9c030864f39069ffacd3dec7770367e32e5d2b9c1c572072") {
        for(let $i = 0; $i < 17; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e50ffe579673ea5c9c030864f39069ffacd3dec7770367e32e5d2b9c1c572072";
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
        t3 = "space-y-4";
        let t5;
        if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold text-gray-800 dark:text-white",
                children: "Questions"
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                lineNumber: 30,
                columnNumber: 12
            }, this);
            $[6] = t5;
        } else {
            t5 = $[6];
        }
        const t6 = questions.length === 1 ? "question" : "questions";
        if ($[7] !== questions.length || $[8] !== t6) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    t5,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-medium text-gray-600 dark:text-gray-400",
                        children: [
                            questions.length,
                            " ",
                            t6
                        ]
                    }, void 0, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                        lineNumber: 37,
                        columnNumber: 67
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                lineNumber: 37,
                columnNumber: 12
            }, this);
            $[7] = questions.length;
            $[8] = t6;
            $[9] = t4;
        } else {
            t4 = $[9];
        }
        t1 = "space-y-3 max-h-[600px] overflow-y-auto pr-2";
        t2 = sortedQuestions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-4xl mb-3",
                    children: "💬"
                }, void 0, false, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                    lineNumber: 45,
                    columnNumber: 113
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "No questions yet. They'll appear here in real-time."
                }, void 0, false, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                    lineNumber: 45,
                    columnNumber: 152
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
            lineNumber: 45,
            columnNumber: 41
        }, this) : sortedQuestions.map({
            "QuestionFeed[sortedQuestions.map()]": (question, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 pulse-once border-l-4 border-blue-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-blue-600 dark:text-blue-300 text-sm font-bold",
                                                children: "Q"
                                            }, void 0, false, {
                                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                                lineNumber: 46,
                                                columnNumber: 459
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                            lineNumber: 46,
                                            columnNumber: 359
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium text-gray-500 dark:text-gray-400",
                                            children: getTimeAgo(question.timestamp)
                                        }, void 0, false, {
                                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                            lineNumber: 46,
                                            columnNumber: 542
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                    lineNumber: 46,
                                    columnNumber: 314
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400 dark:text-gray-500",
                                    children: formatTime(question.timestamp)
                                }, void 0, false, {
                                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                    lineNumber: 46,
                                    columnNumber: 658
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                            lineNumber: 46,
                            columnNumber: 259
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-800 dark:text-gray-200 leading-relaxed",
                            children: question.question_text
                        }, void 0, false, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                            lineNumber: 46,
                            columnNumber: 762
                        }, this)
                    ]
                }, `${question.timestamp}-${index}`, true, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                    lineNumber: 46,
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
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
            lineNumber: 61,
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
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
            lineNumber: 70,
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
"[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReactionDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(21);
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
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-bold text-gray-800 dark:text-white",
            children: "Live Reactions"
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== totalReactions) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm font-medium text-gray-600 dark:text-gray-400",
                    children: [
                        "Total: ",
                        totalReactions
                    ]
                }, void 0, true, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                    lineNumber: 104,
                    columnNumber: 65
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
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
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: t5.map({
                "ReactionDisplay[(anonymous)()]": (type)=>{
                    const config = reactionConfig[type];
                    const count_1 = reactionCounts[type];
                    const percentage = getPercentage(count_1);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${config.bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-4xl",
                                                role: "img",
                                                "aria-label": config.label,
                                                children: config.icon
                                            }, void 0, false, {
                                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                                lineNumber: 124,
                                                columnNumber: 226
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-semibold ${config.color}`,
                                                children: config.label
                                            }, void 0, false, {
                                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                                lineNumber: 124,
                                                columnNumber: 310
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                        lineNumber: 124,
                                        columnNumber: 181
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-3xl font-bold ${config.color}`,
                                        children: count_1
                                    }, void 0, false, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                        lineNumber: 124,
                                        columnNumber: 387
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                lineNumber: 124,
                                columnNumber: 125
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-white dark:bg-gray-700 rounded-full h-2 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-full ${config.color.replace("text-", "bg-")} transition-all duration-500`,
                                    style: {
                                        width: `${percentage}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                    lineNumber: 124,
                                    columnNumber: 547
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                lineNumber: 124,
                                columnNumber: 464
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-right text-sm mt-1 ${config.color} font-medium`,
                                children: [
                                    percentage,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                lineNumber: 126,
                                columnNumber: 26
                            }, this)
                        ]
                    }, type, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 124,
                        columnNumber: 18
                    }, this);
                }
            }["ReactionDisplay[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
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
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-lg font-semibold text-gray-800 dark:text-white mb-4",
            children: "Recent Activity"
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
            lineNumber: 137,
            columnNumber: 10
        }, this);
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== reactions) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto",
                    children: reactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 dark:text-gray-400 text-center py-4",
                        children: "No reactions yet"
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 144,
                        columnNumber: 147
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: reactions.slice(0, 10).map(_ReactionDisplayAnonymous2)
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 144,
                        columnNumber: 235
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                    lineNumber: 144,
                    columnNumber: 36
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
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
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t4,
                t6,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between text-sm bg-white dark:bg-gray-600 rounded-lg px-3 py-2 pulse-once",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xl",
                        children: config_0.icon
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 165,
                        columnNumber: 213
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-gray-700 dark:text-gray-200",
                        children: config_0.label
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 165,
                        columnNumber: 261
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                lineNumber: 165,
                columnNumber: 168
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-500 dark:text-gray-400 text-xs",
                children: time
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                lineNumber: 165,
                columnNumber: 353
            }, this)
        ]
    }, `${reaction_0.timestamp}-${index}`, true, {
        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
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
"[project]/real-time-feedback-app/presenter-frontend/src/hooks/useWebSocket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWebSocket",
    ()=>useWebSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useWebSocket({ url, onMessage, reconnectInterval = 3000, maxReconnectAttempts = 5 }) {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('disconnected');
    const wsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectAttemptsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const reconnectTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
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
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
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
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[sendMessage]": (data_0)=>{
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify(data_0));
            } else {
                console.warn('WebSocket is not connected. Cannot send message.');
            }
        }
    }["useWebSocket.useCallback[sendMessage]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
"[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresenterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$ConnectionStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$QuestionFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$ReactionDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/src/hooks/useWebSocket.ts [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/lib/api'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function PresenterPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(53);
    if ($[0] !== "07b88e2d8523423a2a1b90a7e481decaf789c2c0aaec5ee62cad86062adc3387") {
        for(let $i = 0; $i < 53; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "07b88e2d8523423a2a1b90a7e481decaf789c2c0aaec5ee62cad86062adc3387";
    }
    const [sessionId, setSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSessionActive, setIsSessionActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [reactions, setReactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "PresenterPage[handleWebSocketMessage]": (data)=>{
                console.log("WebSocket message received:", data);
                if (data.type === "reaction") {
                    setReactions({
                        "PresenterPage[handleWebSocketMessage > setReactions()]": (prev)=>[
                                data.data,
                                ...prev
                            ].slice(0, 100)
                    }["PresenterPage[handleWebSocketMessage > setReactions()]"]);
                } else {
                    if (data.type === "question") {
                        setQuestions({
                            "PresenterPage[handleWebSocketMessage > setQuestions()]": (prev_0)=>[
                                    data.data,
                                    ...prev_0
                                ]
                        }["PresenterPage[handleWebSocketMessage > setQuestions()]"]);
                    }
                }
            }
        })["PresenterPage[handleWebSocketMessage]"];
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const handleWebSocketMessage = t2;
    let t3;
    if ($[4] !== isSessionActive || $[5] !== sessionId) {
        t3 = isSessionActive ? api.getWebSocketUrl(sessionId) : "";
        $[4] = isSessionActive;
        $[5] = sessionId;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t3) {
        t4 = {
            url: t3,
            onMessage: handleWebSocketMessage
        };
        $[7] = t3;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    const { status, reconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebSocket"])(t4);
    let t5;
    let t6;
    if ($[9] !== isSessionActive || $[10] !== sessionId) {
        t5 = ({
            "PresenterPage[useEffect()]": ()=>{
                if (isSessionActive && sessionId) {
                    const loadInitialData = {
                        "PresenterPage[useEffect() > loadInitialData]": async ()=>{
                            const [reactionsData, questionsData] = await Promise.all([
                                api.getReactions(sessionId, 50),
                                api.getQuestions(sessionId)
                            ]);
                            setReactions(reactionsData);
                            setQuestions(questionsData);
                        }
                    }["PresenterPage[useEffect() > loadInitialData]"];
                    loadInitialData();
                }
            }
        })["PresenterPage[useEffect()]"];
        t6 = [
            isSessionActive,
            sessionId
        ];
        $[9] = isSessionActive;
        $[10] = sessionId;
        $[11] = t5;
        $[12] = t6;
    } else {
        t5 = $[11];
        t6 = $[12];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t5, t6);
    let t7;
    let t8;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "PresenterPage[useEffect()]": ()=>{
                const storedSessionId = localStorage.getItem("presenter_session_id");
                if (storedSessionId) {
                    setSessionId(storedSessionId);
                    setIsSessionActive(true);
                }
            }
        })["PresenterPage[useEffect()]"];
        t8 = [];
        $[13] = t7;
        $[14] = t8;
    } else {
        t7 = $[13];
        t8 = $[14];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t7, t8);
    let t9;
    if ($[15] !== sessionId) {
        t9 = ({
            "PresenterPage[handleStartSession]": (e)=>{
                e.preventDefault();
                if (sessionId.trim()) {
                    localStorage.setItem("presenter_session_id", sessionId);
                    setIsSessionActive(true);
                }
            }
        })["PresenterPage[handleStartSession]"];
        $[15] = sessionId;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    const handleStartSession = t9;
    let t10;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = ({
            "PresenterPage[handleEndSession]": ()=>{
                localStorage.removeItem("presenter_session_id");
                setSessionId("");
                setIsSessionActive(false);
                setReactions([]);
                setQuestions([]);
            }
        })["PresenterPage[handleEndSession]"];
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    const handleEndSession = t10;
    if (!isSessionActive) {
        let t11;
        if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl mb-4",
                        children: "🎤"
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                        lineNumber: 166,
                        columnNumber: 47
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-gray-800 dark:text-white mb-2",
                        children: "Presenter Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                        lineNumber: 166,
                        columnNumber: 86
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 dark:text-gray-300",
                        children: "Create or join a session to start"
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                        lineNumber: 166,
                        columnNumber: 180
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 166,
                columnNumber: 13
            }, this);
            $[18] = t11;
        } else {
            t11 = $[18];
        }
        let t12;
        if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
            t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "sessionId",
                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                children: "Session ID"
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 173,
                columnNumber: 13
            }, this);
            $[19] = t12;
        } else {
            t12 = $[19];
        }
        let t13;
        if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
            t13 = ({
                "PresenterPage[<input>.onChange]": (e_0)=>setSessionId(e_0.target.value)
            })["PresenterPage[<input>.onChange]"];
            $[20] = t13;
        } else {
            t13 = $[20];
        }
        let t14;
        if ($[21] !== sessionId) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                id: "sessionId",
                value: sessionId,
                onChange: t13,
                placeholder: "e.g., session-123",
                className: "w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                required: true
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 189,
                columnNumber: 13
            }, this);
            $[21] = sessionId;
            $[22] = t14;
        } else {
            t14 = $[22];
        }
        let t15;
        if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-xs text-gray-500 dark:text-gray-400",
                children: "Share this ID with your audience to let them join"
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 197,
                columnNumber: 13
            }, this);
            $[23] = t15;
        } else {
            t15 = $[23];
        }
        let t16;
        if ($[24] !== t14) {
            t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t12,
                    t14,
                    t15
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 204,
                columnNumber: 13
            }, this);
            $[24] = t14;
            $[25] = t16;
        } else {
            t16 = $[25];
        }
        let t17;
        if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
            t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform active:scale-95 shadow-md hover:shadow-lg",
                children: "Start Session"
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 212,
                columnNumber: 13
            }, this);
            $[26] = t17;
        } else {
            t17 = $[26];
        }
        let t18;
        if ($[27] !== handleStartSession || $[28] !== t16) {
            t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full",
                    children: [
                        t11,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleStartSession,
                            className: "space-y-6",
                            children: [
                                t16,
                                t17
                            ]
                        }, void 0, true, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                            lineNumber: 219,
                            columnNumber: 253
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                    lineNumber: 219,
                    columnNumber: 162
                }, this)
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 219,
                columnNumber: 13
            }, this);
            $[27] = handleStartSession;
            $[28] = t16;
            $[29] = t18;
        } else {
            t18 = $[29];
        }
        return t18;
    }
    let t11;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-3xl font-bold text-gray-800 dark:text-white mb-2",
            children: "Presenter Dashboard"
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 230,
            columnNumber: 11
        }, this);
        $[30] = t11;
    } else {
        t11 = $[30];
    }
    let t12;
    if ($[31] !== sessionId) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 dark:text-gray-300",
                            children: [
                                "Session: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono font-semibold",
                                    children: sessionId
                                }, void 0, false, {
                                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 131
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                            lineNumber: 237,
                            columnNumber: 66
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: {
                                "PresenterPage[<button>.onClick]": ()=>{
                                    navigator.clipboard.writeText(sessionId);
                                    alert("Session ID copied to clipboard!");
                                }
                            }["PresenterPage[<button>.onClick]"],
                            className: "text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-200",
                            children: "Copy ID"
                        }, void 0, false, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                            lineNumber: 237,
                            columnNumber: 195
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                    lineNumber: 237,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 237,
            columnNumber: 11
        }, this);
        $[31] = sessionId;
        $[32] = t12;
    } else {
        t12 = $[32];
    }
    let t13;
    if ($[33] !== reconnect || $[34] !== status) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$ConnectionStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            status: status,
            onReconnect: reconnect
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[33] = reconnect;
        $[34] = status;
        $[35] = t13;
    } else {
        t13 = $[35];
    }
    let t14;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleEndSession,
            className: "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200",
            children: "End Session"
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 259,
            columnNumber: 11
        }, this);
        $[36] = t14;
    } else {
        t14 = $[36];
    }
    let t15;
    if ($[37] !== t13) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center space-x-4",
            children: [
                t13,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 266,
            columnNumber: 11
        }, this);
        $[37] = t13;
        $[38] = t15;
    } else {
        t15 = $[38];
    }
    let t16;
    if ($[39] !== t12 || $[40] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0",
                children: [
                    t12,
                    t15
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 274,
                columnNumber: 85
            }, this)
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 274,
            columnNumber: 11
        }, this);
        $[39] = t12;
        $[40] = t15;
        $[41] = t16;
    } else {
        t16 = $[41];
    }
    let t17;
    if ($[42] !== reactions) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$ReactionDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                reactions: reactions
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 283,
                columnNumber: 80
            }, this)
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 283,
            columnNumber: 11
        }, this);
        $[42] = reactions;
        $[43] = t17;
    } else {
        t17 = $[43];
    }
    let t18;
    if ($[44] !== questions) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$QuestionFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                questions: questions
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 291,
                columnNumber: 80
            }, this)
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 291,
            columnNumber: 11
        }, this);
        $[44] = questions;
        $[45] = t18;
    } else {
        t18 = $[45];
    }
    let t19;
    if ($[46] !== t17 || $[47] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
            children: [
                t17,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[46] = t17;
        $[47] = t18;
        $[48] = t19;
    } else {
        t19 = $[48];
    }
    let t20;
    if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 text-center text-gray-600 dark:text-gray-400 text-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Updates appear in real-time • Audience joins at localhost:3000"
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 308,
                columnNumber: 86
            }, this)
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 308,
            columnNumber: 11
        }, this);
        $[49] = t20;
    } else {
        t20 = $[49];
    }
    let t21;
    if ($[50] !== t16 || $[51] !== t19) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4 lg:p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto",
                children: [
                    t16,
                    t19,
                    t20
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 315,
                columnNumber: 134
            }, this)
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 315,
            columnNumber: 11
        }, this);
        $[50] = t16;
        $[51] = t19;
        $[52] = t21;
    } else {
        t21 = $[52];
    }
    return t21;
}
_s(PresenterPage, "7pNIVYfhrfdUWiJtN/A7L8RGpl0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebSocket"]
    ];
});
_c = PresenterPage;
var _c;
__turbopack_context__.k.register(_c, "PresenterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-compiler-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    var ReactSharedInternals = __turbopack_context__.r("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    exports.c = function(size) {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher.useMemoCache(size);
    };
}();
}),
"[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=real-time-feedback-app_presenter-frontend_03b10196._.js.map