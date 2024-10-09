"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _OrderController__service;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("./order.service");
const dtos_1 = require("./dtos");
const _decorators_1 = require("../../decorators");
const user_1 = require("../user");
let OrderController = class OrderController {
    constructor(service) {
        _OrderController__service.set(this, void 0);
        __classPrivateFieldSet(this, _OrderController__service, service, "f");
    }
    async getOrders() {
        return await __classPrivateFieldGet(this, _OrderController__service, "f").getAllOrders();
    }
    async createOrder(createOrderPayload) {
        await __classPrivateFieldGet(this, _OrderController__service, "f").createOrder(createOrderPayload);
    }
    async deleteOrder(orderId) {
        await __classPrivateFieldGet(this, _OrderController__service, "f").deleteOrder(orderId);
    }
};
exports.OrderController = OrderController;
_OrderController__service = new WeakMap();
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, _decorators_1.Protected)(true),
    (0, _decorators_1.Roles)([user_1.UserRoles.admin]),
    (0, swagger_1.ApiOperation)({
        description: 'Barcha orderlarni olish',
        summary: 'Barcha orderlarni olish',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, _decorators_1.Protected)(true),
    (0, _decorators_1.Roles)([user_1.UserRoles.admin, user_1.UserRoles.user]),
    (0, swagger_1.ApiOperation)({ summary: 'Yangi order yaratish' }),
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, _decorators_1.Protected)(true),
    (0, _decorators_1.Roles)([user_1.UserRoles.admin]),
    (0, swagger_1.ApiOperation)({ summary: "Orderni o'chirish" }),
    (0, common_1.Delete)('/delete/:orderId'),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map