module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConnectionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function ConnectionStatus({ status, onReconnect }) {
    const getStatusConfig = ()=>{
        switch(status){
            case 'connected':
                return {
                    color: 'bg-green-500',
                    text: 'Connected',
                    textColor: 'text-green-700',
                    bgColor: 'bg-green-50',
                    icon: '✓'
                };
            case 'connecting':
                return {
                    color: 'bg-yellow-500',
                    text: 'Connecting...',
                    textColor: 'text-yellow-700',
                    bgColor: 'bg-yellow-50',
                    icon: '⟳'
                };
            case 'disconnected':
                return {
                    color: 'bg-gray-500',
                    text: 'Disconnected',
                    textColor: 'text-gray-700',
                    bgColor: 'bg-gray-50',
                    icon: '○'
                };
            case 'error':
                return {
                    color: 'bg-red-500',
                    text: 'Connection Error',
                    textColor: 'text-red-700',
                    bgColor: 'bg-red-50',
                    icon: '✕'
                };
        }
    };
    const config = getStatusConfig();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${config.bgColor} rounded-lg px-4 py-2 flex items-center justify-between`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${config.color} w-3 h-3 rounded-full`
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            status === 'connecting' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${config.color} absolute w-3 h-3 rounded-full animate-ping opacity-75`
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `font-medium text-sm ${config.textColor}`,
                        children: [
                            config.icon,
                            " ",
                            config.text
                        ]
                    }, void 0, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            (status === 'disconnected' || status === 'error') && onReconnect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onReconnect,
                className: "text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200",
                children: "Reconnect"
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
}),
"[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuestionFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function QuestionFeed({ questions }) {
    const sortedQuestions = [
        ...questions
    ].sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const formatTime = (timestamp)=>{
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const getTimeAgo = (timestamp)=>{
        const now = new Date().getTime();
        const time = new Date(timestamp).getTime();
        const diff = Math.floor((now - time) / 1000); // seconds
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-800 dark:text-white",
                        children: "Questions"
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-medium text-gray-600 dark:text-gray-400",
                        children: [
                            questions.length,
                            " ",
                            questions.length === 1 ? 'question' : 'questions'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 max-h-[600px] overflow-y-auto pr-2",
                children: sortedQuestions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-4xl mb-3",
                            children: "💬"
                        }, void 0, false, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 dark:text-gray-400",
                            children: "No questions yet. They'll appear here in real-time."
                        }, void 0, false, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this) : sortedQuestions.map((question, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 pulse-once border-l-4 border-blue-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-blue-600 dark:text-blue-300 text-sm font-bold",
                                                    children: "Q"
                                                }, void 0, false, {
                                                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                                    lineNumber: 58,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                                lineNumber: 57,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-medium text-gray-500 dark:text-gray-400",
                                                children: getTimeAgo(question.timestamp)
                                            }, void 0, false, {
                                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                                lineNumber: 62,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                        lineNumber: 56,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-400 dark:text-gray-500",
                                        children: formatTime(question.timestamp)
                                    }, void 0, false, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                        lineNumber: 66,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-800 dark:text-gray-200 leading-relaxed",
                                children: question.question_text
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `${question.timestamp}-${index}`, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                        lineNumber: 51,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReactionDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
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
function ReactionDisplay({ reactions }) {
    const reactionCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const counts = {
            SPEED_UP: 0,
            SLOW_DOWN: 0,
            SHOW_CODE: 0,
            IM_LOST: 0
        };
        reactions.forEach((reaction)=>{
            counts[reaction.reaction_type] = (counts[reaction.reaction_type] || 0) + 1;
        });
        return counts;
    }, [
        reactions
    ]);
    const totalReactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return Object.values(reactionCounts).reduce((sum, count)=>sum + count, 0);
    }, [
        reactionCounts
    ]);
    const getPercentage = (count)=>{
        if (totalReactions === 0) return 0;
        return Math.round(count / totalReactions * 100);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-800 dark:text-white",
                        children: "Live Reactions"
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-medium text-gray-600 dark:text-gray-400",
                        children: [
                            "Total: ",
                            totalReactions
                        ]
                    }, void 0, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4",
                children: Object.keys(reactionConfig).map((type)=>{
                    const config = reactionConfig[type];
                    const count = reactionCounts[type];
                    const percentage = getPercentage(count);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${config.bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-4xl",
                                                role: "img",
                                                "aria-label": config.label,
                                                children: config.icon
                                            }, void 0, false, {
                                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                                lineNumber: 89,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-semibold ${config.color}`,
                                                children: config.label
                                            }, void 0, false, {
                                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                                lineNumber: 92,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                        lineNumber: 88,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-3xl font-bold ${config.color}`,
                                        children: count
                                    }, void 0, false, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                        lineNumber: 96,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-white dark:bg-gray-700 rounded-full h-2 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-full ${config.color.replace('text-', 'bg-')} transition-all duration-500`,
                                    style: {
                                        width: `${percentage}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                    lineNumber: 102,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-right text-sm mt-1 ${config.color} font-medium`,
                                children: [
                                    percentage,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this)
                        ]
                    }, type, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 83,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-800 dark:text-white mb-4",
                        children: "Recent Activity"
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto",
                        children: reactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 dark:text-gray-400 text-center py-4",
                            children: "No reactions yet"
                        }, void 0, false, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: reactions.slice(0, 10).map((reaction, index)=>{
                                const config = reactionConfig[reaction.reaction_type];
                                const time = new Date(reaction.timestamp).toLocaleTimeString();
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between text-sm bg-white dark:bg-gray-600 rounded-lg px-3 py-2 pulse-once",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl",
                                                    children: config.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-gray-700 dark:text-gray-200",
                                                    children: config.label
                                                }, void 0, false, {
                                                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                            lineNumber: 135,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500 dark:text-gray-400 text-xs",
                                            children: time
                                        }, void 0, false, {
                                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                            lineNumber: 141,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, `${reaction.timestamp}-${index}`, true, {
                                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                                    lineNumber: 131,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
}),
"[project]/real-time-feedback-app/presenter-frontend/src/hooks/useWebSocket.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWebSocket",
    ()=>useWebSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useWebSocket({ url, onMessage, reconnectInterval = 3000, maxReconnectAttempts = 5 }) {
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('disconnected');
    const wsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectAttemptsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const reconnectTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])();
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            return;
        }
        setStatus('connecting');
        try {
            const ws = new WebSocket(url);
            ws.onopen = ()=>{
                console.log('WebSocket connected');
                setStatus('connected');
                reconnectAttemptsRef.current = 0;
            };
            ws.onmessage = (event)=>{
                try {
                    const data = JSON.parse(event.data);
                    onMessage?.(data);
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };
            ws.onerror = (error)=>{
                console.error('WebSocket error:', error);
                setStatus('error');
            };
            ws.onclose = ()=>{
                console.log('WebSocket disconnected');
                setStatus('disconnected');
                wsRef.current = null;
                // Attempt to reconnect
                if (reconnectAttemptsRef.current < maxReconnectAttempts) {
                    reconnectAttemptsRef.current += 1;
                    console.log(`Reconnecting... (Attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts})`);
                    reconnectTimeoutRef.current = setTimeout(()=>{
                        connect();
                    }, reconnectInterval);
                } else {
                    console.log('Max reconnection attempts reached');
                }
            };
            wsRef.current = ws;
        } catch (error) {
            console.error('Error creating WebSocket:', error);
            setStatus('error');
        }
    }, [
        url,
        onMessage,
        reconnectInterval,
        maxReconnectAttempts
    ]);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        setStatus('disconnected');
    }, []);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((data)=>{
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(data));
        } else {
            console.warn('WebSocket is not connected. Cannot send message.');
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        connect();
        return ()=>{
            disconnect();
        };
    }, [
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
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/real-time-feedback-app/presenter-frontend/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
const API_BASE_URL = process.env.NEXT_PUBLIC_PRESENTER_BACKEND_URL || 'http://localhost:8000';
const api = {
    /**
   * Fetch recent reactions
   */ async getReactions (sessionId, limit = 50) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE_URL}/api/presenter/reactions`, {
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE_URL}/api/presenter/questions`, {
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${API_BASE_URL}/health`);
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
}),
"[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresenterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$ConnectionStatus$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/src/components/ConnectionStatus.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$QuestionFeed$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/src/components/QuestionFeed.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$ReactionDisplay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/src/components/ReactionDisplay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/src/hooks/useWebSocket.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/real-time-feedback-app/presenter-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function PresenterPage() {
    const [sessionId, setSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSessionActive, setIsSessionActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reactions, setReactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Handle WebSocket messages
    const handleWebSocketMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((data)=>{
        console.log('WebSocket message received:', data);
        if (data.type === 'reaction') {
            setReactions((prev)=>[
                    data.data,
                    ...prev
                ].slice(0, 100));
        } else if (data.type === 'question') {
            setQuestions((prev)=>[
                    data.data,
                    ...prev
                ]);
        }
    }, []);
    // WebSocket connection
    const { status, reconnect, sendMessage, disconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWebSocket"])({
        url: isSessionActive ? __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getWebSocketUrl(sessionId) : '',
        onMessage: handleWebSocketMessage
    });
    // Load initial data when session starts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isSessionActive && sessionId) {
            const loadInitialData = async ()=>{
                const [reactionsData, questionsData] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getReactions(sessionId, 50),
                    __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getQuestions(sessionId)
                ]);
                setReactions(reactionsData);
                setQuestions(questionsData);
            };
            loadInitialData();
        }
    }, [
        isSessionActive,
        sessionId
    ]);
    // Session management from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedSessionId = localStorage.getItem('presenter_session_id');
        if (storedSessionId) {
            setSessionId(storedSessionId);
            setIsSessionActive(true);
        }
    }, []);
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
            const response = await fetch(`http://localhost:8000/api/session/${sessionId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                localStorage.removeItem('presenter_session_id');
                setSessionId('');
                setIsSessionActive(false);
                setReactions([]);
                setQuestions([]);
            } else {
                const result = await response.json();
                alert(`Failed to end session: ${result.detail || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error ending session:', error);
            // Still cleanup locally even if API call fails
            localStorage.removeItem('presenter_session_id');
            setSessionId('');
            setIsSessionActive(false);
            setReactions([]);
            setQuestions([]);
        }
    };
    if (!isSessionActive) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mb-4",
                                children: "🎤"
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold text-gray-800 dark:text-white mb-2",
                                children: "Presenter Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 dark:text-gray-300",
                                children: "Create a session to start"
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleStartSession,
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "sessionId",
                                        className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                                        children: "Session ID"
                                    }, void 0, false, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "sessionId",
                                        value: sessionId,
                                        onChange: (e)=>setSessionId(e.target.value),
                                        placeholder: "e.g., session-123",
                                        className: "w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs text-gray-500 dark:text-gray-400",
                                        children: "Share this ID with your audience to let them join"
                                    }, void 0, false, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform active:scale-95 shadow-md hover:shadow-lg",
                                children: "Start Session"
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 129,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4 lg:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-gray-800 dark:text-white mb-2",
                                        children: "Presenter Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 dark:text-gray-300",
                                                children: [
                                                    "Session: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono font-semibold",
                                                        children: sessionId
                                                    }, void 0, false, {
                                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 28
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    navigator.clipboard.writeText(sessionId);
                                                    alert('Session ID copied to clipboard!');
                                                },
                                                className: "text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-200",
                                                children: "Copy ID"
                                            }, void 0, false, {
                                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                lineNumber: 181,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$ConnectionStatus$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        status: status,
                                        onReconnect: reconnect
                                    }, void 0, false, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleEndSession,
                                        className: "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200",
                                        children: "End Session"
                                    }, void 0, false, {
                                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$ReactionDisplay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                reactions: reactions
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$src$2f$components$2f$QuestionFeed$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                questions: questions
                            }, void 0, false, {
                                fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                                lineNumber: 222,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                    lineNumber: 214,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 text-center text-gray-600 dark:text-gray-400 text-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$real$2d$time$2d$feedback$2d$app$2f$presenter$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Updates appear in real-time • Audience joins at localhost:3000"
                    }, void 0, false, {
                        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
            lineNumber: 177,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/real-time-feedback-app/presenter-frontend/src/app/page.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f18d4a74._.js.map