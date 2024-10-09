
import { Injectable } from '@nestjs/common';
import { Context } from "telegraf";
import { Start, Ctx, Update, Command, Action, Hears } from "nestjs-telegraf";
import * as  path from "path";
import { createReadStream } from "fs";

import { CategoryService, Food, FoodService } from '@modules';
import { inlineKeyboard, keyboard } from 'telegraf/typings/markup';


@Injectable()
@Update()
export class BotService {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly foodService: FoodService
    ) { }

    @Start()
    async startBot(@Ctx() context: Context): Promise<void> {
      const imagePath = path.join(
        __dirname,
        "../../../",
        'uploads',
        'image-1727782746638-922144486.jpg'
    )
    const categories = await this.categoryService.getAllCategories()
    const inline_keyboard = [];
    categories.forEach(category => {
        inline_keyboard.push([{ text: category.name, callback_data: `category_${category.id}` }])
    })

    await context.replyWithPhoto(
        { source: createReadStream(imagePath) },
        {
            reply_markup: {
                inline_keyboard,
                resize_keyboard: true  
            }

        }
    )
    }


    @Command("help")
    async helpCommand(@Ctx() context: Context): Promise<void> {
        context.replyWithHTML(`<b>Bodtadagi komandalar: </b>
        <i>start - botni qayta ishga tushirish</i>
        <i>help - botdagi komandalarni ko'rish</i>
        `)
    }


    @Hears("Mahsulotlar")
    async getCategory(@Ctx() context: Context): Promise<void> {
        const imagePath = path.join(
            __dirname,
            "../../../",
            'uploads',
            'image-1727782746638-922144486.jpg'
        )
        const categories = await this.categoryService.getAllCategories()
        const inline_keyboard = [];
        categories.forEach(category => {
            inline_keyboard.push([{ text: category.name, callback_data: `category_${category.id}` }])
        })

        await context.replyWithPhoto(
            { source: createReadStream(imagePath) },
            {
                reply_markup: {
                    inline_keyboard,
                    resize_keyboard: true  
                }

            }
        )
    }

    @Action(/category_\d+/)
    async CategoryAction(@Ctx() context: Context): Promise<void> {
        const callbackQuery = context.callbackQuery;

        if ('data' in callbackQuery) {
            const callbackData = callbackQuery.data;
            const categoryId = callbackData?.split('_')[1];
            const category = await this.foodService.getAllFoodsByCategory(Number(categoryId));
            const inline_keyboard = []
            category.forEach(food => {
                inline_keyboard.push([{ text: food.name, callback_data: `food_${food.id}` }])
            })
            inline_keyboard.push([{ text: "back", callback_data: `Back` }])

            context.reply('foods', {
                reply_markup: {
                    inline_keyboard,
                    resize_keyboard: true,
                    one_time_keyboard: true
                },
            })

        }
    }

    @Action(/food_\d+/)
    async FoodAction(@Ctx() context: Context): Promise<void> {
        const callbackQuery = context.callbackQuery
        if ('data' in callbackQuery) {
            const callBack = callbackQuery.data
            const foodId = callBack?.split('_')[1];
            const foods = await this.foodService.getAllFoods()

const food = []
            foods.forEach(f => {
                if (f.id == Number(foodId)) {
                    food.push({ id: f.id, description: f.description, image: f.image, price: f.price, name: f.name })
                }
            })
            const imagePath = path.join(
                __dirname,
                "../../../",
                food[0].image
            );
            context.replyWithPhoto(
                { source: createReadStream(imagePath) },
                {
                    caption: `
Name: ${food[0].name}
Price: ${food[0].price}
Description: ${food[0].description}
                    `,
                    reply_markup: {
                      inline_keyboard: [
                        [{callback_data: 'add', text: "+"}, {callback_data: "count", text: "0"},{callback_data: "minus", text: "-"}],
                        [{callback_data: "wishlist", text: "Cart"}],
                        [{callback_data: "back", text: "Back"}],
                        
                    ],
                    // keyboard: [[{text: "My Cart"}]],
                      resize_keyboard: true,
                  },
          

                },

            )
        }
    }
}