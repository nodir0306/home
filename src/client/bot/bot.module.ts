import { CategoryModule, FoodModule } from "@modules";
import { BotService } from "./bot.service";
import { Module } from "@nestjs/common";

@Module({
    providers: [BotService],
    imports: [CategoryModule, FoodModule]

})
export class BotModule{}