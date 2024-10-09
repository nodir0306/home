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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const telegraf_1 = require("telegraf");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const path = require("path");
const fs_1 = require("fs");
const _modules_1 = require("../../modules");
let BotService = class BotService {
    constructor(categoryService, foodService) {
        this.categoryService = categoryService;
        this.foodService = foodService;
    }
    async startBot(context) {
        const imagePath = path.join(__dirname, "../../../", 'uploads', 'image-1727782746638-922144486.jpg');
        const categories = await this.categoryService.getAllCategories();
        const inline_keyboard = [];
        categories.forEach(category => {
            inline_keyboard.push([{ text: category.name, callback_data: `category_${category.id}` }]);
        });
        await context.replyWithPhoto({ source: (0, fs_1.createReadStream)(imagePath) }, {
            reply_markup: {
                inline_keyboard,
                resize_keyboard: true
            }
        });
    }
    async helpCommand(context) {
        context.replyWithHTML(`<b>Bodtadagi komandalar: </b>
        <i>start - botni qayta ishga tushirish</i>
        <i>help - botdagi komandalarni ko'rish</i>
        `);
    }
    async getCategory(context) {
        const imagePath = path.join(__dirname, "../../../", 'uploads', 'image-1727782746638-922144486.jpg');
        const categories = await this.categoryService.getAllCategories();
        const inline_keyboard = [];
        categories.forEach(category => {
            inline_keyboard.push([{ text: category.name, callback_data: `category_${category.id}` }]);
        });
        await context.replyWithPhoto({ source: (0, fs_1.createReadStream)(imagePath) }, {
            reply_markup: {
                inline_keyboard,
                resize_keyboard: true
            }
        });
    }
    async CategoryAction(context) {
        const callbackQuery = context.callbackQuery;
        if ('data' in callbackQuery) {
            const callbackData = callbackQuery.data;
            const categoryId = callbackData?.split('_')[1];
            const category = await this.foodService.getAllFoodsByCategory(Number(categoryId));
            const inline_keyboard = [];
            category.forEach(food => {
                inline_keyboard.push([{ text: food.name, callback_data: `food_${food.id}` }]);
            });
            context.reply('foods', {
                reply_markup: {
                    inline_keyboard,
                    resize_keyboard: true,
                    one_time_keyboard: true
                },
            });
        }
    }
    async FoodAction(context) {
        const callbackQuery = context.callbackQuery;
        if ('data' in callbackQuery) {
            const callBack = callbackQuery.data;
            const foodId = callBack?.split('_')[1];
            const foods = await this.foodService.getAllFoods();
            const food = [];
            foods.forEach(f => {
                if (f.id == Number(foodId)) {
                    food.push({ id: f.id, description: f.description, image: f.image, price: f.price, name: f.name });
                }
            });
            const imagePath = path.join(__dirname, "../../../", food[0].image);
            context.replyWithPhoto({ source: (0, fs_1.createReadStream)(imagePath) }, {
                caption: `
Name: ${food[0].name}
Price: ${food[0].price}
Description: ${food[0].description}
                    `,
                reply_markup: {
                    inline_keyboard: [
                        [{ callback_data: 'add', text: "+" }, { callback_data: "count", text: "0" }, { callback_data: "minus", text: "-" }],
                        [{ callback_data: "order", text: "Order now" }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                },
            });
        }
    }
};
exports.BotService = BotService;
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], BotService.prototype, "startBot", null);
__decorate([
    (0, nestjs_telegraf_1.Command)("help"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], BotService.prototype, "helpCommand", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Mahsulotlar"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], BotService.prototype, "getCategory", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/category_\d+/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], BotService.prototype, "CategoryAction", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/food_\d+/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], BotService.prototype, "FoodAction", null);
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_telegraf_1.Update)(),
    __metadata("design:paramtypes", [_modules_1.CategoryService,
        _modules_1.FoodService])
], BotService);
//# sourceMappingURL=bot.service.js.map