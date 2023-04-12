"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlay = exports.useCountDownLatch = exports.Provider = void 0;
const react_1 = __importStar(require("react"));
const CountDownLatchContext = (0, react_1.createContext)({});
const Provider = ({ start, children }) => {
    if (start <= 0) {
        throw new Error('Start must be greater than zero');
    }
    const [count, setCount] = (0, react_1.useState)(start);
    const countRef = (0, react_1.useRef)(start);
    const countDownRef = (0, react_1.useRef)(() => {
        if (countRef.current == 0) {
            throw new Error('Counter already reached zero');
        }
        countRef.current -= 1;
        setCount(countRef.current);
    });
    return react_1.default.createElement(CountDownLatchContext.Provider, { value: { count, countDown: countDownRef.current } }, children);
};
exports.Provider = Provider;
const Overlay = ({ children }) => {
    const { count } = useCountDownLatch();
    return react_1.default.createElement(react_1.default.Fragment, null, count > 0 && children);
};
exports.Overlay = Overlay;
const useCountDownLatch = () => (0, react_1.useContext)(CountDownLatchContext);
exports.useCountDownLatch = useCountDownLatch;
