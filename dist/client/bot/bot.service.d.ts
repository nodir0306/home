import { Context } from "telegraf";
import { CategoryService, FoodService } from '@modules';
export declare class BotService {
    private readonly categoryService;
    private readonly foodService;
    constructor(categoryService: CategoryService, foodService: FoodService);
    startBot(context: Context): Promise<void>;
    helpCommand(context: Context): Promise<void>;
    getCategory(context: Context): Promise<void>;
    CategoryAction(context: Context): Promise<void>;
    FoodAction(context: Context): Promise<void>;
}
